import React, { useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  X, Printer, Download, Sparkles, ShieldCheck, MapPin,
  Phone, Mail, CheckCircle2, Award
} from 'lucide-react';

export default function ResumeBuilderModal({ onClose }) {
  const { user, profile } = useAuth();
  const { lang } = useLanguage();
  const printRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const skillsList = profile?.skills || [
    { name: 'Electrical Repair', level: 'Intermediate', is_practical: true },
    { name: 'Wiring', level: 'Intermediate', is_practical: true },
    { name: 'Appliance Repair', level: 'Basic', is_practical: true }
  ];

  const candidateName = user?.name || 'Praveen Kumar';
  const phone = user?.phone || '9845012345';
  const email = user?.email || 'praveen.bantwal@ruralconnect.ai';
  const village = profile?.village || 'Bantwal Grama';
  const district = profile?.district || 'Dakshina Kannada';
  const education = profile?.education || '12th / PUC Pass (Science)';
  const practicalExp = profile?.practical_experience || 'Assisted local senior electrician in Bantwal village on 45+ domestic wiring jobs, inverter installations, and submersible pump starter troubleshooting.';
  const passportId = profile?.skill_passport_id || 'RC-SKP-00101';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <Sparkles className="w-5 h-5 text-emerald-800" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                {lang === 'kn' ? '1-ಕ್ಲಿಕ್ ಸ್ಮಾರ್ಟ್ ರೆಸ್ಯೂಮ್ ಮತ್ತು ಬಯೋಡೇಟಾ' : lang === 'hi' ? '1-क्लिक स्मार्ट बायोडाटा व रिज्यूमे' : '1-Click Smart Resume & Biodata'}
              </h3>
              <p className="text-xs text-stone-500">
                {lang === 'kn' ? 'ದಾಖಲೆಗಳ ಅಡೆತಡೆಯಿಲ್ಲದೆ ಪ್ರಾಯೋಗಿಕ ಅನುಭವಕ್ಕೆ ಮೊದಲ ಆದ್ಯತೆ' : lang === 'hi' ? 'दस्तावेजी बाधाओं के बिना व्यावहारिक कार्य अनुभव को प्राथमिकता' : 'Values practical hands-on experience without formal barriers'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'kn' ? 'ಮುದ್ರಿಸಿ / ಪಿಡಿಎಫ್ ಉಳಿಸಿ' : lang === 'hi' ? 'प्रिंट / पीडीएफ सेव करें' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-600 rounded-xl hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Sheet */}
        <div id="printable-resume" ref={printRef} className="mt-6 p-8 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-800 font-sans space-y-6">
          
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-emerald-800 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">{candidateName}</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  Verified Rural Talent
                </span>
              </div>
              <p className="text-xs font-semibold text-emerald-800 mt-1">
                Practical Craftsman & Technical Apprentice
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {village}, {district}, Karnataka
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  +91 {phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {email}
                </span>
              </div>
            </div>

            <div className="text-right sm:text-right flex flex-col items-start sm:items-end">
              <span className="text-[10px] uppercase font-bold text-slate-400">Digital Passport ID</span>
              <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded mt-0.5">
                {passportId}
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold mt-1">
                RuralConnect AI Verified
              </span>
            </div>
          </div>

          {/* Practical Hands-on Skills */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-emerald-900 border-b border-slate-200 pb-1 mb-2.5">
              Verified Practical Skills & Aptitude
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {skillsList.map((skill, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{skill.name || skill}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {skill.level || 'Intermediate'} • Practical Hands-on
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hands-On Practical Experience */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-emerald-900 border-b border-slate-200 pb-1 mb-2.5">
              Practical Field Work & Experience
            </h2>
            <div className="space-y-2">
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <p className="text-xs font-semibold text-slate-800">
                  Local Workshop & Field Maintenance Apprenticeship
                </p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {practicalExp}
                </p>
              </div>
            </div>
          </div>

          {/* Education & Qualifications */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-emerald-900 border-b border-slate-200 pb-1 mb-2.5">
              Education & Certifications
            </h2>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between font-semibold">
                <span>{education}</span>
                <span className="text-slate-500">Karnataka State Board</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Electrical Safety & Multimeter Diagnostics</span>
                <span className="text-emerald-700 font-bold">Completed (RuralConnect Academy)</span>
              </div>
            </div>
          </div>

          {/* Languages & Work Availability */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <h3 className="text-[11px] font-bold text-slate-500 uppercase">Languages Known</h3>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">
                {(profile?.languages || ['Kannada', 'Tulu', 'Basic English']).join(', ')}
              </p>
            </div>
            <div>
              <h3 className="text-[11px] font-bold text-slate-500 uppercase">Availability & Travel</h3>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">
                {profile?.availability ? profile.availability.toUpperCase() : 'FULL-TIME'} • Commute within {district}
              </p>
            </div>
          </div>

          {/* Verification Stamp */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
            <span>Generated via RuralConnect AI • Empowering Rural Dignity</span>
            <span>Verify online at: ruralconnect.ai/verify/{passportId}</span>
          </div>

        </div>

      </div>
    </div>
  );
}
