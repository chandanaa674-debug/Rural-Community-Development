import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, HelpCircle, CheckCircle2, User, Building, ShieldCheck, X } from 'lucide-react';

export default function DemoQuickBar({ onNavigate }) {
  const { user, demoLogin } = useAuth();
  const { lang, t } = useLanguage();
  const [showGuide, setShowGuide] = useState(false);
  const [switching, setSwitching] = useState(false);

  const handleQuickSwitch = async (role) => {
    setSwitching(true);
    const res = await demoLogin(role);
    setSwitching(false);
    if (res.success && onNavigate) {
      if (role === 'youth') onNavigate('youth-dashboard');
      else if (role === 'employer') onNavigate('employer-dashboard');
      else if (role === 'admin') onNavigate('admin-dashboard');
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-emerald-900 via-brand-900 to-emerald-950 text-white text-xs py-2 px-3 sm:px-6 shadow-inner flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="font-semibold text-emerald-200 uppercase tracking-wider text-[11px]">
            {t('demoModeNotice')}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => handleQuickSwitch('youth')}
            disabled={switching}
            className={`px-2.5 py-1 rounded-full font-medium transition-all flex items-center gap-1 text-[11px] ${
              user?.role === 'youth' && user?.email === 'youth@ruralconnect.ai'
                ? 'bg-amber-400 text-slate-900 shadow font-bold'
                : 'bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100'
            }`}
          >
            <User className="w-3 h-3" />
            <span>{t('demoYouthBtn')}</span>
          </button>

          <button
            onClick={() => handleQuickSwitch('employer')}
            disabled={switching}
            className={`px-2.5 py-1 rounded-full font-medium transition-all flex items-center gap-1 text-[11px] ${
              user?.role === 'employer'
                ? 'bg-amber-400 text-slate-900 shadow font-bold'
                : 'bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100'
            }`}
          >
            <Building className="w-3 h-3" />
            <span>{t('demoEmployerBtn')}</span>
          </button>

          <button
            onClick={() => handleQuickSwitch('admin')}
            disabled={switching}
            className={`px-2.5 py-1 rounded-full font-medium transition-all flex items-center gap-1 text-[11px] ${
              user?.role === 'admin'
                ? 'bg-amber-400 text-slate-900 shadow font-bold'
                : 'bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>{t('demoAdminBtn')}</span>
          </button>

          <button
            onClick={() => setShowGuide(true)}
            className="ml-1 sm:ml-2 px-2.5 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-medium flex items-center gap-1 text-[11px]"
          >
            <Sparkles className="w-3 h-3" />
            <span>{t('demoScriptBtn')}</span>
          </button>
        </div>
      </div>

      {/* 2-Minute Demo Script Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{t('demoScriptTitle')}</h3>
                  <p className="text-xs text-slate-500">{t('demoScriptSubtitle')}</p>
                </div>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm text-slate-600">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <h4 className="font-semibold text-emerald-900 text-sm flex items-center gap-1.5">
                  <span className="w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs">1</span>
                  {t('demoStep1Title')}
                </h4>
                <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                  {t('demoStep1Desc')}
                </p>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 text-sm flex items-center gap-1.5">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">2</span>
                  {t('demoStep2Title')}
                </h4>
                <p className="text-xs text-blue-800 mt-1 leading-relaxed">
                  {t('demoStep2Desc')}
                </p>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <h4 className="font-semibold text-amber-900 text-sm flex items-center gap-1.5">
                  <span className="w-5 h-5 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs">3</span>
                  {t('demoStep3Title')}
                </h4>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  {t('demoStep3Desc')}
                </p>
              </div>

              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                <h4 className="font-semibold text-purple-900 text-sm flex items-center gap-1.5">
                  <span className="w-5 h-5 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs">4</span>
                  {t('demoStep4Title')}
                </h4>
                <p className="text-xs text-purple-800 mt-1 leading-relaxed">
                  {t('demoStep4Desc')}
                </p>
              </div>

              <div className="p-3 bg-slate-100 rounded-xl flex items-center justify-between">
                <span className="text-xs text-slate-600 font-medium">{t('toggleLangHint')}</span>
                <button
                  onClick={() => setShowGuide(false)}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
                >
                  {t('demoScriptClose')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
