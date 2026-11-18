import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Compass, MapPin, BookOpen, BarChart3, Users, Globe,
  LogOut, UserCircle, Bell, Menu, X, CheckCircle, ChevronDown, Cpu, Sparkles
} from 'lucide-react';

export default function Navbar({ currentPage, onNavigate }) {
  const { user, profile, logout, isAuthenticated } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifs, setShowNotifs] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetch('/api/notifications', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('rc_token')}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setNotifications(data.notifications || []);
          }
        })
        .catch(() => {});
    }
  }, [isAuthenticated, user]);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const markAllRead = async () => {
    for (const n of notifications.filter(item => !item.is_read)) {
      await fetch(`/api/notifications/${n.id}/read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('rc_token')}` }
      });
    }
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const navLinks = [
    { id: 'jobs', label: t('navJobs'), icon: Compass },
    { id: 'match-lab', label: lang === 'kn' ? 'AI ಮ್ಯಾಚ್ ಲ್ಯಾಬ್' : (lang === 'hi' ? 'एआई मैच लैब' : 'AI Match Lab'), icon: Cpu, badge: 'Live Lab' },
    { id: 'map', label: t('navMap'), icon: MapPin },
    { id: 'skill-gap', label: t('navSkillGap'), icon: BookOpen },
    { id: 'impact', label: t('navImpact'), icon: BarChart3 },
    { id: 'referral', label: t('navReferral'), icon: Users },
  ];

  const getDashboardId = () => {
    if (user?.role === 'youth') return 'youth-dashboard';
    if (user?.role === 'employer') return 'employer-dashboard';
    if (user?.role === 'admin') return 'admin-dashboard';
    return 'landing';
  };

  const getDashboardLabel = () => {
    if (user?.role === 'youth') return t('youthDashboard');
    if (user?.role === 'employer') return t('employerDashboard');
    if (user?.role === 'admin') return t('adminDashboard');
    return 'Dashboard';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Tagline */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('landing')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors">
                  RuralConnect<span className="text-emerald-600">.AI</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden sm:block leading-tight">
                {t('tagline')}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-amber-300 text-stone-900 ml-0.5 uppercase tracking-wider">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar: Language + Notifications + Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Trilingual Language Switcher: EN, ಕನ್ನಡ, हिन्दी */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded text-xs font-semibold transition-all ${
                  lang === 'en'
                    ? 'bg-white text-emerald-800 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('kn')}
                className={`px-2 py-1 rounded text-xs font-semibold transition-all ${
                  lang === 'kn'
                    ? 'bg-emerald-700 text-white shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                ಕನ್ನಡ
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2 py-1 rounded text-xs font-semibold transition-all ${
                  lang === 'hi'
                    ? 'bg-emerald-700 text-white shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {/* Notification Bell */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifs(!showNotifs)}
                    className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 relative transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notification Dropdown */}
                  {showNotifs && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-800">{t('notifications')}</span>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllRead}
                            className="text-[11px] text-emerald-600 hover:underline font-semibold"
                          >
                            {t('markAllRead')}
                          </button>
                        )}
                      </div>
                      <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-xs text-slate-400">{t('noNotifications')}</div>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              className={`p-3 text-xs ${n.is_read ? 'bg-white' : 'bg-emerald-50/50'}`}
                            >
                              <p className="font-semibold text-slate-800">{n.title}</p>
                              <p className="text-slate-500 mt-0.5">{n.message}</p>
                              <span className="text-[10px] text-slate-400 mt-1 block">
                                {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Role-Specific Portal Button */}
                <button
                  onClick={() => onNavigate(getDashboardId())}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <UserCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">{getDashboardLabel()}</span>
                  <span className="sm:hidden">{t('portal')}</span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  title={t('logout')}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('login')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {t('login')}
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="px-3.5 py-1.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg shadow-sm shadow-emerald-700/20 transition-all hover:shadow"
                >
                  {t('register')}
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2"
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
