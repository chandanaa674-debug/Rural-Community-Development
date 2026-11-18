import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import ReverseCandidateCard from '../components/ReverseCandidateCard';
import {
  Building, Users, PlusCircle, Briefcase, ShieldCheck,
  CheckCircle2, Clock, Phone, MapPin, Sparkles, AlertCircle,
  Eye, Edit3, Check, X, FileText
} from 'lucide-react';

export default function EmployerDashboard() {
  const { user, profile } = useAuth();
  const { lang, t } = useLanguage();

  const [activeTab, setActiveTab] = useState('reverse_match'); // 'reverse_match', 'vacancies', 'applicants', 'verify'
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  // New Job Modal
  const [showPostModal, setShowPostModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    category: 'Electrical & Repair',
    description: '',
    required_skills: 'Electrical Repair, Wiring',
    preferred_education: 'Any / Practical Skills',
    min_salary: 12000,
    max_salary: 16000,
    salary_period: 'month',
    job_type: 'full-time',
    is_micro_opportunity: false,
    duration_days: 30,
    working_hours: '9:00 AM - 6:00 PM',
    village: profile?.village || 'Bantwal Town',
    district: profile?.district || 'Dakshina Kannada',
    vacancies: 1
  });
  const [postSubmitting, setPostSubmitting] = useState(false);

  const fetchEmployerData = async () => {
    setLoading(true);
    const token = localStorage.getItem('rc_token');
    try {
      // 1. Fetch reverse matched candidates
      const candRes = await fetch('/api/employer/candidates/reverse-match', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const candData = await candRes.json();
      if (candData.success) {
        setCandidates(candData.candidates || []);
      }

      // 2. Fetch jobs
      const jobsRes = await fetch('/api/employer/jobs', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const jobsData = await jobsRes.json();
      if (jobsData.success) {
        setJobs(jobsData.jobs || []);
      }

      // 3. Fetch applications
      const appRes = await fetch('/api/employer/applications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const appData = await appRes.json();
      if (appData.success) {
        setApplications(appData.applications || []);
      }

      // 4. Analytics
      const anaRes = await fetch('/api/employer/analytics', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const anaData = await anaRes.json();
      if (anaData.success) {
        setAnalytics(anaData);
      }
    } catch (err) {
      console.error('Failed to load employer dashboard', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployerData();
  }, []);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setPostSubmitting(true);
    const token = localStorage.getItem('rc_token');
    try {
      const res = await fetch('/api/employer/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newJob)
      });
      const data = await res.json();
      if (data.success) {
        setJobs(prev => [data.job, ...prev]);
        setShowPostModal(false);
        // Refresh reverse matches for new job
        fetchEmployerData();
      }
    } catch (err) {
      console.error('Failed to create job', err);
    } finally {
      setPostSubmitting(false);
    }
  };

  const handleUpdateApplicantStatus = async (appId, newStatus, note = '') => {
    const token = localStorage.getItem('rc_token');
    try {
      const res = await fetch(`/api/employer/applications/${appId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus, employer_notes: note })
      });
      const data = await res.json();
      if (data.success) {
        setApplications(prev => prev.map(a => a.id === appId ? data.application : a));
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleRequestVerification = async () => {
    const token = localStorage.getItem('rc_token');
    await fetch('/api/employer/verify-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ registration_number: 'KA-MSME-VERIFIED-2026' })
    });
    alert('Verification request submitted! Administrator will review your business credentials.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-emerald-900 rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 border border-emerald-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              {lang === 'kn' ? 'ಸಣ್ಣ ಉದ್ಯಮ ಮಾಲೀಕರ ಪೋರ್ಟಲ್' : (lang === 'hi' ? 'लघु व्यवसाय नियोक्ता पोर्टल' : 'Small Business Employer Portal')}
            </span>
            {profile?.is_verified ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-emerald-200 border border-white/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-300" />
                {lang === 'kn' ? 'ದೃಢೀಕೃತ ಉದ್ಯಮ' : (lang === 'hi' ? 'सत्यापित व्यवसाय' : 'Verified Business')}
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                {lang === 'kn' ? 'ಪರಿಶೀಲನೆ ಬಾಕಿ ಇದೆ' : (lang === 'hi' ? 'सत्यापन लंबित' : 'Verification Pending')}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {profile?.business_name || 'Shree Krishna Electrical Works'}
          </h1>
          <p className="text-xs text-emerald-200">
            {profile?.village || 'Bantwal Town'}, {profile?.district || 'Dakshina Kannada'} • {profile?.business_type || 'Workshop & Services'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPostModal(true)}
            className="px-5 py-2.5 rounded-xl bg-white text-emerald-950 font-bold text-xs shadow hover:bg-emerald-50 flex items-center gap-1.5 transition-all"
          >
            <PlusCircle className="w-4 h-4 text-emerald-700" />
            <span>{lang === 'kn' ? 'ಹೊಸ ಉದ್ಯೋಗ ಪ್ರಕಟಿಸಿ' : (lang === 'hi' ? 'नई रिक्ति प्रकाशित करें' : 'Post New Vacancy')}</span>
          </button>
        </div>
      </div>

      {/* Analytics KPI Bar */}
      {analytics && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-xs text-stone-500 font-semibold block">
              {lang === 'kn' ? 'ಸಕ್ರಿಯ ಉದ್ಯೋಗಗಳು' : (lang === 'hi' ? 'सक्रिय रिक्तियां' : 'Active Vacancies')}
            </span>
            <span className="text-2xl font-black text-stone-900 mt-1 block">{analytics.active_jobs}</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-xs text-stone-500 font-semibold block">
              {lang === 'kn' ? 'ಒಟ್ಟು ಅಭ್ಯರ್ಥಿಗಳು' : (lang === 'hi' ? 'कुल आवेदक' : 'Total Applicants')}
            </span>
            <span className="text-2xl font-black text-emerald-800 mt-1 block">{analytics.total_applicants}</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-xs text-stone-500 font-semibold block">
              {lang === 'kn' ? 'ಆಯ್ಕೆಯಾದ ಅಭ್ಯರ್ಥಿಗಳು' : (lang === 'hi' ? 'शॉर्टलिस्टेड अभ्यर्थी' : 'Shortlisted Candidates')}
            </span>
            <span className="text-2xl font-black text-blue-800 mt-1 block">{analytics.shortlisted_applicants}</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-xs text-stone-500 font-semibold block">
              {lang === 'kn' ? 'ಯಶಸ್ವಿ ನೇಮಕಾತಿಗಳು' : (lang === 'hi' ? 'सफल नियुक्तियां' : 'Successful Hires')}
            </span>
            <span className="text-2xl font-black text-stone-900 mt-1 block">{analytics.hired_count}</span>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('reverse_match')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'reverse_match'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {lang === 'kn'
              ? `ರಿವರ್ಸ್ ಅಭ್ಯರ್ಥಿ ಮ್ಯಾಚಿಂಗ್ (${candidates.length})`
              : (lang === 'hi'
                ? `रिवर्स अभ्यर्थी मिलान (${candidates.length})`
                : `Reverse Candidate Matching (${candidates.length})`)}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('vacancies')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'vacancies'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>
            {lang === 'kn'
              ? `ನನ್ನ ಉದ್ಯೋಗ ಪ್ರಕಟಣೆಗಳು (${jobs.length})`
              : (lang === 'hi'
                ? `मेरी रिक्तियां (${jobs.length})`
                : `My Vacancies (${jobs.length})`)}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('applicants')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'applicants'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>
            {lang === 'kn'
              ? `ಅರ್ಜಿದಾರರ ಪೈಪ್‌ಲೈನ್ (${applications.length})`
              : (lang === 'hi'
                ? `आवेदक पाइपलाइन (${applications.length})`
                : `Applicants Pipeline (${applications.length})`)}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('verify')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'verify'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Trust & Verification</span>
        </button>
      </div>

      {/* TAB 1: REVERSE MATCHING (MAIN INNOVATION FOR EMPLOYERS) */}
      {activeTab === 'reverse_match' && (
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-900">
            <div>
              <span className="font-bold text-sm block text-emerald-950">
                Reverse Candidate Matching Engine
              </span>
              <span>
                Instead of waiting for applications, our AI proactively scans verified rural talent within your commute radius.
              </span>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 bg-white rounded-lg border border-emerald-300 text-emerald-800 shadow-sm whitespace-nowrap">
              Ranked by Proximity & Practical Aptitude
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {candidates.map(candidate => (
              <ReverseCandidateCard
                key={candidate.id}
                candidate={candidate}
                onShortlist={(cand) => alert(`Candidate ${cand.name} shortlisted for trial interview!`)}
                onContact={(cand) => console.log('Contact requested for', cand.name)}
              />
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MY VACANCIES */}
      {activeTab === 'vacancies' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Active Job Vacancies</h2>
            <button
              onClick={() => setShowPostModal(true)}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create Vacancy</span>
            </button>
          </div>

          <div className="space-y-3">
            {jobs.map(job => (
              <div
                key={job.id}
                className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">{job.title}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                      {job.job_type}
                    </span>
                    {job.is_micro_opportunity && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                        ⚡ Micro-Gig
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    {job.village}, {job.district} • ₹{job.min_salary.toLocaleString()} - ₹{job.max_salary.toLocaleString()}/{job.salary_period}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-1">{job.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg">
                    {job.application_count || 0} Applicants
                  </span>
                  <button
                    onClick={() => setActiveTab('applicants')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700"
                  >
                    View Applicants
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: APPLICANTS PIPELINE */}
      {activeTab === 'applicants' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900">Applicant Pipeline Management</h2>
          
          {applications.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-xs text-slate-400">
              No applicants yet. Check out the Reverse Candidate Matching tab to invite candidates proactively!
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map(app => (
                <div
                  key={app.id}
                  className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-base">
                        {app.candidate?.name || 'Applicant'}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {Math.round(app.match_score)}% Match
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                        {app.status.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600">
                      Applied for: <b>{app.job?.title}</b> • {app.candidate?.village}, {app.candidate?.district}
                    </p>

                    {app.cover_note && (
                      <p className="text-xs text-slate-500 italic bg-slate-50 p-2 rounded-xl mt-1">
                        "{app.cover_note}"
                      </p>
                    )}

                    {app.employer_notes && (
                      <p className="text-xs text-emerald-800 font-medium">
                        Your Note: {app.employer_notes}
                      </p>
                    )}
                  </div>

                  {/* Status Change Buttons */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={() => handleUpdateApplicantStatus(app.id, 'shortlisted', 'Shortlisted for workshop visit')}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100"
                    >
                      Shortlist
                    </button>
                    <button
                      onClick={() => handleUpdateApplicantStatus(app.id, 'interview_scheduled', 'Interview scheduled for 10 AM')}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-50 text-purple-700 hover:bg-purple-100"
                    >
                      Schedule Interview
                    </button>
                    <button
                      onClick={() => handleUpdateApplicantStatus(app.id, 'selected', 'Candidate hired')}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800"
                    >
                      Hire Candidate 🎉
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: TRUST & VERIFICATION */}
      {activeTab === 'verify' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl">
              <ShieldCheck className="w-6 h-6" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">Business Authenticity & Verification</h3>
              <p className="text-xs text-slate-500">Build trust with rural youth and eliminate fraud concerns</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl text-xs space-y-2 border border-slate-100 text-slate-700">
            <p>
              Verified businesses receive an official <b>Verified Employer Badge</b> across all job listings and map pins.
            </p>
            <p>
              Candidates apply 3.4x faster to verified businesses because it guarantees legitimate pay, clear hours, and zero hidden charges.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleRequestVerification}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-700/20"
            >
              Request MSME Verification Badge
            </button>
          </div>
        </div>
      )}

      {/* POST VACANCY MODAL */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Publish New Job Vacancy</h3>
              <button onClick={() => setShowPostModal(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  placeholder="e.g. Electrical Workshop Assistant"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sector Category</label>
                  <select
                    value={newJob.category}
                    onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="Electrical & Repair">Electrical & Repair</option>
                    <option value="Agriculture">Agriculture & Harvesting</option>
                    <option value="Retail">Retail & Supermarket</option>
                    <option value="Delivery & Logistics">Delivery & Logistics</option>
                    <option value="Office & Computer">Office & Computer</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Job Type</label>
                  <select
                    value={newJob.job_type}
                    onChange={(e) => setNewJob({ ...newJob, job_type: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="seasonal">Seasonal / Micro-Gig</option>
                    <option value="apprenticeship">Apprenticeship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Required Practical Skills (Comma-separated)</label>
                <input
                  type="text"
                  value={newJob.required_skills}
                  onChange={(e) => setNewJob({ ...newJob, required_skills: e.target.value })}
                  placeholder="e.g. Electrical Repair, Wiring, Appliance Repair"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Min Salary (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newJob.min_salary}
                    onChange={(e) => setNewJob({ ...newJob, min_salary: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Max Salary (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newJob.max_salary}
                    onChange={(e) => setNewJob({ ...newJob, max_salary: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Job Description & Practical Duties</label>
                <textarea
                  rows="3"
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  placeholder="Describe day-to-day work, training provided, lunch/tea benefits..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={postSubmitting}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold"
                >
                  {postSubmitting ? 'Publishing...' : 'Publish Vacancy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
