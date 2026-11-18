import React, { useState } from 'react';
import {
  X, Users, HeartHandshake, CheckCircle2, ShieldCheck,
  Send, AlertCircle
} from 'lucide-react';

export default function CommunityReferralModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    referrer_name: '',
    referrer_phone: '',
    referrer_organization: 'Gram Panchayat SHG',
    youth_name: '',
    youth_phone: '',
    target_sector: 'Electrical & Workshop',
    village: '',
    district: 'Dakshina Kannada',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/community-referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2200);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <HeartHandshake className="w-5 h-5 text-emerald-700" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">Community Referral Portal</h3>
              <p className="text-xs text-slate-500">For Gram Panchayats, SHGs & Youth Clubs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Referral Registered Successfully!</h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Our rural talent coordinators will verify details and reach out to the youth and local businesses.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-xs">
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              Help connect deserving rural youth who lack smartphone access to genuine local employers.
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Name (Referrer) *</label>
                <input
                  type="text"
                  required
                  value={formData.referrer_name}
                  onChange={(e) => setFormData({ ...formData, referrer_name: e.target.value })}
                  placeholder="e.g. Shobha Gowda"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.referrer_phone}
                  onChange={(e) => setFormData({ ...formData, referrer_phone: e.target.value })}
                  placeholder="9845000000"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Community Organization</label>
              <select
                value={formData.referrer_organization}
                onChange={(e) => setFormData({ ...formData, referrer_organization: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="Gram Panchayat SHG">Sanjeevini / Gram Panchayat SHG</option>
                <option value="Stree Shakti Group">Stree Shakti Self Help Group</option>
                <option value="Rural Youth Club">Village Youth Club / Yuvaka Sangha</option>
                <option value="Community Volunteer">Independent Community Volunteer</option>
              </select>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <h4 className="font-bold text-slate-800 mb-2">Referred Candidate Information</h4>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Candidate Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.youth_name}
                    onChange={(e) => setFormData({ ...formData, youth_name: e.target.value })}
                    placeholder="Candidate full name"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Candidate Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.youth_phone}
                    onChange={(e) => setFormData({ ...formData, youth_phone: e.target.value })}
                    placeholder="Candidate mobile"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Village / Taluk *</label>
                <input
                  type="text"
                  required
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  placeholder="e.g. Bantwal Grama"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Work Sector</label>
                <select
                  value={formData.target_sector}
                  onChange={(e) => setFormData({ ...formData, target_sector: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="Electrical & Workshop">Electrical & Workshop</option>
                  <option value="Agriculture & Post-Harvest">Agriculture & Post-Harvest</option>
                  <option value="Retail & Store Counter">Retail & Store Counter</option>
                  <option value="Tractor & Vehicle Mechanics">Tractor & Vehicle Mechanics</option>
                  <option value="Any Practical Role">Any Practical Role</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Practical Skills / Notes</label>
              <textarea
                rows="2"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Mention any hands-on experience (e.g. helped father on farm, good at mobile recharge, knows tailoring)..."
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
              />
            </div>

            <div className="pt-3 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-md shadow-emerald-700/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Submitting...' : 'Submit Referral'}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
