import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Lock, Mail, User, Building, ShieldCheck, ArrowRight,
  Sparkles, CheckCircle2, AlertCircle
} from 'lucide-react';

export default function LoginPage({ onNavigate }) {
  const { login, demoLogin } = useAuth();
  const { lang, t } = useLanguage();
  const [role, setRole] = useState('youth'); // 'youth', 'employer', 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      if (role === 'youth') onNavigate('youth-dashboard');
      else if (role === 'employer') onNavigate('employer-dashboard');
      else onNavigate('admin-dashboard');
    } else {
      setError(res.message || (lang === 'kn' ? 'ತಪ್ಪಾದ ರುಜುವಾತುಗಳು. ಕೆಳಗಿನ 1-ಕ್ಲಿಕ್ ಡೆಮೊ ಬಳಸಿ.' : lang === 'hi' ? 'अमान्य क्रेडेंशियल्स। या नीचे दिए गए 1-क्लिक डेमो का उपयोग करें।' : 'Invalid credentials. Or use 1-Click Demo Login below.'));
    }
  };

  const handle1ClickDemo = async (targetRole) => {
    setLoading(true);
    const res = await demoLogin(targetRole);
    setLoading(false);
    if (res.success) {
      if (targetRole === 'youth') onNavigate('youth-dashboard');
      else if (targetRole === 'employer') onNavigate('employer-dashboard');
      else onNavigate('admin-dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/90 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-emerald-100">
            <Lock className="w-5 h-5 text-emerald-800" />
          </div>
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">
            {lang === 'kn' ? 'ಮರಳಿ ಸ್ವಾಗತ' : lang === 'hi' ? 'पुनः स्वागत है' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-stone-500">
            {lang === 'kn' ? 'ನಿಮ್ಮ ರೂರಲ್‌ಕನೆಕ್ಟ್ ಖಾತೆಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ' : lang === 'hi' ? 'अपने रूरलकनेक्ट एआई खाते में प्रवेश करें' : 'Sign in to access your RuralConnect AI portal'}
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100 rounded-2xl text-xs font-bold border border-stone-200/60">
          <button
            type="button"
            onClick={() => { setRole('youth'); setEmail('youth@ruralconnect.ai'); setPassword('demo123'); }}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 ${
              role === 'youth' ? 'bg-white text-emerald-800 shadow-sm border border-stone-200/60' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{lang === 'kn' ? 'ಯುವಕ' : lang === 'hi' ? 'युवा' : 'Youth'}</span>
          </button>
          <button
            type="button"
            onClick={() => { setRole('employer'); setEmail('employer@ruralconnect.ai'); setPassword('demo123'); }}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 ${
              role === 'employer' ? 'bg-white text-emerald-800 shadow-sm border border-stone-200/60' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>{lang === 'kn' ? 'ಉದ್ಯೋಗದಾತ' : lang === 'hi' ? 'नियोक्ता' : 'Employer'}</span>
          </button>
          <button
            type="button"
            onClick={() => { setRole('admin'); setEmail('admin@ruralconnect.ai'); setPassword('demo123'); }}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 ${
              role === 'admin' ? 'bg-white text-emerald-800 shadow-sm border border-stone-200/60' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === 'kn' ? 'ಅಡ್ಮಿನ್' : lang === 'hi' ? 'एडमिन' : 'Admin'}</span>
          </button>
        </div>

        {/* 1-Click Instant Demo Box for Hackathon Judges */}
        <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>{lang === 'kn' ? 'ಹ್ಯಾಕಥಾನ್ ತ್ವರಿತ ಮೌಲ್ಯಮಾಪನ:' : lang === 'hi' ? 'हैकाथॉन त्वरित मूल्यांकन:' : 'Hackathon Instant Evaluation:'}</span>
          </div>
          <p className="text-[11px] text-emerald-800/90 mb-3">
            {lang === 'kn'
              ? 'ಪಾಸ್‌ವರ್ಡ್ ಟೈಪ್ ಮಾಡದೆ ನೇರವಾಗಿ ಪ್ರವೇಶಿಸಿ:'
              : lang === 'hi'
              ? 'पासवर्ड टाइप किए बिना सीधे 1-क्लिक में प्रवेश करें:'
              : 'Skip manual password typing and evaluate instantly:'}
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handle1ClickDemo('youth')}
              className="py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-[11px] text-center shadow-sm transition-all"
            >
              Praveen (Youth)
            </button>
            <button
              type="button"
              onClick={() => handle1ClickDemo('employer')}
              className="py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl font-bold text-[11px] text-center shadow-sm transition-all"
            >
              Venkatesh (Biz)
            </button>
            <button
              type="button"
              onClick={() => handle1ClickDemo('admin')}
              className="py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-[11px] text-center shadow-sm transition-all"
            >
              Gram Vikas
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {lang === 'kn' ? 'ಇಮೇಲ್ ವಿಳಾಸ' : lang === 'hi' ? 'ईमेल पता' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@ruralconnect.ai"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-stone-900 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {lang === 'kn' ? 'ಪಾಸ್‌ವರ್ಡ್' : lang === 'hi' ? 'पासवर्ड' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-stone-900 bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <span>
              {loading
                ? (lang === 'kn' ? 'ದೃಢೀಕರಿಸಲಾಗುತ್ತಿದೆ...' : lang === 'hi' ? 'प्रमाणीकरण हो रहा है...' : 'Authenticating...')
                : (lang === 'kn' ? 'ಸೈನ್ ಇನ್' : lang === 'hi' ? 'साइन इन करें' : 'Sign In')}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100">
          <span>{lang === 'kn' ? 'ಇನ್ನೂ ಖಾತೆ ಇಲ್ಲವೇ? ' : lang === 'hi' ? 'क्या अभी तक खाता नहीं है? ' : "Don't have an account yet? "}</span>
          <button
            onClick={() => onNavigate('register')}
            className="font-bold text-emerald-800 hover:underline"
          >
            {lang === 'kn' ? 'ಇಲ್ಲಿ ನೋಂದಾಯಿಸಿ' : lang === 'hi' ? 'यहाँ पंजीकरण करें' : 'Register Here'}
          </button>
        </div>

      </div>
    </div>
  );
}
