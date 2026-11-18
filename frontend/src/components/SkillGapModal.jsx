import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  X, BookOpen, TrendingUp, CheckCircle, Clock, Award,
  ExternalLink, Sparkles, ArrowRight, PlayCircle, ShieldCheck
} from 'lucide-react';

export default function SkillGapModal({ targetJob, onClose, onSelectJob }) {
  const { lang, t } = useLanguage();
  const { user } = useAuth();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState({});

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const targetTitle = targetJob?.category || targetJob?.title || 'Electrical Repair';
        const res = await fetch('/api/skill-gap/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('rc_token') || ''}`
          },
          body: JSON.stringify({ target_job: targetTitle })
        });
        const data = await res.json();
        if (data.success) {
          setAnalysis(data.analysis);
        }
      } catch (err) {
        console.error('Failed to analyze skill gap', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [targetJob]);

  const toggleStep = (stepNumber) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  if (!targetJob) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <BookOpen className="w-5 h-5 text-emerald-800" />
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                {lang === 'kn' ? 'ಎಐ ಕೌಶಲ್ಯ ಕೊರತೆ ವಿಶ್ಲೇಷಕ' : lang === 'hi' ? 'एआई कौशल घाटा विश्लेषक' : 'AI Skill Gap Analyzer'}
              </span>
              <h3 className="text-lg font-bold text-stone-900">
                {lang === 'kn' ? 'ನಿಮ್ಮ ಕೌಶಲ್ಯ ತಿಳಿಯಿರಿ, ಭವಿಷ್ಯ ಬೆಳೆಸಿ' : lang === 'hi' ? 'कौशल सीखें, बेहतर भविष्य बनाएं' : 'Know Your Skills, Grow Your Career'}
              </h3>
              <p className="text-xs text-stone-500">
                {lang === 'kn' ? 'ಗುರಿ ಉದ್ಯೋಗ ಮಾರ್ಗ: ' : lang === 'hi' ? 'लक्षित करियर पथ: ' : 'Target Pathway: '}{targetJob.title || targetJob.category}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-600 rounded-xl hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-stone-500 font-medium">
              {lang === 'kn'
                ? 'ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯ ಕೊರತೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಿ ಉಚಿತ ಮಾರ್ಗಸೂಚಿ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...'
                : lang === 'hi'
                ? 'व्यावहारिक कौशल अंतराल का विश्लेषण कर मुफ्त रोडमैप तैयार किया जा रहा है...'
                : 'Analyzing practical skill gaps and generating free roadmap...'}
            </p>
          </div>
        ) : analysis ? (
          <div className="mt-5 space-y-6">
            
            {/* Skill-to-Income Growth Spotlight */}
            <div className="p-5 rounded-2xl bg-[#0d3b2e] text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 border border-emerald-800/60">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400 text-xs font-bold uppercase">
                  <TrendingUp className="w-4 h-4" />
                  <span>{lang === 'kn' ? 'ಕೌಶಲ್ಯದಿಂದ ಆದಾಯ ಗಳಿಕೆಯ ಸಾಮರ್ಥ್ಯ' : lang === 'hi' ? 'कौशल-से-आय वृद्धि क्षमता' : 'Skill-to-Income Potential'}</span>
                </div>
                <h4 className="text-lg font-bold">
                  {lang === 'kn' ? 'ತಿಂಗಳಿಗೆ ₹' : lang === 'hi' ? 'प्रति माह ₹' : 'Unlock up to ₹'}{analysis.income_potential.after_completion_avg.toLocaleString()}{lang === 'kn' ? '/ತಿಂಗಳಿಗೆ ಗಳಿಸಿ' : lang === 'hi' ? '/माह तक कमाएं' : '/month'}
                </h4>
                <p className="text-xs text-emerald-100/80 max-w-sm">
                  {analysis.motivation_message}
                </p>
              </div>

              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/10 text-center">
                <div>
                  <span className="text-[10px] text-emerald-200 uppercase block">
                    {lang === 'kn' ? 'ಪ್ರಸ್ತುತ ಸರಾಸರಿ' : lang === 'hi' ? 'वर्तमान औसत' : 'Current Avg'}
                  </span>
                  <span className="text-base font-bold text-white">₹{analysis.income_potential.current_avg.toLocaleString()}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-[10px] text-emerald-300 uppercase block">
                    {lang === 'kn' ? 'ಕೌಶಲ್ಯದ ನಂತರ' : lang === 'hi' ? 'प्रमाणन के बाद' : 'Certified Avg'}
                  </span>
                  <span className="text-xl font-extrabold text-emerald-300">₹{analysis.income_potential.after_completion_avg.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Practical Learning Roadmap Steps */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  {lang === 'kn' ? 'ಹಂತ-ಹಂತದ ಪ್ರಾಯೋಗಿಕ ಕಲಿಕಾ ಮಾರ್ಗಸೂಚಿ' : lang === 'hi' ? 'चरण-दर-चरण व्यावहारिक अध्ययन रोडमैप' : 'Practical Step-by-Step Learning Roadmap'}
                </h4>
                <span className="text-xs font-semibold text-stone-500">
                  {lang === 'kn' ? 'ಅಂದಾಜು ಅವಧಿ: ' : lang === 'hi' ? 'अनुमानित कुल: ' : 'Estimated Total: '}~{analysis.total_estimated_hours} {lang === 'kn' ? 'ಗಂಟೆಗಳು' : lang === 'hi' ? 'घंटे' : 'Hours'} ({analysis.estimated_days} {lang === 'kn' ? 'ದಿನಗಳು' : lang === 'hi' ? 'दिन' : 'Days'})
                </span>
              </div>

              <div className="space-y-3">
                {analysis.steps.map((step) => {
                  const isDone = completedSteps[step.step_number] || step.is_acquired;
                  return (
                    <div
                      key={step.step_number}
                      className={`p-4 rounded-2xl border transition-all ${
                        isDone
                          ? 'bg-emerald-50/70 border-emerald-300 shadow-sm'
                          : 'bg-white border-stone-200 hover:border-emerald-600/50 shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleStep(step.step_number)}
                            className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all ${
                              isDone
                                ? 'bg-emerald-700 text-white shadow-sm'
                                : 'bg-stone-100 hover:bg-emerald-50 text-stone-700 border border-stone-300'
                            }`}
                          >
                            {isDone ? <CheckCircle className="w-4 h-4" /> : step.step_number}
                          </button>

                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-bold text-stone-900 text-sm">
                                {lang === 'kn' && step.skill_kannada ? step.skill_kannada : step.skill}
                              </h5>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 flex items-center gap-1 border border-stone-200">
                                <Clock className="w-3 h-3 text-stone-400" />
                                {step.estimated_hours} {lang === 'kn' ? 'ಗಂ' : lang === 'hi' ? 'घंटे' : 'hrs'}
                              </span>
                            </div>
                            <p className="text-xs text-stone-600 mt-1">
                              {step.description}
                            </p>

                            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px]">
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200 flex items-center gap-1">
                                <PlayCircle className="w-3 h-3 text-emerald-700" />
                                {step.free_resource}
                              </span>
                              <span className="text-stone-300">•</span>
                              <span className="text-stone-500 font-medium">
                                {lang === 'kn' ? 'ಗುರಿ ಮೈಲಿಗಲ್ಲು: ' : lang === 'hi' ? 'लक्ष्य उपलब्धि: ' : 'Target Milestone: '}{step.milestone}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Unlocked Roles After Roadmap Completion */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-2">
                {lang === 'kn' ? 'ತರಬೇತಿ ಮುಗಿದ ನಂತರ ಲಭ್ಯವಾಗುವ ಸ್ಥಳೀಯ ಉದ್ಯೋಗಗಳು:' : lang === 'hi' ? 'कोर्स समाप्ति के बाद योग्य स्थानीय नौकरियां:' : 'Eligible Local Roles Upon Completion:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {analysis.target_roles.map((role, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-emerald-900 border border-emerald-200 shadow-sm flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-500">
                {lang === 'kn' ? 'ಎಲ್ಲಾ ಕಲಿಕಾ ಮಾಡ್ಯೂಲ್‌ಗಳು ಸ್ಥಳೀಯ ಭಾಷೆಯಲ್ಲಿ 100% ಉಚಿತವಾಗಿವೆ.' : lang === 'hi' ? 'सभी अध्ययन मॉड्यूल क्षेत्रीय भाषा में 100% निःशुल्क हैं।' : 'All learning modules are 100% free with regional audio.'}
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0d3b2e] text-white hover:bg-emerald-900 transition-colors shadow-sm"
              >
                {lang === 'kn' ? 'ಮುಗಿಯಿತು' : lang === 'hi' ? 'पूर्ण' : 'Done'}
              </button>
            </div>

          </div>
        ) : null}

      </div>
    </div>
  );
}
