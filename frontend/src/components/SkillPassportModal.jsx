import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  X, ShieldCheck, Award, QrCode, CheckCircle2, BookOpen,
  MapPin, Star, Calendar, Share2
} from 'lucide-react';

export default function SkillPassportModal({ onClose }) {
  const { user, profile } = useAuth();
  const { lang, t } = useLanguage();

  const passportId = profile?.skill_passport_id || 'RC-SKP-00101';
  const name = user?.name || 'Praveen Kumar';
  const village = profile?.village || 'Bantwal Grama';
  const district = profile?.district || 'Dakshina Kannada';
  const skills = profile?.skills || [
    { name: 'Electrical Repair', level: 'Intermediate', is_practical: true },
    { name: 'Wiring', level: 'Intermediate', is_practical: true },
    { name: 'Appliance Repair', level: 'Basic', is_practical: true }
  ];
  const badges = profile?.badges || ['Local Electrician Level 1', 'Quick Responder', 'Verified Rural Talent'];
  const completedModules = profile?.completed_modules || [
    { title: 'Electrical Safety & Multimeter Diagnostics', hours: 5, badge: 'Safety First Certified' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <Award className="w-5 h-5 text-emerald-800" />
            </span>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                {lang === 'kn' ? 'ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯ ಪಾಸ್‌ಪೋರ್ಟ್' : lang === 'hi' ? 'डिजिटल कौशल पासपोर्ट' : 'Digital Skill Passport'}
              </h3>
              <p className="text-xs text-stone-500">
                {lang === 'kn' ? 'ಸರ್ಕಾರಿ ಮತ್ತು ಎಂಎಸ್‌ಎಂಇ ಪರಿಶೀಲಿಸಬಹುದಾದ ಅರ್ಹತೆ' : lang === 'hi' ? 'सरकारी व एमएसएमई सत्यापन योग्य योग्यता प्रमाण' : 'Government & MSME Verifiable Competence Credential'}
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

        {/* Passport Card Presentation */}
        <div className="mt-4 p-6 rounded-3xl bg-[#0d3b2e] text-white shadow-xl relative overflow-hidden border border-emerald-700/50">
          
          {/* Subtle Watermark */}
          <div className="absolute -right-8 -bottom-8 opacity-10 text-white pointer-events-none">
            <Award className="w-56 h-56" />
          </div>

          {/* Top Row: Passport Header & ID */}
          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className="text-[10px] tracking-widest uppercase font-extrabold text-emerald-300">
                {lang === 'kn' ? 'ಭಾರತ ಗಣರಾಜ್ಯ • ರೂರಲ್‌ಕನೆಕ್ಟ್ ಪರಿಶೀಲಿತ' : lang === 'hi' ? 'भारत गणराज्य • रूरलकनेक्ट सत्यापित' : 'Republic of India • RuralConnect Verified'}
              </span>
              <h2 className="text-xl font-black tracking-wide text-white mt-0.5">{name}</h2>
              <div className="flex items-center gap-1 text-xs text-emerald-200 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{village}, {district}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase text-emerald-300 font-bold">
                {lang === 'kn' ? 'ಪಾಸ್‌ಪೋರ್ಟ್ ಸಂಖ್ಯೆ' : lang === 'hi' ? 'पासपोर्ट नंबर' : 'Passport Number'}
              </span>
              <p className="text-xs font-mono font-black text-amber-300 tracking-wider mt-0.5">
                {passportId}
              </p>
            </div>
          </div>

          {/* Badges Ribbon */}
          <div className="mt-4 flex flex-wrap gap-1.5 relative z-10">
            {badges.map((badge, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/15 backdrop-blur-md text-emerald-200 border border-emerald-400/30 flex items-center gap-1"
              >
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                {badge}
              </span>
            ))}
          </div>

          {/* Verified Practical Skills */}
          <div className="mt-5 pt-4 border-t border-emerald-800/80 relative z-10">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 block mb-2">
              {lang === 'kn' ? 'ಪರಿಶೀಲಿತ ಪ್ರಾಯೋಗಿಕ ಸಾಮರ್ಥ್ಯಗಳು' : lang === 'hi' ? 'सत्यापित व्यावहारिक योग्यताएं' : 'Verified Hands-On Competencies'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((s, idx) => (
                <div key={idx} className="bg-white/10 rounded-xl p-2.5 backdrop-blur-sm border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{s.name || s}</span>
                  </div>
                  <span className="text-[10px] text-emerald-300 block ml-5">
                    {s.level || 'Intermediate'} • {lang === 'kn' ? 'ಪ್ರಾಯೋಗಿಕ' : lang === 'hi' ? 'व्यावहारिक' : 'Hands-On'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Academy Modules */}
          <div className="mt-4 pt-3 border-t border-emerald-800/80 relative z-10">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 block mb-1.5">
              {lang === 'kn' ? 'ಪೂರ್ಣಗೊಂಡ ಪ್ರಾಯೋಗಿಕ ಮಾಡ್ಯೂಲ್‌ಗಳು' : lang === 'hi' ? 'पूर्ण व्यावहारिक मॉड्यूल्स' : 'Completed Practical Modules'}
            </span>
            <div className="space-y-1">
              {completedModules.map((mod, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    {mod.title}
                  </span>
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">
                    {mod.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Verification Footer */}
          <div className="mt-5 pt-3 border-t border-emerald-800/80 flex items-center justify-between text-[10px] text-emerald-300 relative z-10">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'kn' ? 'ಡಿಜಿಟಲ್ ಲೆಡ್ಜರ್ ಮೂಲಕ ಪರಿಶೀಲಿಸಲಾಗಿದೆ' : lang === 'hi' ? 'डिजिटल लेजर द्वारा प्रामाणिकता सत्यापित' : 'Authenticity Verified via Digital Ledger'}</span>
            </div>
            <div className="font-mono text-[9px] text-emerald-300/80">
              HASH: 8f2a...9c41
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            {lang === 'kn' ? 'ಕರ್ನಾಟಕದ 450+ ಸ್ಥಳೀಯ ಉದ್ಯಮಗಳಿಂದ ಸ್ವೀಕೃತವಾಗಿದೆ.' : lang === 'hi' ? 'कर्नाटक के 450+ एमएसएमई द्वारा मान्यता प्राप्त।' : 'Accepted by 450+ verified local MSMEs across Karnataka.'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-all"
          >
            {lang === 'kn' ? 'ಮುಚ್ಚಿ' : lang === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
}
