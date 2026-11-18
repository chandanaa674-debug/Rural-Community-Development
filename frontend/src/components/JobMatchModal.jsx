import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';
import {
  X, Sparkles, CheckCircle2, AlertTriangle, MapPin, Banknote,
  GraduationCap, Clock, ArrowRight, BookOpen, Send
} from 'lucide-react';

export default function JobMatchModal({
  job,
  onClose,
  onApply,
  onOpenSkillGap,
  hasApplied = false
}) {
  const { lang, t, getJobTitle, getSkillLabel, getDistrictLabel } = useLanguage();
  const [coverNote, setCoverNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  if (!job) return null;

  const score = Math.round(job.match_percentage || 85);
  const breakdown = job.score_breakdown || {
    skills: 35.0,
    distance: 25.0,
    education: 15.0,
    salary: 10.0,
    availability: 10.0
  };

  const jobTitle = getJobTitle(job);

  const reasons = lang === 'kn' && job.match_reasons_kannada?.length
    ? job.match_reasons_kannada
    : (lang === 'hi' && job.match_reasons_hindi?.length ? job.match_reasons_hindi : (job.match_reasons || [
      'Practical electrical repair experience directly aligns with workshop opening.',
      'Located only 0.5 km from your village in Bantwal.',
      'No mandatory degree required — values hands-on competence.'
    ]));

  const handleApplySubmit = async () => {
    setSubmitting(true);
    const result = await onApply(job, coverNote);
    setSubmitting(false);
    if (result?.success) {
      setSuccessMsg(result.message || (lang === 'kn' ? 'ಅರ್ಜಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ!' : lang === 'hi' ? 'आवेदन सफलतापूर्वक जमा किया गया!' : 'Application successfully submitted!'));
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}
      setTimeout(() => {
        onClose();
      }, 1800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
                <Sparkles className="w-5 h-5 text-emerald-700" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{jobTitle}</h3>
                <p className="text-xs text-slate-500">{job.employer_name} • {job.village}, {getDistrictLabel(job.district)}</p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explainable AI Score Hero Card */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              {lang === 'kn' ? 'ವಿವರಣಾತ್ಮಕ AI ಹೊಂದಾಣಿಕೆ ವಿಶ್ಲೇಷಣೆ' : (lang === 'hi' ? 'व्याख्यात्मक एआई मैच मूल्यांकन' : 'Explainable AI Match Assessment')}
            </span>
            <h4 className="text-xl font-extrabold text-slate-900">
              {score >= 75
                ? (lang === 'kn' ? 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್‌ಗೆ ಅತ್ಯುತ್ತಮ ಹೊಂದಾಣಿಕೆ' : lang === 'hi' ? 'आपकी प्रोफ़ाइल के लिए उत्कृष्ट उपयुक्तता' : 'Exceptional Fit for Your Profile')
                : (lang === 'kn' ? 'ಉತ್ತಮ ಪ್ರಾಯೋಗಿಕ ಸಾಮರ್ಥ್ಯ' : lang === 'hi' ? 'मजबूत व्यावहारिक क्षमता' : 'Strong Practical Potential')}
            </h4>
            <p className="text-xs text-slate-600 max-w-md">
              {lang === 'kn'
                ? 'ದೃಢೀಕೃತ ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯಗಳು, ಪ್ರಯಾಣದ ಅಂತರ, ಸಂಬಳದ ನಿರೀಕ್ಷೆ ಮತ್ತು ಕೆಲಸದ ಆದ್ಯತೆಗಳ ಆಧಾರದ ಮೇಲೆ ವಿಶ್ಲೇಷಿಸಲಾಗಿದೆ.'
                : (lang === 'hi'
                  ? 'सत्यापित व्यावहारिक कौशल, आवागमन दूरी, वेतन अपेक्षाओं और कार्य प्राथमिकताओं के आधार पर मूल्यांकन किया गया।'
                  : 'Evaluated across verified practical skills, daily commute, salary expectations, and working preferences.')}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-sm min-w-[110px]">
            <span className="text-3xl font-black text-emerald-700 leading-none">{score}%</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">
              {lang === 'kn' ? 'ಹೊಂದಾಣಿಕೆ ಸೂಚ್ಯಂಕ' : (lang === 'hi' ? 'मैच सूचकांक' : 'Match Index')}
            </span>
          </div>
        </div>

        {/* 5-Factor Transparent Breakdown Bars */}
        <div className="mt-5 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {lang === 'kn' ? 'ಪಾರದರ್ಶಕ ಮಾನದಂಡಗಳ ವಿಭಾಗ' : (lang === 'hi' ? 'पारदर्शी मानदंड विवरण' : 'Transparent Criteria Breakdown')}
          </h4>

          <div className="space-y-2.5">
            {/* 1. Skills (40 max) */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>{lang === 'kn' ? '1. ದೃಢೀಕೃತ ಕೌಶಲ್ಯಗಳು & ಪ್ರಾಯೋಗಿಕ ಜ್ಞಾನ' : (lang === 'hi' ? '1. सत्यापित कौशल और व्यावहारिक योग्यता' : '1. Verified Skills & Practical Aptitude')}</span>
                <span className="text-emerald-700 font-bold">{breakdown.skills || 35} / 40 {lang === 'kn' ? 'ಅಂಕಗಳು' : lang === 'hi' ? 'अंक' : 'pts'}</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all"
                  style={{ width: `${((breakdown.skills || 35) / 40) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* 2. Commute & Distance (25 max) */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>
                  {lang === 'kn'
                    ? `2. ಅಂತರ & ಪ್ರಯಾಣ ಸೌಕರ್ಯ (${job.distance_km || 3.8} ಕಿ.ಮೀ)`
                    : (lang === 'hi'
                      ? `2. दूरी और आवागमन सुगमता (${job.distance_km || 3.8} किमी)`
                      : `2. Distance & Commute Accessibility (${job.distance_km || 3.8} km)`)}
                </span>
                <span className="text-emerald-700 font-bold">{breakdown.distance || 25} / 25 {lang === 'kn' ? 'ಅಂಕಗಳು' : lang === 'hi' ? 'अंक' : 'pts'}</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all"
                  style={{ width: `${((breakdown.distance || 25) / 25) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* 3. Education / Experience (15 max) */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>{lang === 'kn' ? '3. ಶಿಕ್ಷಣ & ಪ್ರಾಯೋಗಿಕ ಅನುಭವ ಹೊಂದಾಣಿಕೆ' : (lang === 'hi' ? '3. शिक्षा और व्यावहारिक अनुभव उपयुक्तता' : '3. Education & Practical Experience Fit')}</span>
                <span className="text-emerald-700 font-bold">{breakdown.education || 15} / 15 {lang === 'kn' ? 'ಅಂಕಗಳು' : lang === 'hi' ? 'अंक' : 'pts'}</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all"
                  style={{ width: `${((breakdown.education || 15) / 15) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* 4. Salary Alignment (10 max) */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>{lang === 'kn' ? '4. ವೇತನ ನಿರೀಕ್ಷೆ ಹೊಂದಾಣಿಕೆ' : (lang === 'hi' ? '4. वेतन अपेक्षा सामंजस्य' : '4. Salary Expectation Alignment')}</span>
                <span className="text-emerald-700 font-bold">{breakdown.salary || 10} / 10 {lang === 'kn' ? 'ಅಂಕಗಳು' : lang === 'hi' ? 'अंक' : 'pts'}</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all"
                  style={{ width: `${((breakdown.salary || 10) / 10) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* 5. Work Type / Availability (10 max) */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>{lang === 'kn' ? '5. ಕೆಲಸದ ಪಾಳಿ ಮತ್ತು ಲಭ್ಯತೆ' : (lang === 'hi' ? '5. शिफ्ट और कार्य समय उपयुक्तता' : '5. Shift & Work Schedule Alignment')}</span>
                <span className="text-emerald-700 font-bold">{breakdown.availability || 10} / 10 {lang === 'kn' ? 'ಅಂಕಗಳು' : lang === 'hi' ? 'अंक' : 'pts'}</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all"
                  style={{ width: `${((breakdown.availability || 10) / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Explainable Reasoning List */}
        <div className="mt-5 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {lang === 'kn' ? 'ಈ ಕೆಲಸವನ್ನು ನಿಮಗೆ ಏಕೆ ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ:' : (lang === 'hi' ? 'यह नौकरी आपके लिए क्यों अनुशंसित है:' : 'Why this job is recommended for you:')}
          </h4>
          <div className="space-y-1.5">
            {reasons.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Skills & Skill Gap Bridge */}
        {job.missing_skills && job.missing_skills.length > 0 && (
          <div className="mt-4 p-3 bg-amber-50 rounded-2xl border border-amber-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>
                  {lang === 'kn'
                    ? `100% ಹೊಂದಾಣಿಕೆಗೆ ಕಲಿಯಬೇಕಾದ ಕೌಶಲ್ಯಗಳು: ${job.missing_skills.map(s => getSkillLabel(s)).join(', ')}`
                    : (lang === 'hi'
                      ? `100% उपयुक्तता के लिए आवश्यक कौशल: ${job.missing_skills.map(s => getSkillLabel(s)).join(', ')}`
                      : `Missing Skills for 100% Fit: ${job.missing_skills.join(', ')}`)}
                </span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenSkillGap(job);
                }}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 underline flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{lang === 'kn' ? 'ಉಚಿತ ಕಲಿಕಾ ಮಾರ್ಗಸೂಚಿ ವೀಕ್ಷಿಸಿ' : (lang === 'hi' ? 'मुफ़्त रोडमैप देखें' : 'View Free Roadmap')}</span>
              </button>
            </div>
          </div>
        )}

        {/* Application Note & Apply Button */}
        <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
          {successMsg ? (
            <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-center text-xs font-bold text-emerald-900">
              {successMsg}
            </div>
          ) : hasApplied ? (
            <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-center text-xs font-bold text-slate-700">
              {lang === 'kn'
                ? 'ನೀವು ಈಗಾಗಲೇ ಈ ಹುದ್ದೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿದ್ದೀರಿ. ನಿಮ್ಮ ಅರ್ಜಿಗಳ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.'
                : (lang === 'hi'
                  ? 'आप इस रिक्ति के लिए पहले ही आवेदन कर चुके हैं। अपने आवेदन पोर्टल में स्थिति देखें।'
                  : 'You have already applied for this vacancy. Track your status in your Applications portal.')}
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'kn' ? 'ಮಾಲೀಕರಿಗೆ ಸಂದೇಶ ಸೇರಿಸಿ (ಐಚ್ಛಿಕ):' : (lang === 'hi' ? 'नियोक्ता को संदेश जोड़ें (वैकल्पिक):' : 'Add a note to the employer (Optional):')}
                </label>
                <textarea
                  rows="2"
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder={lang === 'kn'
                    ? 'ಉದಾ: ನಾನು ಸಮೀಪದಲ್ಲೇ ವಾಸಿಸುತ್ತಿದ್ದೇನೆ ಮತ್ತು ವೈರಿಂಗ್‌ನಲ್ಲಿ ಪ್ರಾಯೋಗಿಕ ಅನುಭವವಿದೆ. ತಕ್ಷಣ ಕೆಲಸಕ್ಕೆ ಸೇರಬಲ್ಲೆ.'
                    : (lang === 'hi'
                      ? 'उदा. मैं पास ही रहता हूँ और वायरिंग का व्यावहारिक अनुभव है। मैं तुरंत कार्य शुरू कर सकता हूँ।'
                      : 'e.g. I live nearby in Bantwal and have practical experience in wiring. I can start immediately.')}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  {lang === 'kn' ? 'ಮುಚ್ಚಿ' : (lang === 'hi' ? 'बंद करें' : 'Close')}
                </button>
                <button
                  onClick={handleApplySubmit}
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-700/20 flex items-center gap-1.5 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? (lang === 'kn' ? 'ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...' : lang === 'hi' ? 'जमा हो रहा है...' : 'Submitting...') : (lang === 'kn' ? 'ಉಚಿತ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ' : lang === 'hi' ? 'मुफ़्त आवेदन जमा करें' : 'Submit Free Application')}</span>
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
