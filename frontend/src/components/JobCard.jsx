import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin, Banknote, Clock, ShieldCheck, Sparkles, Check,
  AlertCircle, ArrowRight, Zap, Briefcase
} from 'lucide-react';

export default function JobCard({
  job,
  onExplainMatch,
  onSkillGap,
  onApply,
  hasApplied = false
}) {
  const { lang, t, getJobTitle, getJobTypeLabel, getSkillLabel, getDistrictLabel } = useLanguage();

  const isHighMatch = (job.match_percentage || 0) >= 70;
  const matchColor = isHighMatch
    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
    : (job.match_percentage || 0) >= 50
    ? 'bg-blue-100 text-blue-800 border-blue-300'
    : 'bg-slate-100 text-slate-700 border-slate-300';

  const jobTitle = getJobTitle(job);

  const displayReasons = lang === 'kn' && job.match_reasons_kannada?.length
    ? job.match_reasons_kannada
    : (lang === 'hi' && job.match_reasons_hindi?.length ? job.match_reasons_hindi : job.match_reasons);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Header Badges: Micro-Opportunity + Verification + Match Score */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {job.is_micro_opportunity ? (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-600" />
                {lang === 'kn' ? 'ಸೀಸನಲ್ ಮೈಕ್ರೋ-ಗಿಗ್' : (lang === 'hi' ? 'सीजनल माइक्रो-गिग' : 'Micro-Gig / Seasonal')}
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-slate-500" />
                {getJobTypeLabel(job.job_type)}
              </span>
            )}

            {job.employer_is_verified && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                {t('verifiedEmployer')}
              </span>
            )}
          </div>

          {job.match_percentage !== undefined && (
            <div className={`px-2.5 py-1 rounded-full text-xs font-extrabold border flex items-center gap-1 ${matchColor}`}>
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>{Math.round(job.match_percentage)}% {t('smartMatch')}</span>
            </div>
          )}
        </div>

        {/* Job Title & Business Name */}
        <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors line-clamp-2">
          {jobTitle}
        </h3>
        <p className="text-xs font-semibold text-slate-600 mt-1">
          {job.employer_name}
        </p>

        {/* Meta Details: Location, Distance, Salary, Hours */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">
              {job.village}, {getDistrictLabel(job.district)}
              {job.distance_km !== undefined && (
                <span className="ml-1 text-emerald-700 font-bold">({job.distance_km} km)</span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Banknote className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="font-bold text-slate-900">
              ₹{job.min_salary?.toLocaleString()} - ₹{job.max_salary?.toLocaleString()}
              <span className="text-[10px] font-normal text-slate-500">
                /{job.salary_period === 'day' ? (lang === 'kn' ? 'ದಿನ' : lang === 'hi' ? 'दिन' : 'day') : (lang === 'kn' ? 'ತಿಂಗಳು' : lang === 'hi' ? 'माह' : 'mo')}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 col-span-2 text-[11px] text-slate-500">
            <Clock className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span>{job.working_hours || (lang === 'kn' ? 'ಸಾಮಾನ್ಯ ಕೆಲಸದ ಸಮಯ' : lang === 'hi' ? 'सामान्य कार्य समय' : 'Standard Hours')}</span>
          </div>
        </div>

        {/* Required Skills Chips */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {(job.required_skills || []).map((skill, idx) => {
            const isMatched = (job.matched_skills || []).some(
              ms => typeof ms === 'string' && (ms.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(ms.toLowerCase()))
            );
            return (
              <span
                key={idx}
                className={`px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 ${
                  isMatched
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {isMatched && <Check className="w-2.5 h-2.5 text-emerald-600" />}
                {getSkillLabel(skill)}
              </span>
            );
          })}
        </div>

        {/* Quick Explainable Reason Snippet */}
        {displayReasons && displayReasons.length > 0 && (
          <div className="mt-3 p-2 bg-emerald-50/70 rounded-xl border border-emerald-100 text-[11px] text-emerald-900 flex items-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="line-clamp-2">{displayReasons[0]}</p>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onExplainMatch(job)}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 hover:underline flex items-center gap-0.5"
          >
            <span>{t('whyMatch')}</span>
          </button>

          <span className="text-slate-300">•</span>

          <button
            onClick={() => onSkillGap(job)}
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline"
          >
            <span>{lang === 'kn' ? 'ಕೌಶಲ್ಯ ಅಂತರ' : (lang === 'hi' ? 'कौशल अंतर' : 'Skill Gap')}</span>
          </button>
        </div>

        <button
          onClick={() => onApply(job)}
          disabled={hasApplied}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1 ${
            hasApplied
              ? 'bg-slate-200 text-slate-600 cursor-not-allowed'
              : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20 hover:shadow'
          }`}
        >
          {hasApplied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>{t('applied')}</span>
            </>
          ) : (
            <>
              <span>{t('applyNow')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
