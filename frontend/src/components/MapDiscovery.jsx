import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin, Sliders, ShieldCheck, Zap, Briefcase, Banknote,
  Search, Eye, ArrowRight, Check, Navigation, AlertCircle,
  Crosshair, RefreshCw, Filter, Layers, Clock, Award, Cpu
} from 'lucide-react';

// Haversine distance calculator
function computeDistanceKm(lat1, lon1, lat2, lon2) {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return null;
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export default function MapDiscovery({ onSelectJob }) {
  const { lang, t, getCategoryLabel, getJobTitle, getJobTypeLabel, getDistrictLabel } = useLanguage();

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const userMarkerRef = useRef(null);
  const userCircleRef = useRef(null);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapError, setMapError] = useState(false);
  const [isSimulationMode, setIsSimulationMode] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedJobType, setSelectedJobType] = useState('All');
  const [selectedRadius, setSelectedRadius] = useState(30); // 5, 15, 30, 50 km
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [microOnly, setMicroOnly] = useState(false);

  // Geolocation & User Center
  // Default Center: Bantwal, Dakshina Kannada (12.8988, 75.0380)
  const defaultLocation = { lat: 12.8988, lng: 75.0380, label: 'Bantwal / Coastal Karnataka' };
  const [userLocation, setUserLocation] = useState(null);
  const [locating, setLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState(null); // 'detected', 'denied', null

  // Active highlighted job
  const [activeJobId, setActiveJobId] = useState(null);

  // Fetch jobs or simulation clusters
  useEffect(() => {
    setLoading(true);
    const endpoint = isSimulationMode ? '/api/simulation/map-clusters' : '/api/jobs';
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const list = isSimulationMode ? (data.clusters || []) : (data.jobs || []);
          setJobs(list);
          if (list.length > 0) {
            setActiveJobId(list[0].id);
          }
        }
      })
      .catch(err => {
        console.error('Failed to load map data', err);
      })
      .finally(() => setLoading(false));
  }, [isSimulationMode]);

  // Compute effective center
  const centerCoords = useMemo(() => {
    if (userLocation) return [userLocation.lat, userLocation.lng];
    return [defaultLocation.lat, defaultLocation.lng];
  }, [userLocation]);

  // Split jobs into valid coordinate jobs vs no-location jobs
  const { mappedJobs, noCoordJobs } = useMemo(() => {
    const valid = [];
    const missing = [];

    jobs.forEach(job => {
      // Calculate dynamic distance if userLocation exists
      const dist = userLocation
        ? computeDistanceKm(userLocation.lat, userLocation.lng, job.latitude, job.longitude)
        : job.distance_km;

      const jobWithDist = { ...job, computedDistance: dist };

      if (job.latitude && job.longitude && !isNaN(job.latitude) && !isNaN(job.longitude)) {
        valid.push(jobWithDist);
      } else {
        missing.push(jobWithDist);
      }
    });

    return { mappedJobs: valid, noCoordJobs: missing };
  }, [jobs, userLocation]);

  // Filter mapped jobs based on active filters
  const filteredMappedJobs = useMemo(() => {
    return mappedJobs.filter(job => {
      // 1. Search text (title, village, category)
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = (job.title || '').toLowerCase().includes(q) ||
                             (job.title_kannada || '').toLowerCase().includes(q) ||
                             (job.title_hindi || '').toLowerCase().includes(q);
        const matchesVillage = (job.village || '').toLowerCase().includes(q);
        const matchesCat = (job.category || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesVillage && !matchesCat) return false;
      }

      // 2. District filter
      if (selectedDistrict !== 'All' && !(job.district || '').toLowerCase().includes(selectedDistrict.toLowerCase())) {
        return false;
      }

      // 3. Category filter
      if (selectedCategory !== 'All' && job.category !== selectedCategory) {
        return false;
      }

      // 4. Job type filter
      if (selectedJobType !== 'All' && (job.job_type || '').toLowerCase() !== selectedJobType.toLowerCase()) {
        return false;
      }

      // 5. Verified only
      if (verifiedOnly && !job.employer_is_verified) {
        return false;
      }

      // 6. Micro opportunities only
      if (microOnly && !job.is_micro_opportunity) {
        return false;
      }

      // 7. Commute distance radius (if user location is set)
      if (userLocation && job.computedDistance != null) {
        if (job.computedDistance > selectedRadius) {
          return false;
        }
      }

      return true;
    });
  }, [mappedJobs, searchTerm, selectedDistrict, selectedCategory, selectedJobType, verifiedOnly, microOnly, selectedRadius, userLocation]);

  // Find active job object
  const activeJob = useMemo(() => {
    return jobs.find(j => j.id === activeJobId) || filteredMappedJobs[0] || null;
  }, [jobs, activeJobId, filteredMappedJobs]);

  // Initialize Leaflet Map (Safe, no duplicate instances)
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // If map already initialized on this container, clean up
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    try {
      const map = L.map(mapContainerRef.current, {
        center: centerCoords,
        zoom: 9,
        zoomControl: true,
        scrollWheelZoom: true
      });

      const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      });

      tileLayer.on('tileerror', () => {
        setMapError(true);
      });

      tileLayer.addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;

      // Allow manual center selection by clicking anywhere on the map
      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        setUserLocation({
          lat: Math.round(lat * 10000) / 10000,
          lng: Math.round(lng * 10000) / 10000,
          label: 'Custom Selected Location'
        });
        setLocationStatus('detected');
      });

      // Force resize calculation after DOM layout stabilizes
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 200);

    } catch (e) {
      console.error('Leaflet initialization error:', e);
      setMapError(true);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map markers when filtered jobs or activeJobId change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    // 1. Render User Location marker if set
    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'user-location-pin',
        html: `
          <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 32px; height: 32px; border-radius: 50%; background: rgba(59, 130, 246, 0.35); animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="width: 18px; height: 18px; border-radius: 50%; background: #2563eb; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.35);"></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const uMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon });
      uMarker.bindPopup(`
        <div style="font-family: sans-serif; font-size: 12px; padding: 2px;">
          <b style="color: #1d4ed8;">📍 ${t('userLocationPin')}</b><br/>
          <span style="color: #64748b; font-size: 10px;">${userLocation.lat}, ${userLocation.lng}</span>
        </div>
      `);
      markersLayerRef.current.addLayer(uMarker);

      // Render search radius circle
      if (selectedRadius) {
        const circle = L.circle([userLocation.lat, userLocation.lng], {
          radius: selectedRadius * 1000,
          color: '#3b82f6',
          weight: 1.5,
          opacity: 0.6,
          fillColor: '#60a5fa',
          fillOpacity: 0.08
        });
        markersLayerRef.current.addLayer(circle);
      }
    }

    // 2. Render Job Markers
    filteredMappedJobs.forEach(job => {
      const isSelected = job.id === activeJobId;
      const markerColor = isSelected ? '#10b981' : (job.is_micro_opportunity ? '#f59e0b' : '#059669');
      const size = isSelected ? 34 : 28;

      const jobPinIcon = L.divIcon({
        className: `job-pin-${job.id}`,
        html: `
          <div style="background-color: ${markerColor}; width: ${size}px; height: ${size}px; border-radius: 50%; border: ${isSelected ? '3.5px solid #064e3b' : '2.5px solid white'}; box-shadow: 0 4px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px; transition: transform 0.2s;">
            ${job.is_micro_opportunity ? '⚡' : '💼'}
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      });

      const marker = L.marker([job.latitude, job.longitude], { icon: jobPinIcon });

      const titleDisplay = getJobTitle(job);
      const catDisplay = getCategoryLabel(job.category);
      const distText = job.computedDistance != null ? ` • ${job.computedDistance} km` : '';

      const popupHtml = `
        <div style="font-family: sans-serif; min-width: 170px; padding: 2px;">
          <span style="font-size: 10px; font-weight: bold; text-transform: uppercase; color: ${job.is_micro_opportunity ? '#b45309' : '#047857'};">
            ${catDisplay}
          </span>
          <h4 style="margin: 3px 0 2px 0; font-size: 13px; font-weight: bold; color: #0f172a;">${titleDisplay}</h4>
          <p style="margin: 0; font-size: 11px; color: #475569;">${job.employer_name}</p>
          <p style="margin: 4px 0 0 0; font-size: 12px; font-weight: bold; color: #059669;">
            ₹${job.min_salary.toLocaleString()} - ₹${job.max_salary.toLocaleString()}<span style="font-size: 10px; color: #64748b;">/${job.salary_period || 'mo'}</span>
          </p>
          <div style="margin-top: 4px; font-size: 11px; color: #64748b;">
            📍 ${job.village}, ${job.district}${distText}
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        setActiveJobId(job.id);
      });

      markersLayerRef.current.addLayer(marker);
    });

  }, [filteredMappedJobs, activeJobId, userLocation, selectedRadius, lang]);

  // Request browser location permission
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({
          lat: Math.round(latitude * 10000) / 10000,
          lng: Math.round(longitude * 10000) / 10000,
          label: 'Detected Device GPS'
        });
        setLocationStatus('detected');
        setLocating(false);

        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([latitude, longitude], 11, { animate: true });
        }
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setLocationStatus('denied');
        setLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Center on a specific district from dropdown/quick-buttons
  const handleSelectDistrict = (d) => {
    setSelectedDistrict(d);
    const districtCoords = {
      'Dakshina Kannada': [12.8988, 75.0380],
      'Shivamogga': [13.9299, 75.5681],
      'Mandya': [12.5230, 76.8970],
      'Uttara Kannada': [14.6195, 74.8354],
      'Udupi': [13.3409, 74.7421],
      'Belagavi': [15.8497, 74.4977],
      'Hassan': [13.0033, 76.1004]
    };
    if (d !== 'All' && districtCoords[d] && mapInstanceRef.current) {
      mapInstanceRef.current.setView(districtCoords[d], 10, { animate: true });
    }
  };

  // Pan to job when clicked in list
  const handleJobCardClick = (job) => {
    setActiveJobId(job.id);
    if (job.latitude && job.longitude && mapInstanceRef.current) {
      mapInstanceRef.current.setView([job.latitude, job.longitude], 12, { animate: true });
    }
  };

  const districts = ['All', 'Dakshina Kannada', 'Shivamogga', 'Mandya', 'Uttara Kannada', 'Udupi'];
  const categories = [
    'All',
    'Electrical & Repair',
    'Agriculture',
    'Retail',
    'Delivery & Logistics',
    'Office & Computer'
  ];

  return (
    <div className="space-y-4">
      {/* Privacy Notice Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-900 shadow-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
          <span>{t('mapPrivacyNotice')}</span>
        </div>
        <span className="text-[11px] font-bold px-2 py-0.5 bg-emerald-100 rounded-full text-emerald-800 hidden sm:inline whitespace-nowrap">
          OpenStreetMap & Leaflet GIS
        </span>
      </div>

      {/* Main Filter Toolbar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3.5">
        
        {/* Real Vacancies vs Synthetic Simulation Pilot Clusters */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsSimulationMode(false)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                !isSimulationMode ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'kn' ? 'ನೈಜ ದೃಢೀಕೃತ ಉದ್ಯೋಗಗಳು' : (lang === 'hi' ? 'वास्तविक सत्यापित अवसर' : 'Live Verified Opportunities')}
            </button>
            <button
              onClick={() => setIsSimulationMode(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isSimulationMode ? 'bg-amber-400 text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ಸಿಮ್ಯುಲೇಶನ್ ಪ್ರದರ್ಶನ ಮೋಡ್' : (lang === 'hi' ? 'सिमुलेशन प्रदर्शन मोड' : 'Simulation Demonstration Mode')}</span>
            </button>
          </div>

          <span className="text-[11px] text-slate-500 font-medium px-2">
            {isSimulationMode
              ? (lang === 'kn' ? 'ಕರ್ನಾಟಕದ 5 ತಾಲೂಕುಗಳ ಕೃತಕ ಕ್ಲಸ್ಟರ್‌ಗಳನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ' : (lang === 'hi' ? '5 कर्नाटक तालुकों के सिंथेटिक क्लस्टर प्रदर्शित' : 'Synthetic demonstration clusters'))
              : (lang === 'kn' ? 'ನೈಜ ಡೇಟಾಬೇಸ್ ದಾಖಲೆಗಳು' : (lang === 'hi' ? 'वास्तविक डेटाबेस रिकॉर्ड' : 'Live database records'))}
          </span>
        </div>

        {isSimulationMode && (
          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-300 text-xs text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>
                {lang === 'kn'
                  ? 'ಸಿಮ್ಯುಲೇಶನ್ ಮೋಡ್: ಹ್ಯಾಕಥಾನ್ ಮೌಲ್ಯಮಾಪನಕ್ಕಾಗಿ ಕರ್ನಾಟಕದ 5 ಜಿಲ್ಲೆಗಳ ಕೃತಕ ಉದ್ಯೋಗ ಕ್ಲಸ್ಟರ್‌ಗಳನ್ನು ಪ್ರದರ್ಶಿಸಲಾಗುತ್ತಿದೆ.'
                  : (lang === 'hi'
                    ? 'सिमुलेशन मोड: हैकथॉन मूल्यांकन के लिए 5 कर्नाटक जिलों में सिंथेटिक अवसर क्लस्टर प्रदर्शित किए जा रहे हैं।'
                    : 'SIMULATION PILOT MODE: Synthetic demonstration clusters across 5 Karnataka districts for HackCulture evaluation.')}
              </span>
            </div>
            <span className="text-[10px] text-amber-800 font-semibold uppercase">Demonstration Only</span>
          </div>
        )}

        {/* Row 1: Search + "Use My Location" + Status */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by role, skill, or village (e.g. Electrician, Bantwal, Solar)..."
              className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleUseMyLocation}
              disabled={locating}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap ${
                userLocation
                  ? 'bg-blue-600 text-white shadow-blue-600/25'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20'
              }`}
            >
              <Navigation className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} />
              <span>{locating ? 'Locating...' : (userLocation ? t('myLocationActive') : t('useMyLocation'))}</span>
            </button>

            {userLocation && (
              <button
                onClick={() => { setUserLocation(null); setLocationStatus(null); }}
                className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold"
                title="Reset Location"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {locationStatus === 'denied' && (
          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>{t('locationDenied')}</span>
          </div>
        )}

        {/* Row 2: District + Radius + Category Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          
          {/* District Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {t('districtLabel')}
            </span>
            {districts.map(d => (
              <button
                key={d}
                onClick={() => handleSelectDistrict(d)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedDistrict === d
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {d === 'All' ? t('allDistricts') : getDistrictLabel(d)}
              </button>
            ))}
          </div>

          {/* Commute Radius Buttons (When location is set) */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <span>{t('radiusLabel')}</span>
            <div className="flex items-center gap-1">
              {[5, 15, 30, 50].map(km => (
                <button
                  key={km}
                  onClick={() => setSelectedRadius(km)}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                    selectedRadius === km
                      ? 'bg-amber-400 text-slate-900 shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {km}km
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Category Selector + Toggles (Verified Only, Micro-Gigs) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-xs font-bold text-slate-500 mr-1">{t('sectorLabel')}</span>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all whitespace-nowrap ${
                  selectedCategory === c
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {c === 'All' ? t('allSectors') : getCategoryLabel(c)}
              </button>
            ))}
          </div>

          {/* Quick Filter Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 ${
                verifiedOnly
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              <Award className="w-3 h-3 text-emerald-600" />
              <span>{t('verifiedEmployer')}</span>
            </button>

            <button
              onClick={() => setMicroOnly(!microOnly)}
              className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 ${
                microOnly
                  ? 'bg-amber-400 text-slate-900 shadow-sm'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              <Zap className="w-3 h-3 text-amber-600" />
              <span>{t('microOpportunity')}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Main Map & Synchronized Job List Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Leaflet Map Canvas (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-md h-[520px] relative">
          
          {loading && (
            <div className="absolute inset-0 z-30 bg-white/80 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs font-semibold text-slate-600">{t('loadingMap')}</p>
              </div>
            </div>
          )}

          {mapError && (
            <div className="absolute top-4 left-4 right-4 z-30 p-3 bg-red-50 rounded-2xl border border-red-200 text-xs text-red-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{t('mapErrorNotice')}</span>
            </div>
          )}

          {/* Interactive Leaflet Container */}
          <div ref={mapContainerRef} className="w-full h-full z-10" />

          {/* Map Floating Legend */}
          <div className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-sm p-3 rounded-2xl border border-slate-200 shadow-md text-[11px] space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 flex-shrink-0 border border-white shadow-sm"></span>
              <span className="font-semibold text-slate-700">{t('permanentJobsPin')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500 flex-shrink-0 border border-white shadow-sm"></span>
              <span className="font-semibold text-slate-700">{t('microGigPin')}</span>
            </div>
            {userLocation && (
              <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                <span className="w-3.5 h-3.5 rounded-full bg-blue-600 flex-shrink-0 border border-white shadow-sm"></span>
                <span className="font-bold text-blue-700">{t('userLocationPin')}</span>
              </div>
            )}
          </div>

          {/* Map Bottom Hint */}
          <div className="absolute bottom-3 left-3 z-20 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-[10px] font-medium hidden sm:flex items-center gap-1.5 shadow">
            <Crosshair className="w-3 h-3 text-emerald-400" />
            <span>{t('manualLocationHint')}</span>
          </div>

        </div>

        {/* Synchronized Job List Column (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          
          <div className="flex items-center justify-between pb-1">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span>{t('nearbyJobsList')}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                {filteredMappedJobs.length}
              </span>
            </h3>
            <span className="text-[11px] text-slate-400">
              {userLocation ? `${selectedRadius}km ${t('withinRadius')}` : 'Statewide'}
            </span>
          </div>

          {/* Scrollable Synchronized Cards */}
          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
            {filteredMappedJobs.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-xs text-slate-400">
                {t('noMatchingJobs')}
              </div>
            ) : (
              filteredMappedJobs.map(job => {
                const isSelected = job.id === activeJobId;
                const title = getJobTitle(job);
                const cat = getCategoryLabel(job.category);
                const jobTypeStr = getJobTypeLabel(job.job_type);

                return (
                  <div
                    key={job.id}
                    onClick={() => handleJobCardClick(job)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/70 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                        : 'bg-white border-slate-200 hover:border-emerald-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                            {cat}
                          </span>
                          {job.is_micro_opportunity && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800">
                              ⚡ Micro
                            </span>
                          )}
                          {job.employer_is_verified && (
                            <Award className="w-3 h-3 text-emerald-600" title="Verified" />
                          )}
                        </div>

                        <h4 className="font-bold text-slate-900 text-sm leading-snug hover:text-emerald-700 transition-colors">
                          {title}
                        </h4>
                        <p className="text-[11px] font-semibold text-slate-600">{job.employer_name}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-black text-slate-900 block">
                          ₹{job.min_salary.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400">/{job.salary_period || 'mo'}</span>
                      </div>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{job.village}, {getDistrictLabel(job.district)}</span>
                      </div>

                      {job.computedDistance != null && (
                        <span className="font-bold text-emerald-700 text-xs flex-shrink-0">
                          {job.computedDistance} km
                        </span>
                      )}
                    </div>

                    {isSelected && (
                      <div className="mt-3 pt-2 border-t border-emerald-200/60 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500 font-medium">{jobTypeStr}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onSelectJob) onSelectJob(job);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                        >
                          <span>{t('applyNow')}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>

      {/* No-Location Handling Section (Spec Requirement F) */}
      {noCoordJobs.length > 0 && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-slate-100 text-slate-700 rounded-lg">
              <MapPin className="w-4 h-4 text-slate-500" />
            </span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{t('noCoordJobsTitle')}</h4>
              <p className="text-xs text-slate-500">{t('noCoordJobsDesc')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
            {noCoordJobs.map(job => (
              <div key={job.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h5 className="font-bold text-slate-900 text-xs line-clamp-1">{getJobTitle(job)}</h5>
                <p className="text-[11px] text-slate-600">{job.employer_name}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>📍 {job.village}, {getDistrictLabel(job.district)}</span>
                  <button
                    onClick={() => onSelectJob && onSelectJob(job)}
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    {t('viewDetails')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
