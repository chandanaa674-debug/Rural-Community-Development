import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import JobCard from '../components/JobCard';
import JobMatchModal from '../components/JobMatchModal';
import SkillGapModal from '../components/SkillGapModal';
import ResumeBuilderModal from '../components/ResumeBuilderModal';
import SkillPassportModal from '../components/SkillPassportModal';
import MapDiscovery from '../components/MapDiscovery';
import {
  Sparkles, Compass, MapPin, Award, BookOpen, Clock,
  CheckCircle2, FileText, ChevronRight, Zap, AlertCircle
} from 'lucide-react';

export default function YouthDashboard() {
  const { user, profile } = useAuth();
  const { lang, t } = useLanguage();

  const [activeTab, setActiveTab] = useState('recommended'); // 'recommended', 'applications', 'map', 'skills'
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [alternativeJobs, setAlternativeJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [selectedJobForMatch, setSelectedJobForMatch] = useState(null);
  const [selectedJobForSkillGap, setSelectedJobForSkillGap] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showPassportModal, setShowPassportModal] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem('rc_token');
    try {
      // 1. Fetch AI recommended jobs
      const recRes = await fetch('/api/jobs/recommended', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const recData = await recRes.json();
      if (recData.success) {
        setRecommendedJobs(recData.top_matches || []);
        setAlternativeJobs(recData.alternative_matches || []);
      }

      // 2. Fetch applied applications
      const appRes = await fetch('/api/applications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const appData = await appRes.json();
      if (appData.success) {
        setApplications(appData.applications || []);
      }
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleApply = async (job, coverNote = '') => {
    const token = localStorage.getItem('rc_token');
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ job_id: job.id, cover_note: coverNote })
      });
      const data = await res.json();
      if (data.success) {
        setApplications(prev => [data.application, ...prev]);
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: 'Server communication error' };
    }
  };

  const appliedJobIds = new Set(applications.map(a => a.job_id));

  const statusBadges = {
    applied: {
      label: lang === 'kn' ? 'ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ' : (lang === 'hi' ? 'आवेदन जमा किया गया' : 'Application Submitted'),
      color: 'bg-blue-50 text-blue-800 border border-blue-200'
    },
    received: {
      label: lang === 'kn' ? 'ಮಾಲೀಕರಿಗೆ ತಲುಪಿದೆ' : (lang === 'hi' ? 'नियोक्ता द्वारा प्राप्त' : 'Received by Employer'),
      color: 'bg-indigo-50 text-indigo-800 border border-indigo-200'
    },
    under_review: {
      label: lang === 'kn' ? 'ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ' : (lang === 'hi' ? 'समीक्षाधीन' : 'Under Review'),
      color: 'bg-amber-50 text-amber-800 border border-amber-200'
    },
    shortlisted: {
      label: lang === 'kn' ? 'ಟ್ರಯಲ್ ಕೆಲಸಕ್ಕೆ ಆಯ್ಕೆ 🎉' : (lang === 'hi' ? 'परीक्षण हेतु शॉर्टलिस्ट 🎉' : 'Shortlisted for Trial 🎉'),
      color: 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold'
    },
    interview_scheduled: {
      label: lang === 'kn' ? 'ಸಂದರ್ಶನ ನಿಗದಿಯಾಗಿದೆ 📅' : (lang === 'hi' ? 'साक्षात्कार निर्धारित 📅' : 'Interview Scheduled 📅'),
      color: 'bg-purple-50 text-purple-800 border border-purple-200 font-bold'
    },
    selected: {
      label: lang === 'kn' ? 'ಉದ್ಯೋಗ ದೊರೆತಿದೆ 🏆' : (lang === 'hi' ? 'चयनित / नियोजित 🏆' : 'Hired / Placed 🏆'),
      color: 'bg-emerald-800 text-white font-bold'
    },
    rejected: {
      label: lang === 'kn' ? 'ಆಯ್ಕೆಯಾಗಿಲ್ಲ' : (lang === 'hi' ? 'चयनित नहीं' : 'Not Selected'),
      color: 'bg-stone-100 text-stone-600 border border-stone-200'
    },
    withdrawn: {
      label: lang === 'kn' ? 'ಹಿಂಪಡೆಯಲಾಗಿದೆ' : (lang === 'hi' ? 'वापस लिया गया' : 'Withdrawn'),
      color: 'bg-stone-100 text-stone-500'
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Profile Header Hero Card */}
      <div className="bg-emerald-900 rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 border border-emerald-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              {lang === 'kn' ? 'ಗ್ರಾಮೀಣ ಯುವ ಅಭ್ಯರ್ಥಿ ಪೋರ್ಟಲ್' : (lang === 'hi' ? 'ग्रामीण युवा अभ्यर्थी पोर्टल' : 'Rural Youth Candidate Portal')}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-emerald-200 border border-white/20">
              {lang === 'kn' ? 'ದೃಢೀಕೃತ ಗ್ರಾಮೀಣ ಪ್ರತಿಭೆ' : (lang === 'hi' ? 'सत्यापित ग्रामीण प्रतिभा' : 'Verified Rural Talent')}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {lang === 'kn'
              ? `ನಮಸ್ಕಾರ, ${user?.name || 'ಪ್ರವೀಣ್ ಕುಮಾರ್'}!`
              : (lang === 'hi'
                ? `नमस्ते, ${user?.name || 'प्रवीण कुमार'}!`
                : `Namaskara, ${user?.name || 'Praveen Kumar'}!`)}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-200">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {profile?.village || 'Bantwal Grama'}, {profile?.district || 'Dakshina Kannada'}
            </span>
            <span>•</span>
            <span>{profile?.education || '12th / PUC Pass'}</span>
            <span>•</span>
            <span className="font-mono text-amber-300 font-bold">
              ID: {profile?.skill_passport_id || 'RC-SKP-00101'}
            </span>
          </div>
        </div>

        {/* Quick Profile Tools: Skill Passport + 1-Click Resume */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowPassportModal(true)}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 flex items-center gap-1.5 transition-all"
          >
            <Award className="w-4 h-4 text-emerald-300" />
            <span>{lang === 'kn' ? 'ಡಿಜಿಟಲ್ ಸ್ಕಿಲ್ ಪಾಸ್‌ಪೋರ್ಟ್' : (lang === 'hi' ? 'डिजिटल स्किल पासपोर्ट' : 'Digital Skill Passport')}</span>
          </button>

          <button
            onClick={() => setShowResumeModal(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 text-xs font-black flex items-center gap-1.5 shadow-sm transition-all"
          >
            <FileText className="w-4 h-4 text-stone-900" />
            <span>{lang === 'kn' ? '1-ಕ್ಲಿಕ್ ಬಯೋಡೇಟಾ / PDF' : (lang === 'hi' ? '1-क्लिक बायोडाटा / PDF' : '1-Click Biodata / PDF')}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('recommended')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'recommended'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {lang === 'kn'
              ? `AI ಶಿಫಾರಸುಗಳು (${recommendedJobs.length})`
              : (lang === 'hi'
                ? `एआई स्मार्ट मैच (${recommendedJobs.length})`
                : `AI Smart Matches (${recommendedJobs.length})`)}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'applications'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>
            {lang === 'kn'
              ? `ನನ್ನ ಅರ್ಜಿಗಳು (${applications.length})`
              : (lang === 'hi'
                ? `मेरे आवेदन (${applications.length})`
                : `My Applications (${applications.length})`)}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'map'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>{lang === 'kn' ? 'ಸ್ಥಳೀಯ ನಕ್ಷೆ ನೋಟ' : (lang === 'hi' ? 'स्थानीय मानचित्र' : 'Local Map Discovery')}</span>
        </button>
      </div>

      {/* TAB 1: AI RECOMMENDED JOBS */}
      {activeTab === 'recommended' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recommended for Your Practical Skills
              </h2>
              <p className="text-xs text-slate-500">
                Ranked using our 5-factor explainable algorithm (Commute distance, skills, salary, education)
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
              Verified MSMEs in {profile?.district || 'Dakshina Kannada'}
            </span>
          </div>

          {loading ? (
            <div className="py-16 text-center text-xs text-slate-400">
              Computing explainable recommendations...
            </div>
          ) : recommendedJobs.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
              <p className="text-xs text-slate-500">No matching jobs found right now. Check alternative categories below.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recommendedJobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  hasApplied={appliedJobIds.has(job.id)}
                  onExplainMatch={() => setSelectedJobForMatch(job)}
                  onSkillGap={() => setSelectedJobForSkillGap(job)}
                  onApply={() => setSelectedJobForMatch(job)}
                />
              ))}
            </div>
          )}

          {/* Alternative Opportunities */}
          {alternativeJobs.length > 0 && (
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
                Alternative Opportunities (Bridging Neighboring Sectors)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {alternativeJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    hasApplied={appliedJobIds.has(job.id)}
                    onExplainMatch={() => setSelectedJobForMatch(job)}
                    onSkillGap={() => setSelectedJobForSkillGap(job)}
                    onApply={() => setSelectedJobForMatch(job)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MY APPLICATIONS */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Application Status Tracker</h2>
            <span className="text-xs text-slate-500">Real-time status updates from local employers</span>
          </div>

          {applications.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-xs text-slate-400">
              You haven't applied to any vacancies yet. Explore the AI Smart Matches tab!
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map(app => {
                const badge = statusBadges[app.status] || statusBadges.applied;
                return (
                  <div
                    key={app.id}
                    className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-base">
                          {app.job?.title || 'Job Listing'}
                        </h4>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-semibold">
                        {app.job?.employer_name} • {app.job?.village}, {app.job?.district}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Applied on {new Date(app.applied_at).toLocaleDateString()} • Match Score: {Math.round(app.match_score)}%
                      </p>

                      {app.employer_notes && (
                        <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                          <b>Employer Note:</b> "{app.employer_notes}"
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedJobForMatch(app.job)}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
                      >
                        View Job Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: LOCAL MAP DISCOVERY */}
      {activeTab === 'map' && (
        <div className="space-y-4">
          <MapDiscovery onSelectJob={(job) => setSelectedJobForMatch(job)} />
        </div>
      )}

      {/* MODALS */}
      {selectedJobForMatch && (
        <JobMatchModal
          job={selectedJobForMatch}
          hasApplied={appliedJobIds.has(selectedJobForMatch.id)}
          onClose={() => setSelectedJobForMatch(null)}
          onApply={handleApply}
          onOpenSkillGap={(job) => setSelectedJobForSkillGap(job)}
        />
      )}

      {selectedJobForSkillGap && (
        <SkillGapModal
          targetJob={selectedJobForSkillGap}
          onClose={() => setSelectedJobForSkillGap(null)}
        />
      )}

      {showResumeModal && (
        <ResumeBuilderModal onClose={() => setShowResumeModal(false)} />
      )}

      {showPassportModal && (
        <SkillPassportModal onClose={() => setShowPassportModal(false)} />
      )}

    </div>
  );
}
