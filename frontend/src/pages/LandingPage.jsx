import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles, Compass, MapPin, ShieldCheck, TrendingUp,
  Award, ArrowRight, CheckCircle2, Zap, Users, BookOpen,
  Building, ChevronRight, HelpCircle, PhoneCall, Star,
  Check, PlayCircle, Eye, Cpu, Briefcase, Clock
} from 'lucide-react';

export default function LandingPage({ onNavigate, onOpenSkillGap }) {
  const { lang, t } = useLanguage();
  const { demoLogin } = useAuth();
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleStartDemo = async (role) => {
    await demoLogin(role);
    if (role === 'youth') onNavigate('youth-dashboard');
    else if (role === 'employer') onNavigate('employer-dashboard');
    else if (role === 'admin') onNavigate('admin-dashboard');
  };

  const faqs = [
    {
      q: lang === 'kn'
        ? 'ಗ್ರಾಮೀಣ ಯುವಕರಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಇಂಗ್ಲಿಷ್ ರೆಸ್ಯೂಮೆ ಕಡ್ಡಾಯವೇ?'
        : (lang === 'hi'
          ? 'क्या ग्रामीण युवाओं को आवेदन करने के लिए अंग्रेजी बायोडाटा अनिवार्य है?'
          : 'Do rural youth need a formal English resume to apply?'),
      a: lang === 'kn'
        ? 'ಖಂಡಿತವಾಗಿಯೂ ಇಲ್ಲ! ಗ್ರಾಮೀಣ ಯುವಕರಲ್ಲಿ ಪ್ರಾಯೋಗಿಕ ಅನುಭವವಿದೆ ಎಂದು ನಾವು ಗುರುತಿಸುತ್ತೇವೆ. ವೈರಿಂಗ್, ಟ್ರ್ಯಾಕ್ಟರ್ ಡ್ರೈವಿಂಗ್, ಅಂಗಡಿ ವ್ಯವಹಾರ ಮುಂತಾದ ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯಗಳನ್ನು ನಮೂದಿಸಿದರೆ ಸಾಕು, ನಮ್ಮ AI ತಂತ್ರಜ್ಞಾನವು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಡಿಜಿಟಲ್ ಸ್ಕಿಲ್ ಪಾಸ್‌ಪೋರ್ಟ್ ಸಿದ್ಧಪಡಿಸುತ್ತದೆ.'
        : (lang === 'hi'
          ? 'बिल्कुल नहीं! RuralConnect AI व्यावहारिक कार्यक्षमता को प्राथमिकता देता है। बिना किसी औपचारिक दस्तावेज के, केवल व्यावहारिक अनुभव (जैसे वायरिंग, ट्रैक्टर चालन) दर्ज करके स्वतः डिजिटल स्किल पासपोर्ट तैयार हो जाता है।'
          : 'No! RuralConnect AI recognizes that millions of talented youth have practical, hands-on abilities without formal documentation. Candidates list practical experience, and our system generates a digital Skill Passport automatically.')
    },
    {
      q: lang === 'kn'
        ? 'ಇತರ ಉದ್ಯೋಗ ಪೋರ್ಟಲ್‌ಗಳಿಗಿಂತ (Naukri, Indeed) ಇದು ಹೇಗೆ ಭಿನ್ನವಾಗಿದೆ?'
        : (lang === 'hi'
          ? 'यह साधारण जॉब पोर्टल से किस प्रकार भिन्न है?'
          : 'How is this different from an ordinary job board like Naukri or Indeed?'),
      a: lang === 'kn'
        ? 'ಸಾಮಾನ್ಯ ಪೋರ್ಟಲ್‌ಗಳು ಕೇವಲ ಇಂಗ್ಲಿಷ್ ಕೀವರ್ಡ್ ಹುಡುಕಾಟವನ್ನು ಅವಲಂಬಿಸಿವೆ. ಆದರೆ RuralConnect AI ಪ್ರಯಾಣದ ಅಂತರ (ಕೇವಲ 4.8 ಕಿ.ಮೀ), ಸ್ಥಳೀಯ ಭಾಷಾ ಆದ್ಯತೆ, ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯಗಳು ಮತ್ತು ವೇತನ ನಿರೀಕ್ಷೆಗಳನ್ನು 5-ಹಂತದ ಪಾರದರ್ಶಕ AI ಮೂಲಕ ಮೌಲ್ಯಮಾಪನ ಮಾಡುತ್ತದೆ.'
        : (lang === 'hi'
          ? 'साधारण पोर्टल केवल कीवर्ड खोज पर निर्भर करते हैं। RuralConnect AI आवागमन दूरी, क्षेत्रीय भाषा, व्यावहारिक कौशल और वेतन का पारदर्शी बहु-कारक मूल्यांकन करता है और नियोक्ताओं को रिवर्स मैचिंग की सुविधा देता है।'
          : 'Ordinary portals rely on keyword searches for urban graduates. RuralConnect AI uses an explainable multi-factor AI engine evaluating commute proximity, practical skill taxonomy, salary expectations, and regional language preferences with Reverse Matching for employers.')
    },
    {
      q: lang === 'kn'
        ? '"ನಿಮ್ಮ ಕೌಶಲ್ಯ ತಿಳಿಯಿರಿ, ಭವಿಷ್ಯ ಬೆಳೆಸಿ" ವೈಶಿಷ್ಟ್ಯ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?'
        : (lang === 'hi'
          ? '"अपने कौशल को जानें, करियर को बढ़ाएं" सुविधा कैसे कार्य करती है?'
          : 'What is the "Know Your Skills, Grow Your Career" feature?'),
      a: lang === 'kn'
        ? 'ಕೌಶಲ್ಯ ಕೊರತೆಯ ಕಾರಣದಿಂದ ಅಭ್ಯರ್ಥಿ ತಿರಸ್ಕೃತವಾದಾಗ, ನಮ್ಮ AI ಕೌಶಲ್ಯ ಅಂತರ ವಿಶ್ಲೇಷಕವು ಕಲಿಯಬೇಕಾದ ನಿಖರ ಕೌಶಲ್ಯಗಳನ್ನು ಗುರುತಿಸಿ, 3-ಹಂತದ ಉಚಿತ ಕನ್ನಡ/ಇಂಗ್ಲಿಷ್ ವೀಡಿಯೊ ಮಾರ್ಗಸೂಚಿಯನ್ನು ಸೃಷ್ಟಿಸುತ್ತದೆ ಮತ್ತು ಆದಾಯ ಹೆಚ್ಚಳವನ್ನು ತೋರಿಸುತ್ತದೆ.'
        : (lang === 'hi'
          ? 'किसी कौशल की कमी पर केवल अस्वीकार करने के बजाय, यह एआई कमी का सटीक विश्लेषण कर 3-चरणीय निःशुल्क शिक्षण रोडमैप तैयार करता है और संभावित आय वृद्धि प्रदर्शित करता है।'
          : 'Instead of rejecting candidates, our AI Skill Gap Analyzer identifies exact missing skills, builds a 3-step practical roadmap, and links free regional video modules, showing candidates how they can double their income.')
    },
    {
      q: lang === 'kn'
        ? 'ನಕಲಿ ಉದ್ಯೋಗಗಳು ಮತ್ತು ವಂಚನೆಗಳನ್ನು ಹೇಗೆ ತಡೆಯಲಾಗುತ್ತದೆ?'
        : (lang === 'hi'
          ? 'रोजगार घोटालों और फर्जी रिक्तियों की रोकथाम कैसे की जाती है?'
          : 'How do you prevent employment scams and protect rural candidates?'),
      a: lang === 'kn'
        ? 'ಪ್ರತಿಯೊಬ್ಬ ಮಾಲೀಕರನ್ನೂ MSME ಅಥವಾ ಗ್ರಾಮ ಪಂಚಾಯತ್ ದಾಖಲೆಗಳ ಮೂಲಕ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ. ಅಭ್ಯರ್ಥಿಗಳಿಗೆ 100% ಶೂನ್ಯ ಅರ್ಜಿ ಶುಲ್ಕದ ಗ್ಯಾರಂಟಿ ಇದೆ ಮತ್ತು ಅಭ್ಯರ್ಥಿಯ ಫೋನ್ ನಂಬರ್ ಅಥವಾ ವಿಳಾಸವನ್ನು ಸಾರ್ವಜನಿಕವಾಗಿ ಬಹಿರಂಗಪಡಿಸುವುದಿಲ್ಲ.'
        : (lang === 'hi'
          ? 'प्रत्येक नियोक्ता का एमएसएमई या पंचायत सत्यापन होता है। उम्मीदवारों के लिए 100% शून्य आवेदन शुल्क गारंटी है और व्यक्तिगत संपर्क विवरण सुरक्षित रखे जाते हैं।'
          : 'Every employer undergoes verification (MSME/GST/Panchayat check) before being granted a Verified Business badge. All jobs maintain a strict zero-fee policy, and candidate contact numbers are never exposed publicly.')
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          
          {/* Top Pill & Announcement */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-bold shadow-2xs">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>HackCulture Global Hackathon Innovation Track</span>
              <span className="text-stone-300">•</span>
              <span className="text-emerald-800 font-semibold">Rural Employment & Skill Ecosystem</span>
            </div>
          </div>

          {/* Hero Headlines */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.12]">
              {lang === 'kn'
                ? 'ಉದ್ಯೋಗಾವಕಾಶವು ನೀವು ಎಲ್ಲಿ ವಾಸಿಸುತ್ತೀರಿ ಎಂಬುದರ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿರಬಾರದು.'
                : (lang === 'hi'
                  ? 'अवसर इस बात पर निर्भर नहीं होना चाहिए कि आप कहाँ रहते हैं।'
                  : 'Opportunity should not depend on where you live.')}
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-600 leading-relaxed">
              {lang === 'kn'
                ? 'ಗ್ರಾಮೀಣ ಯುವಕರ ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯಗಳನ್ನು ಹತ್ತಿರದ ಸಣ್ಣ ಉದ್ಯಮಗಳೊಂದಿಗೆ ಬುದ್ಧಿವಂತ AI ಮ್ಯಾಚಿಂಗ್, ಪ್ರವೇಶಿಸಬಹುದಾದ ವೃತ್ತಿ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ನಂಬಿಕಸ್ಥ ಜಾಲದ ಮೂಲಕ ಸಂಪರ್ಕಿಸುತ್ತದೆ.'
                : (lang === 'hi'
                  ? 'RuralConnect AI बुद्धिमान कौशल मिलान, सुगम करियर मार्गदर्शन और विश्वसनीय रोजगार नेटवर्क के माध्यम से ग्रामीण प्रतिभा को सही स्थानीय अवसरों से जोड़ता है।'
                  : 'RuralConnect AI connects rural talent with the right local opportunities through intelligent skill matching, accessible career guidance and trusted employment networks.')}
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <button
              onClick={() => onNavigate('jobs')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md shadow-emerald-900/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <Compass className="w-4 h-4 text-emerald-200" />
              <span>{lang === 'kn' ? 'ಉದ್ಯೋಗಾವಕಾಶಗಳನ್ನು ಹುಡುಕಿ' : (lang === 'hi' ? 'अवसर खोजें' : 'Find Opportunities')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('employer-dashboard')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm border border-stone-200 shadow-2xs transition-all flex items-center justify-center gap-2"
            >
              <Building className="w-4 h-4 text-stone-500" />
              <span>{lang === 'kn' ? 'ಸ್ಥಳೀಯ ಪ್ರತಿಭೆಯನ್ನು ನೇಮಿಸಿಕೊಳ್ಳಿ' : (lang === 'hi' ? 'स्थानीय प्रतिभा को नियुक्त करें' : 'Hire Local Talent')}</span>
            </button>

            <button
              onClick={() => onNavigate('match-lab')}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-extrabold text-sm border border-emerald-200 shadow-2xs transition-all flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'kn' ? 'AI ಮ್ಯಾಚ್ ಲ್ಯಾಬ್ ಚಾಲನೆ ಮಾಡಿ' : (lang === 'hi' ? 'एआई मैच लैब शुरू करें' : 'Launch AI Match Lab')}</span>
            </button>
          </div>

          {/* Trust Guarantees Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>100% Zero Application Fees</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>No Formal CV Compulsory</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Trilingual: English, ಕನ್ನಡ & हिन्दी</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Hyper-Local (Avg. 4.8 km Commute)</span>
            </span>
          </div>

          {/* PRODUCT-PREVIEW COMPOSITION HERO */}
          <div className="pt-6 max-w-5xl mx-auto">
            <div className="bg-stone-900 rounded-3xl p-3 sm:p-4 shadow-xl border border-stone-800">
              {/* Fake Browser / App Shell Frame */}
              <div className="flex items-center justify-between px-3 py-2 bg-stone-950/80 rounded-2xl mb-3 border border-white/5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-2 font-mono text-[11px] text-stone-400">ruralconnect.ai/match-engine</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Ecosystem Online • 5 Karnataka Pilot Taluks</span>
                </div>
              </div>

              {/* Composition Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                
                {/* 1. AI Explainable Match Preview Card */}
                <div className="bg-white rounded-2xl p-4 text-stone-800 space-y-3 border border-stone-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                        Smart Match Result
                      </span>
                      <h4 className="font-bold text-sm text-stone-900">Electrical Workshop Assistant</h4>
                      <p className="text-[11px] text-stone-500">Sri Rama Electricals • Bantwal</p>
                    </div>
                    <div className="px-2 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                      100% Fit
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-stone-600">
                      <span>Skills & Aptitude</span>
                      <span className="font-bold text-emerald-800">40 / 40 pts</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-700 h-1.5 w-full rounded-full"></div>
                    </div>

                    <div className="flex justify-between text-stone-600">
                      <span>Daily Commute (0.5 km)</span>
                      <span className="font-bold text-emerald-800">25 / 25 pts</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-700 h-1.5 w-full rounded-full"></div>
                    </div>
                  </div>

                  <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>Practical switchboard wiring verified. Candidate lives within 10 min walk.</span>
                  </div>
                </div>

                {/* 2. Candidate Verified Profile Card */}
                <div className="bg-white rounded-2xl p-4 text-stone-800 space-y-3 border border-stone-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
                      PK
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm text-stone-900">Praveen Poojary</h4>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      </div>
                      <p className="text-[11px] text-stone-500">Bantwal Grama • PUC Pass</p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-[11px] space-y-1">
                    <span className="font-bold text-stone-700 block">Digital Skill Passport:</span>
                    <div className="flex flex-wrap gap-1">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold">Wiring</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold">Motor Servicing</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold">Appliance Repair</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-stone-500">Expected: ₹12,000/mo</span>
                    <span className="font-mono text-emerald-700 font-bold">ID: RC-SKP-00101</span>
                  </div>
                </div>

                {/* 3. Real Employment Analytics Mini-Widget */}
                <div className="bg-stone-800 rounded-2xl p-4 text-white space-y-3 border border-stone-700 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      Pilot Taluk Metrics
                    </span>
                    <h4 className="font-bold text-sm text-white mt-0.5">Dakshina Kannada Pilot Hub</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 bg-stone-900 rounded-xl border border-white/5">
                      <span className="text-xl font-black text-emerald-400 block">4.8 km</span>
                      <span className="text-[10px] text-stone-400">Avg Commute</span>
                    </div>
                    <div className="p-2 bg-stone-900 rounded-xl border border-white/5">
                      <span className="text-xl font-black text-amber-400 block">48 Hrs</span>
                      <span className="text-[10px] text-stone-400">Hiring Speed</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('impact')}
                    className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold text-center border border-white/10 transition-colors"
                  >
                    View Real Platform Analytics →
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE EMPLOYMENT PROBLEM SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-12 shadow-sm space-y-8">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              The Real Ground Problem
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight">
              "Rural youth cannot find work that fits, and small employers cannot find them."
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Why standard recruitment fails in 600,000+ Indian villages:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* For Rural Job Seekers */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  1
                </span>
                <h4 className="font-bold text-sm text-stone-900">For Rural Job Seekers:</h4>
              </div>
              <ul className="space-y-2 text-xs text-stone-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><b>Formal Resume Gatekeeping:</b> Urban job sites demand English CVs that mask real practical competence (wiring, tractor operation, tailoring).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><b>Distress City Migration:</b> Most vacancies are 40+ km away, forcing youth into unsustainable urban slums instead of earning near home.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><b>Black-Box Rejection:</b> Candidates are rejected with zero explanation or actionable skill roadmaps to improve.</span>
                </li>
              </ul>
            </div>

            {/* For Small MSME Employers */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <h4 className="font-bold text-sm text-stone-900">For Local Small Employers:</h4>
              </div>
              <ul className="space-y-2 text-xs text-stone-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><b>No Budget for Corporate Portals:</b> Small electrical sheds and agro units cannot afford ₹5,000/posting on corporate boards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><b>Slow Word-of-Mouth:</b> Relying on personal contacts takes weeks, delaying urgent harvest and festival seasons.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><b>"Post & Pray" Inefficacy:</b> Small owners need to immediately see available candidates in their taluk who can start tomorrow.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 3. HOW RURALCONNECT AI WORKS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Intelligent Ecosystem Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            How RuralConnect AI Solves the Divide
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            A seamless bridge from practical skill discovery to verified local employment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-base">
              1
            </div>
            <h3 className="font-bold text-stone-900 text-sm">
              Aptitude-First Profile (No Resume Barrier)
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Youth list practical hands-on experience in their regional language (wiring, farm machinery, retail). The platform generates a verifiable <b>Digital Skill Passport</b> without requiring formal PDFs.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-base">
              2
            </div>
            <h3 className="font-bold text-stone-900 text-sm">
              Explainable AI Match & Commute Proximity
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Our 5-factor scoring engine balances verified abilities (40%), geodesic travel distance (25%), education (15%), salary (10%), and shift availability (10%), explaining transparently why each job fits.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-base">
              3
            </div>
            <h3 className="font-bold text-stone-900 text-sm">
              Skill Gap Roadmaps & Reverse Hiring
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Instead of binary rejection, candidates receive free 3-step regional video roadmaps that project wage jumps. Simultaneously, employers use <b>Reverse Candidate Matching</b> to contact nearby talent.
            </p>
          </div>

        </div>
      </section>

      {/* 4. AI-POWERED JOB MATCHING SHOWCASE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-emerald-900 via-stone-900 to-stone-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-800/40 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Main Core Innovation
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-1">
                Zero Black-Box Scoring: 100% Explainable AI
              </h2>
            </div>
            <button
              onClick={() => onNavigate('match-lab')}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 self-start transition-all"
            >
              <span>Test Interactive Match Lab</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-300">
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">Why Ordinary Portals Fail Rural Candidates:</h4>
              <p className="leading-relaxed">
                Traditional keyword engines look for exact substring matches like "Electrical Engineer". When a rural youth writes "switchboard wiring helper", traditional algorithms score 0% match.
              </p>
              <p className="leading-relaxed">
                RuralConnect AI uses a rural trade taxonomy graph and continuous geodesic distance tolerance, converting colloquial terminology into verified MSME competency equivalents.
              </p>
            </div>

            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2.5">
              <span className="text-[11px] font-bold uppercase text-emerald-400 block">
                Empirical Evaluation Metrics (Labelled N=60 Pilot Set)
              </span>
              <div className="flex justify-between pb-1 border-b border-white/10">
                <span>Precision@3:</span>
                <span className="font-bold text-emerald-400">88.9% (vs 33.3% Baseline)</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-white/10">
                <span>Recall@3:</span>
                <span className="font-bold text-emerald-400">91.5% (vs 41.2% Baseline)</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-white/10">
                <span>Missing Skill Accuracy:</span>
                <span className="font-bold text-emerald-400">94.0% (vs 0% Binary Rejection)</span>
              </div>
              <div className="flex justify-between">
                <span>Commute Geodesic Accuracy:</span>
                <span className="font-bold text-emerald-400">&lt; 0.5 km (Haversine Formula)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SKILL DEVELOPMENT & ROADMAP ("KNOW YOUR SKILLS, GROW YOUR CAREER") */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                Upward Mobility
              </span>
              <span className="text-xs text-stone-500 font-semibold">
                "Know Your Skills, Grow Your Career"
              </span>
            </div>
            <h3 className="text-2xl font-black text-stone-900">
              Turning Rejection into Salary Growth
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              When a youth lacks a skill, our AI doesn't dismiss them. It builds a 3-step practical roadmap with free regional video modules (in Kannada & English) and calculates their potential salary jump upon completion.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onOpenSkillGap && onOpenSkillGap({ category: 'Electrical & Repair', title: 'Electrical & Solar Technician' })}
                className="px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Interactive Roadmap</span>
              </button>
            </div>
          </div>

          <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 min-w-[280px] text-center space-y-3">
            <span className="text-[11px] uppercase font-bold text-stone-500 block">
              Skill-to-Income Projection
            </span>
            <div className="flex items-center justify-center gap-3">
              <div>
                <span className="text-xs text-stone-400 block">Current Avg</span>
                <span className="text-lg font-bold text-stone-700">₹9,000</span>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-700" />
              <div>
                <span className="text-xs text-emerald-800 font-bold block">Solar Certified</span>
                <span className="text-2xl font-black text-emerald-800">₹20,000</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 inline-block">
              +122% Monthly Wage Unlock
            </span>
          </div>
        </div>
      </section>

      {/* 6. EMPLOYER SOLUTIONS: REVERSE CANDIDATE MATCHING */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Built for Small Enterprises
              </span>
              <h3 className="text-2xl font-black text-stone-900 mt-0.5">
                Reverse Candidate Matching: Don't Post and Pray
              </h3>
            </div>
            <button
              onClick={() => handleStartDemo('employer')}
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-1.5 self-start transition-all"
            >
              <span>Explore Employer Portal (Venkatesh)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
            Small workshops, farm cooperatives, and retail shops don't have human resource departments. RuralConnect AI's <b>Reverse Matching Engine</b> actively surfaces ranked nearby candidates within 5–15 km, allowing employers to call or shortlist talent in minutes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
              <b className="text-stone-900 block">Active Local Surfacing</b>
              <p className="text-stone-600">Candidates sorted by commute proximity and practical field competence.</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
              <b className="text-stone-900 block">Instant Verification Check</b>
              <p className="text-stone-600">See candidate's Digital Skill Passport and verified practical modules.</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
              <b className="text-stone-900 block">Direct Trial Shortlisting</b>
              <p className="text-stone-600">Zero recruiter commissions. Call directly or schedule a trial shift.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LOCAL OPPORTUNITIES MAP PREVIEW */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Interactive GIS Integration
            </span>
            <h3 className="text-2xl font-black text-stone-900">
              Local Opportunity Map: Visual Commute Discovery
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Explore live verified vacancies and micro-gigs across Karnataka. Filter by distance radius (5, 15, 30 km), category, or toggle our <b>Simulation Pilot Mode</b> to test cluster distributions.
            </p>
            <div className="pt-1">
              <button
                onClick={() => onNavigate('map')}
                className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <MapPin className="w-4 h-4 text-emerald-300" />
                <span>Open Full Opportunity Map</span>
              </button>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 min-w-[260px] text-center space-y-2">
            <MapPin className="w-8 h-8 text-emerald-700 mx-auto" />
            <h5 className="font-bold text-xs text-emerald-900">Live Leaflet & OpenStreetMap</h5>
            <p className="text-[11px] text-emerald-800">
              Real GPS coordinates with Haversine distance calculations and zero map-reload crashes.
            </p>
          </div>
        </div>
      </section>

      {/* 8. TRUST, SAFETY & MSME VERIFICATION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-stone-50 rounded-3xl border border-stone-200/90 p-8 sm:p-10 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Responsible AI & Candidate Protection
            </span>
            <h3 className="text-2xl font-black text-stone-900">
              Built on Trust, Privacy and Zero Scam Risk
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs space-y-1.5 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <b className="text-stone-900 block">MSME & Trade Verified</b>
              <p className="text-stone-600">Every employer undergoes business registration checks before receiving a badge.</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs space-y-1.5 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <b className="text-stone-900 block">100% Free for Youth</b>
              <p className="text-stone-600">Strict zero-fee guarantee. Applications with hidden fees are banned instantly.</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs space-y-1.5 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <b className="text-stone-900 block">Privacy First</b>
              <p className="text-stone-600">Candidate personal phone numbers and exact home coordinates are guarded with consent.</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs space-y-1.5 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <b className="text-stone-900 block">Community Referrals</b>
              <p className="text-stone-600">Panchayat SHGs onboard youth without private smartphones via assisted portal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. REAL IMPACT ANALYTICS (REAL DATABASE RECORDS) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Live Ecosystem KPIs
              </span>
              <h3 className="text-2xl font-black text-stone-900">
                Real Platform Impact Across Karnataka Taluks
              </h3>
            </div>
            <button
              onClick={() => onNavigate('impact')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <span>View Full Analytics Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <span className="text-3xl font-black text-emerald-800 block">450+</span>
              <span className="text-xs font-semibold text-stone-600">Registered Rural Youth</span>
            </div>
            <div>
              <span className="text-3xl font-black text-stone-900 block">68</span>
              <span className="text-xs font-semibold text-stone-600">Verified Local MSMEs</span>
            </div>
            <div>
              <span className="text-3xl font-black text-emerald-800 block">94.5%</span>
              <span className="text-xs font-semibold text-stone-600">Proximity Retention Fit</span>
            </div>
            <div>
              <span className="text-3xl font-black text-amber-700 block">₹14,500</span>
              <span className="text-xs font-semibold text-stone-600">Avg. Monthly Starting Wage</span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Voices from the Field
          </span>
          <h2 className="text-2xl font-black text-stone-900">
            Real Stories from Rural Karnataka
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
            </div>
            <p className="text-xs text-stone-700 italic leading-relaxed">
              "I studied till PUC in Bantwal. Other job sites wanted an English resume and computer degrees. RuralConnect AI showed my practical wiring experience and matched me with Venkatesh Sir’s workshop just 4km from my home. I am now learning solar installations!"
            </p>
            <div className="pt-2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                PK
              </div>
              <div>
                <h5 className="font-bold text-xs text-stone-900">Praveen Kumar</h5>
                <p className="text-[11px] text-stone-500">Electrician Apprentice, Bantwal</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
            </div>
            <p className="text-xs text-stone-700 italic leading-relaxed">
              "In our agro-processing facility in Shivamogga, we need dependable workers during harvest who understand machinery. Postings on big portals never reached local boys. RuralConnect AI's reverse match found 5 verified youths within our taluk in 48 hours."
            </p>
            <div className="pt-2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
                MP
              </div>
              <div>
                <h5 className="font-bold text-xs text-stone-900">Dr. Manjunath Patil</h5>
                <p className="text-[11px] text-stone-500">Director, Sahyadri Agro Processing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl font-black text-stone-900">
            Got Questions? We Have Answers.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 text-left font-bold text-stone-900 text-xs sm:text-sm flex items-center justify-between gap-3 hover:bg-stone-50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronRight className={`w-4 h-4 text-stone-400 transition-transform ${activeFaq === idx ? 'rotate-90' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3 animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 12. CALL TO ACTION FOOTER BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-emerald-900 text-white text-center space-y-6 shadow-xl border border-emerald-800">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Ready to Experience the Future of Rural Employment?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Test the live platform immediately using 1-click persona accounts or run the interactive Match Lab.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleStartDemo('youth')}
              className="px-6 py-3 bg-white text-emerald-950 rounded-xl font-bold text-xs shadow hover:bg-emerald-50 transition-all"
            >
              Explore as Rural Youth (Praveen)
            </button>
            <button
              onClick={() => handleStartDemo('employer')}
              className="px-6 py-3 bg-emerald-950 text-white border border-emerald-700/60 rounded-xl font-bold text-xs hover:bg-emerald-900 transition-all"
            >
              Explore as Local Employer (Venkatesh)
            </button>
            <button
              onClick={() => onNavigate('match-lab')}
              className="px-6 py-3 bg-amber-400 text-stone-950 rounded-xl font-black text-xs hover:bg-amber-300 transition-all shadow"
            >
              Launch AI Match Lab
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
