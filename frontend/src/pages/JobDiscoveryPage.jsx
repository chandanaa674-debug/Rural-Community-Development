import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import JobCard from '../components/JobCard';
import JobMatchModal from '../components/JobMatchModal';
import SkillGapModal from '../components/SkillGapModal';
import MapDiscovery from '../components/MapDiscovery';
import {
  Search, MapPin, Sliders, Zap, Compass, Filter, Map, Grid
} from 'lucide-react';

export default function JobDiscoveryPage({ initialView = 'grid' }) {
  const { lang, t, getCategoryLabel } = useLanguage();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [microOnly, setMicroOnly] = useState(false);
  const [viewMode, setViewMode] = useState(initialView); // 'grid' or 'map'

  useEffect(() => {
    if (initialView) {
      setViewMode(initialView);
    }
  }, [initialView]);

  // Modals
  const [selectedJobForMatch, setSelectedJobForMatch] = useState(null);
  const [selectedJobForSkillGap, setSelectedJobForSkillGap] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    let url = `/api/jobs?category=${encodeURIComponent(selectedCategory)}&district=${encodeURIComponent(selectedDistrict)}`;
    if (microOnly) url += '&is_micro_opportunity=true';
    if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setJobs(data.jobs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [selectedCategory, selectedDistrict, microOnly]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const categories = [
    'All',
    'Electrical & Repair',
    'Agriculture',
    'Retail',
    'Delivery & Logistics',
    'Office & Computer'
  ];

  const districts = ['All', 'Dakshina Kannada', 'Shivamogga', 'Mandya', 'Uttara Kannada', 'Udupi'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {lang === 'kn' ? 'ಸ್ಥಳೀಯ ಉದ್ಯೋಗ ಕೋಶ' : (lang === 'hi' ? 'स्थानीय रोजगार निर्देशिका' : 'Local Employment Directory')}
          </h1>
          <p className="text-xs text-slate-500">
            {lang === 'kn'
              ? 'ಕರ್ನಾಟಕದಾದ್ಯಂತ ದೃಢೀಕೃತ ಸಣ್ಣ ಉದ್ಯಮಗಳ ಉದ್ಯೋಗಾವಕಾಶಗಳು ಮತ್ತು ಸೀಸನಲ್ ಅವಕಾಶಗಳನ್ನು ಅನ್ವೇಷಿಸಿ'
              : (lang === 'hi'
                ? 'कर्नाटक भर में सत्यापित छोटे व्यवसायों की रिक्तियों और सीजनल अवसरों की खोज करें'
                : 'Discover verified small business vacancies and micro-opportunities across Karnataka')}
          </p>
        </div>

        {/* View Toggle: Grid vs Map */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'grid' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>{lang === 'kn' ? 'ಗ್ರಿಡ್ ನೋಟ' : (lang === 'hi' ? 'ग्रिड दृश्य' : 'Grid View')}</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'map' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>{lang === 'kn' ? 'ನಕ್ಷೆ ನೋಟ' : (lang === 'hi' ? 'मानचित्र दृश्य' : 'Map View')}</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'kn'
                ? 'ಉದ್ಯೋಗ ಅಥವಾ ಕೌಶಲ್ಯ ಹುಡುಕಿ (ಉದಾ: ಎಲೆಕ್ಟ್ರಿಷಿಯನ್, ಸೋಲಾರ್, ಟ್ರ್ಯಾಕ್ಟರ್)...'
                : (lang === 'hi'
                  ? 'पद या कौशल द्वारा खोजें (उदा. इलेक्ट्रीशियन, सोलर, ट्रैक्टर)...'
                  : 'Search by role or skill (e.g. Electrician, Solar, Tractor, Billing)...')}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-xs font-bold shadow-sm"
          >
            {lang === 'kn' ? 'ಹುಡುಕಿ' : (lang === 'hi' ? 'खोजें' : 'Search')}
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === c
                    ? 'bg-emerald-700 text-white font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {getCategoryLabel(c)}
              </button>
            ))}
          </div>

          {/* Micro-Gig Filter Toggle */}
          <button
            onClick={() => setMicroOnly(!microOnly)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              microOnly
                ? 'bg-amber-400 text-slate-900 shadow-sm'
                : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{lang === 'kn' ? 'ಸೀಸನಲ್ & ಮೈಕ್ರೋ-ಗಿಗ್ ಮಾತ್ರ' : (lang === 'hi' ? 'केवल मौसमी और माइक्रो-गिग्स' : 'Seasonal & Micro-Gigs Only')}</span>
          </button>

        </div>
      </div>

      {/* Content View */}
      {viewMode === 'map' ? (
        <MapDiscovery onSelectJob={(job) => setSelectedJobForMatch(job)} />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>
              {lang === 'kn'
                ? `${jobs.length} ದೃಢೀಕೃತ ಉದ್ಯೋಗಾವಕಾಶಗಳು`
                : (lang === 'hi'
                  ? `${jobs.length} सत्यापित अवसर प्रदर्शित`
                  : `Showing ${jobs.length} verified opportunities`)}
            </span>
            <span>
              {lang === 'kn'
                ? 'ಶೂನ್ಯ ಅರ್ಜಿ ಶುಲ್ಕ • ಸುರಕ್ಷಿತ ನೇರ ಸಂಪರ್ಕ'
                : (lang === 'hi'
                  ? 'शून्य आवेदन शुल्क • सुरक्षित सीधा संपर्क'
                  : 'Zero application fees • Safe direct contact')}
            </span>
          </div>

          {loading ? (
            <div className="py-20 text-center text-xs text-slate-400">
              {lang === 'kn' ? 'ಅವಕಾಶಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...' : (lang === 'hi' ? 'अवसर लोड हो रहे हैं...' : 'Loading opportunities...')}
            </div>
          ) : jobs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-xs text-slate-400">
              {lang === 'kn'
                ? 'ಆಯ್ಕೆಮಾಡಿದ ಫಿಲ್ಟರ್‌ಗಳಿಗೆ ಯಾವುದೇ ಉದ್ಯೋಗಗಳು ಕಂಡುಬಂದಿಲ್ಲ.'
                : (lang === 'hi'
                  ? 'चयनित फ़िल्टर के साथ कोई मेल खाने वाली नौकरियां नहीं मिलीं।'
                  : 'No matching jobs found with the selected filters.')}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {jobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onExplainMatch={() => setSelectedJobForMatch(job)}
                  onSkillGap={() => setSelectedJobForSkillGap(job)}
                  onApply={() => setSelectedJobForMatch(job)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODALS */}
      {selectedJobForMatch && (
        <JobMatchModal
          job={selectedJobForMatch}
          onClose={() => setSelectedJobForMatch(null)}
          onApply={async (job, note) => {
            alert('To submit an official application, please log in or try 1-Click Demo in the top banner!');
            return { success: false };
          }}
          onOpenSkillGap={(job) => setSelectedJobForSkillGap(job)}
        />
      )}

      {selectedJobForSkillGap && (
        <SkillGapModal
          targetJob={selectedJobForSkillGap}
          onClose={() => setSelectedJobForSkillGap(null)}
        />
      )}

    </div>
  );
}
