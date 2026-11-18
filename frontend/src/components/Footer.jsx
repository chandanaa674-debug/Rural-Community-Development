import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Heart, MapPin, Phone, Mail, Award } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                RC
              </div>
              <span className="font-bold text-lg text-white">RuralConnect AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering rural youth and local micro-enterprises with explainable AI skill matching, transparent commute discovery, and practical career progression.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium pt-1">
              <Award className="w-4 h-4" />
              <span>Built for HackCulture Global Hackathon</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-xs space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Ecosystem Features
            </h4>
            <p className="hover:text-emerald-400 cursor-pointer transition-colors" onClick={() => onNavigate('jobs')}>
              Find Verified Jobs
            </p>
            <p className="hover:text-emerald-400 cursor-pointer transition-colors" onClick={() => onNavigate('match-lab')}>
              AI Match Lab & Simulator
            </p>
            <p className="hover:text-emerald-400 cursor-pointer transition-colors" onClick={() => onNavigate('map')}>
              Local Map Discovery
            </p>
            <p className="hover:text-emerald-400 cursor-pointer transition-colors" onClick={() => onNavigate('skill-gap')}>
              AI Skill Gap Analyzer
            </p>
            <p className="hover:text-emerald-400 cursor-pointer transition-colors" onClick={() => onNavigate('referral')}>
              Community Referral Portal
            </p>
            <p className="hover:text-emerald-400 cursor-pointer transition-colors" onClick={() => onNavigate('impact')}>
              District Impact Metrics
            </p>
          </div>

          {/* Trust & Safety */}
          <div className="text-xs space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Trust & Safety
            </h4>
            <div className="flex items-start gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>100% Zero Fee Guarantee — Rural youth never pay for job applications.</span>
            </div>
            <div className="flex items-start gap-1.5 text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Privacy First: Private candidate coordinates and numbers are guarded with consent.</span>
            </div>
          </div>

          {/* Local Contact & Regional Help */}
          <div className="text-xs space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Rural Helpline
            </h4>
            <div className="flex items-center gap-2 text-slate-400">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Toll-Free Helpline: 1800-RURAL-AI</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>support@ruralconnect.ai</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Karnataka Pilot Taluks (DK, Shivamogga, Mandya)</span>
            </div>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 RuralConnect AI. Open ecosystem architecture for inclusive rural employment.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for rural empowerment and local economic dignity.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
