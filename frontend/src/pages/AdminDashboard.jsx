import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  ShieldCheck, AlertTriangle, Users, Building, Briefcase,
  CheckCircle2, XCircle, BarChart3, TrendingUp, MapPin, Eye,
  Sparkles, Layers
} from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { lang, t } = useLanguage();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'verification', 'reports', 'districts'
  const [metrics, setMetrics] = useState(null);
  const [employers, setEmployers] = useState([]);
  const [reports, setReports] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    setLoading(true);
    const token = localStorage.getItem('rc_token');
    try {
      // 1. Overview KPIs
      const ovRes = await fetch('/api/admin/overview', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const ovData = await ovRes.json();
      if (ovData.success) setMetrics(ovData.metrics);

      // 2. Employers verification queue
      const empRes = await fetch('/api/admin/employers', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const empData = await empRes.json();
      if (empData.success) setEmployers(empData.employers || []);

      // 3. Reports
      const repRes = await fetch('/api/admin/reports', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const repData = await repRes.json();
      if (repData.success) setReports(repData.reports || []);

      // 4. District analytics
      const distRes = await fetch('/api/admin/district-analytics');
      const distData = await distRes.json();
      if (distData.success) setDistrictData(distData.district_analytics || []);
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleVerifyEmployer = async (empId, status) => {
    const token = localStorage.getItem('rc_token');
    try {
      const res = await fetch(`/api/admin/employers/${empId}/verify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setEmployers(prev => prev.map(e => e.id === empId ? data.employer : e));
      }
    } catch (err) {
      console.error('Failed to verify employer', err);
    }
  };

  const handleResolveReport = async (reportId, action) => {
    const token = localStorage.getItem('rc_token');
    try {
      const res = await fetch(`/api/admin/reports/${reportId}/resolve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ action })
      });
      const data = await res.json();
      if (data.success) {
        setReports(prev => prev.map(r => r.id === reportId ? data.report : r));
      }
    } catch (err) {
      console.error('Failed to resolve report', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Admin Header - Deep Forest Green SaaS Design */}
      <div className="bg-[#0d3b2e] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-5 border border-emerald-900/50">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-[11px] font-bold tracking-wider uppercase border border-emerald-500/30">
              {lang === 'kn' ? 'ವಿಶ್ವಾಸಾರ್ಹತೆ, ಸುರಕ್ಷತೆ ಮತ್ತು ಆಡಳಿತ' : lang === 'hi' ? 'भरोसा, सुरक्षा और शासन' : 'Trust, Safety & Governance'}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/10 text-emerald-200 border border-white/10">
              {lang === 'kn' ? 'ನೈಜ ಡಾಟಾಬೇಸ್' : lang === 'hi' ? 'लाइव डेटाबेस' : 'Live Verified DB'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === 'kn' ? 'ರೂರಲ್‌ಕನೆಕ್ಟ್ ಆಡಳಿತ ನಿಯಂತ್ರಣ ಕೇಂದ್ರ' : lang === 'hi' ? 'रूरलकनेक्ट एडमिनिस्ट्रेटर कंट्रोल' : 'RuralConnect Administrator Control'}
          </h1>
          <p className="text-xs text-emerald-100/80 mt-1 max-w-2xl leading-relaxed">
            {lang === 'kn'
              ? 'ಎಂಎಸ್‌ಎಂಇ ಪರಿಶೀಲನೆ, ನಕಲಿ ಉದ್ಯೋಗ ತಡೆಗಟ್ಟುವಿಕೆ ಮತ್ತು ಜಿಲ್ಲಾವಾರು ಕೌಶಲ್ಯ ಕೊರತೆ ಮೌಲ್ಯಮಾಪನ.'
              : lang === 'hi'
              ? 'एमएसएमई सत्यापन, फर्जी नौकरी रोकथाम और जिला-स्तरीय कौशल घाटे का वास्तविक समय मूल्यांकन।'
              : 'Monitoring MSME compliance, job safety verification, and district-level skill deficit heatmaps.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold bg-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-sm border border-white/10 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{lang === 'kn' ? 'ಗ್ರಾಮ ವಿಕಾಸ ಪ್ರಮಾಣೀಕೃತ' : lang === 'hi' ? 'ग्राम विकास प्रमाणित' : 'Government & Gram Vikas Certified'}</span>
        </div>
      </div>

      {/* KPI Overview Grid */}
      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500">
                {lang === 'kn' ? 'ನೋಂದಾಯಿತ ಯುವಕರು' : lang === 'hi' ? 'पंजीकृत ग्रामीण युवा' : 'Registered Rural Youth'}
              </span>
              <Users className="w-4 h-4 text-stone-400" />
            </div>
            <span className="text-2xl font-black text-stone-900 mt-2 block">{metrics.total_youth}</span>
            <span className="text-[10px] text-emerald-700 font-semibold mt-1 inline-flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {lang === 'kn' ? 'ಪರಿಶೀಲಿತ ಪ್ರೊಫೈಲ್‌ಗಳು' : lang === 'hi' ? 'सत्यापित प्रोफाइल्स' : '100% Verified Profiles'}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500">
                {lang === 'kn' ? 'ಸಣ್ಣ ಉದ್ಯಮಗಳು' : lang === 'hi' ? 'पंजीकृत एमएसएमई' : 'Registered MSMEs'}
              </span>
              <Building className="w-4 h-4 text-stone-400" />
            </div>
            <span className="text-2xl font-black text-stone-900 mt-2 block">{metrics.total_employers}</span>
            <span className="text-[10px] text-stone-500 font-semibold mt-1 inline-block">
              {employers.filter(e => e.is_verified).length} {lang === 'kn' ? 'ಬ್ಯಾಡ್ಜ್ ಪಡೆದಿದ್ದಾರೆ' : lang === 'hi' ? 'सत्यापित' : 'Govt Badged'}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500">
                {lang === 'kn' ? 'ಸಕ್ರಿಯ ಉದ್ಯೋಗಗಳು' : lang === 'hi' ? 'सक्रिय रिक्तियां' : 'Active Job Vacancies'}
              </span>
              <Briefcase className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-2xl font-black text-emerald-700 mt-2 block">{metrics.active_jobs}</span>
            <span className="text-[10px] text-stone-500 font-semibold mt-1 inline-block">
              {lang === 'kn' ? 'ಸ್ಥಳೀಯ ಅವಕಾಶಗಳು' : lang === 'hi' ? 'सत्यापित स्थानीय पद' : 'Verified Local Posts'}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500">
                {lang === 'kn' ? 'ಒಟ್ಟು ನೇಮಕಾತಿಗಳು' : lang === 'hi' ? 'सफल प्लेसमेंट्स' : 'Total Placements'}
              </span>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-2xl font-black text-blue-700 mt-2 block">{metrics.placements}</span>
            <span className="text-[10px] text-blue-700 font-semibold mt-1 inline-block">
              {lang === 'kn' ? 'ಯಶಸ್ವಿ ಜೋಡಣೆಗಳು' : lang === 'hi' ? 'सफल मैच' : 'Successful Matches'}
            </span>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'overview'
              ? 'bg-[#0d3b2e] text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          {lang === 'kn' ? 'ಪರಿಶೀಲನೆ ಕ್ಯೂ' : lang === 'hi' ? 'सत्यापन कतार' : 'Verification Queue'} ({employers.filter(e => e.verification_status === 'pending').length})
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'reports'
              ? 'bg-[#0d3b2e] text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          {lang === 'kn' ? 'ವಂಚನೆ ಮತ್ತು ದೂರುಗಳು' : lang === 'hi' ? 'शिकायतें व सुरक्षा रिपोर्ट' : 'Trust & Scam Reports'} ({reports.filter(r => r.status === 'pending').length})
        </button>

        <button
          onClick={() => setActiveTab('districts')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'districts'
              ? 'bg-[#0d3b2e] text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          {lang === 'kn' ? 'ಜಿಲ್ಲಾವಾರು ಕೌಶಲ್ಯ ಕೊರತೆ ಮ್ಯಾಪ್' : lang === 'hi' ? 'जिला कौशल घाटा हीटमैप' : 'District Opportunity Gap Heatmap'}
        </button>
      </div>

      {/* TAB 1: EMPLOYER VERIFICATION */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900">
              {lang === 'kn' ? 'ಉದ್ಯೋಗದಾತರ ಪರಿಶೀಲನೆ ವಿನಂತಿಗಳು' : lang === 'hi' ? 'नियोक्ता सत्यापन अनुरोध' : 'Employer Verification Requests'}
            </h2>
            <span className="text-xs text-stone-500 font-medium">
              {lang === 'kn' ? 'ಪರಿಶೀಲಿಸಿದ ವ್ಯವಹಾರಗಳು ಟ್ರಸ್ಟ್ ಬ್ಯಾಡ್ಜ್ ಪಡೆಯುತ್ತವೆ' : lang === 'hi' ? 'सत्यापित व्यवसायों को ट्रस्ट बैज मिलता है' : 'Verified MSMEs receive the Government Trust badge'}
            </span>
          </div>

          <div className="space-y-3">
            {employers.map(emp => (
              <div
                key={emp.id}
                className="p-5 bg-white rounded-2xl border border-stone-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-emerald-600/40 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-stone-900 text-base">{emp.business_name}</h4>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      emp.is_verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {emp.verification_status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600">
                    {emp.business_type} • {emp.village}, {emp.district}
                  </p>
                  <p className="text-xs text-stone-500">
                    {lang === 'kn' ? 'ನೋಂದಣಿ ಸಂಖ್ಯೆ: ' : lang === 'hi' ? 'पंजीकरण संख्या: ' : 'Registration No: '}
                    <span className="font-mono font-semibold text-stone-800">{emp.registration_number || 'MSME-SUBMITTED'}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {!emp.is_verified ? (
                    <button
                      onClick={() => handleVerifyEmployer(emp.id, 'verified')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-1 shadow-sm transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{lang === 'kn' ? 'ಬ್ಯಾಡ್ಜ್ ಅನುಮೋದಿಸಿ' : lang === 'hi' ? 'बैज स्वीकृत करें' : 'Approve Badge'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleVerifyEmployer(emp.id, 'unverified')}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-stone-100 hover:bg-red-50 text-red-600 flex items-center gap-1 border border-stone-200 transition-all"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>{lang === 'kn' ? 'ರದ್ದುಮಾಡಿ' : lang === 'hi' ? 'बैज निरस्त करें' : 'Revoke Badge'}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: REPORTS MODERATION */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900">
              {lang === 'kn' ? 'ವರದಿ ಮಾಡಲಾದ ಉದ್ಯೋಗಗಳು (ವಂಚನೆ ತಡೆಗಟ್ಟುವಿಕೆ)' : lang === 'hi' ? 'रिपोर्ट की गई नौकरियां (धोखाधड़ी रोकथाम)' : 'Reported Job Listings (Scam Prevention)'}
            </h2>
            <span className="text-xs text-stone-500">
              {reports.length} {lang === 'kn' ? 'ವರದಿಗಳು' : lang === 'hi' ? 'सक्रिय रिपोर्ट' : 'active reports filed'}
            </span>
          </div>

          <div className="space-y-3">
            {reports.map(rep => (
              <div
                key={rep.id}
                className="p-5 bg-white rounded-2xl border border-stone-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <h4 className="font-bold text-stone-900 text-sm">{rep.job_title}</h4>
                    <span className="text-xs text-stone-500">({rep.employer_name})</span>
                  </div>
                  <p className="text-xs font-semibold text-red-700">
                    {lang === 'kn' ? 'ಕಾರಣ: ' : lang === 'hi' ? 'कारण: ' : 'Reason: '}{rep.reason}
                  </p>
                  <p className="text-xs text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-200/60">
                    "{rep.details}"
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleResolveReport(rep.id, 'job_removed')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm transition-all"
                  >
                    {lang === 'kn' ? 'ಉದ್ಯೋಗ ತೆಗೆದುಹಾಕಿ' : lang === 'hi' ? 'फर्जी नौकरी हटाएं' : 'Remove Fraudulent Job'}
                  </button>
                  <button
                    onClick={() => handleResolveReport(rep.id, 'dismissed')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 transition-all"
                  >
                    {lang === 'kn' ? 'ತಿರಸ್ಕರಿಸಿ' : lang === 'hi' ? 'खारिज करें' : 'Dismiss Flag'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DISTRICT-WISE DEMAND VS SUPPLY HEATMAP */}
      {activeTab === 'districts' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-bold text-stone-900">
              {lang === 'kn' ? 'ಜಿಲ್ಲಾ ಕೌಶಲ್ಯ ಕೊರತೆ ಡಿಟೆಕ್ಟರ್' : lang === 'hi' ? 'जिला अवसर अंतर डिटेक्टर' : 'District Opportunity Gap Detector'}
            </h2>
            <p className="text-xs text-stone-500">
              {lang === 'kn'
                ? 'ಸ್ಥಳೀಯ ಉದ್ಯೋಗದಾತರಿಗೆ ಅಗತ್ಯವಿರುವ ಆದರೆ ಕೌಶಲ್ಯ ಕೊರತೆಯಿರುವ ತಾಲೂಕುಗಳನ್ನು ಗುರುತಿಸುತ್ತದೆ.'
                : lang === 'hi'
                ? 'उन तालुकों की पहचान करता है जहां एमएसएमई को श्रमिकों की आवश्यकता है लेकिन कौशल की कमी है।'
                : 'Pinpoints exact taluks where employers need workers but candidate skills are missing.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {districtData.map((d, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-stone-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                    <span>{d.district}</span>
                  </h3>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {d.active_jobs} {lang === 'kn' ? 'ಉದ್ಯೋಗಗಳು' : lang === 'hi' ? 'नौकरियां' : 'Jobs'} • {d.registered_youth} {lang === 'kn' ? 'ಯುವಕರು' : lang === 'hi' ? 'युवा' : 'Youth'}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="font-bold text-stone-700">
                      {lang === 'kn' ? 'ಉದ್ಯೋಗದಾತರಿಂದ ಬೇಡಿಕೆ:' : lang === 'hi' ? 'नियोक्ताओं द्वारा मांग:' : 'Demanded by Local Employers:'}
                    </span>
                    <p className="text-stone-600 mt-0.5">{d.top_demanded_skills.join(', ')}</p>
                  </div>
                  <div>
                    <span className="font-bold text-red-700">
                      {lang === 'kn' ? 'ಕೌಶಲ್ಯ ಕೊರತೆ:' : lang === 'hi' ? 'कौशल घाटा:' : 'Skill Deficit (Shortage):'}
                    </span>
                    <p className="text-red-600 font-medium mt-0.5">{d.candidate_skill_deficit.join(', ')}</p>
                  </div>
                </div>

                <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900">
                  <span className="font-bold">
                    {lang === 'kn' ? 'ಕೌಶಲ್ಯ ಕೊರತೆ ಎಚ್ಚರಿಕೆ: ' : lang === 'hi' ? 'अवसर अंतर चेतावनी: ' : 'AI Opportunity Gap Alert: '}
                  </span>
                  <span>{d.gap_alert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
