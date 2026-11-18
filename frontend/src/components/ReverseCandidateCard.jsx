import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin, CheckCircle2, ShieldCheck, Sparkles, Phone,
  User, Award, Star, ArrowRight, MessageSquare
} from 'lucide-react';

export default function ReverseCandidateCard({ candidate, onShortlist, onContact }) {
  const { lang, t } = useLanguage();
  const [contactRevealed, setContactRevealed] = useState(false);

  const score = Math.round(candidate.match_percentage || 80);
  const scoreColor = score >= 80 ? 'text-emerald-800 bg-emerald-100 border border-emerald-300' : 'text-blue-800 bg-blue-100 border border-blue-300';

  const handleRevealContact = () => {
    setContactRevealed(true);
    if (onContact) onContact(candidate);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-stone-200/90 hover:border-emerald-700/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Header: Name, Location, Match Score */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#0d3b2e] text-white flex items-center justify-center font-bold text-base shadow-sm">
              {candidate.name?.charAt(0) || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-stone-900 text-base">{candidate.name}</h4>
                {candidate.is_verified && (
                  <span title={lang === 'kn' ? 'ಪರಿಶೀಲಿತ ಗ್ರಾಮೀಣ ಪ್ರತಿಭೆ' : lang === 'hi' ? 'सत्यापित ग्रामीण प्रतिभा' : 'Verified Rural Talent'}>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>{candidate.village}, {candidate.district}</span>
                {candidate.distance_km !== undefined && (
                  <span className="text-emerald-700 font-bold ml-1">({candidate.distance_km} km)</span>
                )}
              </p>
            </div>
          </div>

          <div className={`px-2.5 py-1 rounded-full text-xs font-black flex items-center gap-1 ${scoreColor}`}>
            <Sparkles className="w-3 h-3" />
            <span>{score}% {lang === 'kn' ? 'ಹೊಂದಾಣಿಕೆ' : lang === 'hi' ? 'मैच' : 'Match'}</span>
          </div>
        </div>

        {/* Education & Desired Pay */}
        <div className="mt-3.5 flex flex-wrap gap-2 text-xs text-stone-600">
          <span className="px-2 py-0.5 bg-stone-100 rounded text-[11px] font-semibold text-stone-700 border border-stone-200">
            {candidate.education || '10th / PUC'}
          </span>
          <span className="px-2 py-0.5 bg-emerald-50 rounded text-[11px] font-semibold text-emerald-800 border border-emerald-200">
            {lang === 'kn' ? 'ನಿರೀಕ್ಷೆ: ' : lang === 'hi' ? 'अपेक्षित: ' : 'Expected: '}₹{candidate.expected_salary?.toLocaleString() || '12,000'}/mo
          </span>
          <span className="px-2 py-0.5 bg-blue-50 rounded text-[11px] font-semibold text-blue-800 border border-blue-200">
            {candidate.availability?.toUpperCase() || 'FULL-TIME'}
          </span>
        </div>

        {/* Practical Experience Snippet */}
        {candidate.practical_experience && (
          <p className="mt-3 text-xs text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-200/70 leading-relaxed line-clamp-2">
            <b className="text-stone-800">{lang === 'kn' ? 'ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯ: ' : lang === 'hi' ? 'व्यावहारिक योग्यता: ' : 'Practical Aptitude: '}</b>
            {candidate.practical_experience}
          </p>
        )}

        {/* Skills Chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(candidate.skills || []).map((s, idx) => {
            const skillName = typeof s === 'string' ? s : s.name;
            return (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] font-medium bg-stone-100 text-stone-700 border border-stone-200 flex items-center gap-1"
              >
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                {skillName}
              </span>
            );
          })}
        </div>

        {/* Explainable Rationale */}
        {candidate.reasons && candidate.reasons.length > 0 && (
          <div className="mt-3 p-2 bg-emerald-50/70 rounded-xl border border-emerald-100 text-[11px] text-emerald-900 flex items-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{candidate.reasons[0]}</span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
        {contactRevealed ? (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200">
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            <span>+91 9845012345</span>
          </div>
        ) : (
          <button
            onClick={handleRevealContact}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center gap-1.5 transition-all border border-stone-200"
          >
            <Phone className="w-3.5 h-3.5 text-stone-500" />
            <span>{lang === 'kn' ? 'ಸಂಪರ್ಕಿಸಿ' : lang === 'hi' ? 'संपर्क करें' : 'Call Candidate'}</span>
          </button>
        )}

        <button
          onClick={() => onShortlist(candidate)}
          className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm flex items-center gap-1 transition-all"
        >
          <span>{lang === 'kn' ? 'ಟ್ರಯಲ್‌ಗೆ ಆಯ್ಕೆ ಮಾಡಿ' : lang === 'hi' ? 'ट्रायल हेतु शॉर्टलिस्ट' : 'Shortlist for Trial'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
