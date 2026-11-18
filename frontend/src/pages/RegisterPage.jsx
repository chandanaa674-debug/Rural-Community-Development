import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  User, Building, Check, ArrowRight, ArrowLeft, ShieldCheck,
  MapPin, BookOpen, Wrench, Sparkles, AlertCircle, FileText
} from 'lucide-react';

export default function RegisterPage({ onNavigate }) {
  const { register } = useAuth();
  const { lang, t } = useLanguage();

  const [role, setRole] = useState('youth'); // 'youth' or 'employer'
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    // Youth specifics
    age: 21,
    village: 'Bantwal Grama',
    district: 'Dakshina Kannada',
    state: 'Karnataka',
    education: '12th / PUC Pass',
    languages: ['Kannada', 'Basic English'],
    skills: ['Electrical Repair', 'Wiring'],
    practical_experience: 'Helped family and local electrician with household switchboard and fan wiring.',
    expected_salary: 12000,
    availability: 'full-time',
    willing_to_relocate: false,
    resume_choice: 'skill_passport', // 'skill_passport' or 'upload_resume'
    // Employer specifics
    business_name: '',
    business_type: 'Workshop & Services',
    description: ''
  });

  const popularSkills = [
    'Electrical Repair',
    'Wiring',
    'Appliance Repair',
    'Data Entry',
    'Retail Sales',
    'Tractor Driving',
    'Tailoring',
    'Plumbing',
    'Solar Installation',
    'Dairy Farming'
  ];

  const toggleSkill = (skill) => {
    setFormData(prev => {
      const exists = prev.skills.includes(skill);
      return {
        ...prev,
        skills: exists ? prev.skills.filter(s => s !== skill) : [...prev.skills, skill]
      };
    });
  };

  const handleNext = () => {
    setError(null);
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in your name, email, and password.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      ...formData,
      role: role
    };

    const res = await register(payload);
    setLoading(false);
    if (res.success) {
      if (role === 'youth') onNavigate('youth-dashboard');
      else onNavigate('employer-dashboard');
    } else {
      setError(res.message || 'Registration failed. Please check information.');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
        
        {/* Header & Step Indicator */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              {role === 'youth' ? 'Join as Rural Youth' : 'Register Small Business'}
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Guided Onboarding: Step {step} of 3
          </p>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-1.5 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Role Toggle (Step 1 only) */}
        {step === 1 && (
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setRole('youth')}
              className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                role === 'youth' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
              }`}
            >
              <User className="w-4 h-4" />
              <span>I am a Job Seeker (Youth)</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('employer')}
              className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                role === 'employer' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>I am an Employer (Business)</span>
            </button>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* STEP 1: Basic Account Information */}
          {step === 1 && (
            <div className="space-y-3 animate-in fade-in">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {role === 'youth' ? 'Your Full Name *' : 'Contact Person Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Praveen Kumar"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              {role === 'employer' && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Business / Enterprise Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.business_name}
                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                    placeholder="e.g. Shree Krishna Electrical Works"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@email.com"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9845000000"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Password *</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Minimum 6 characters"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Location & Education / Sector */}
          {step === 2 && (
            <div className="space-y-3 animate-in fade-in">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Village / Grama *</label>
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
                  <label className="block font-semibold text-slate-700 mb-1">District (Karnataka) *</label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="Dakshina Kannada">Dakshina Kannada</option>
                    <option value="Shivamogga">Shivamogga</option>
                    <option value="Mandya">Mandya</option>
                    <option value="Uttara Kannada">Uttara Kannada</option>
                    <option value="Udupi">Udupi</option>
                    <option value="Hassan">Hassan</option>
                    <option value="Belagavi">Belagavi</option>
                  </select>
                </div>
              </div>

              {role === 'youth' ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Education Qualification</label>
                      <select
                        value={formData.education}
                        onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      >
                        <option value="10th Standard">10th Standard Pass</option>
                        <option value="12th / PUC Pass">12th / PUC Pass</option>
                        <option value="ITI / Diploma">ITI / Diploma</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Self-Taught / Practical">Self-Taught Practical Master</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Availability</label>
                      <select
                        value={formData.availability}
                        onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      >
                        <option value="full-time">Full-Time</option>
                        <option value="part-time">Part-Time</option>
                        <option value="seasonal">Seasonal / Micro-Gig</option>
                        <option value="any">Any Flexible Hours</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Expected Monthly Pay (₹)</label>
                    <input
                      type="number"
                      value={formData.expected_salary}
                      onChange={(e) => setFormData({ ...formData, expected_salary: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Primary Business Sector</label>
                  <select
                    value={formData.business_type}
                    onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="Workshop & Services">Electrical, Solar & Mechanical Workshop</option>
                    <option value="Agriculture & Processing">Agriculture & Agro-Processing</option>
                    <option value="Retail & Mart">Retail, Supermarket & Groceries</option>
                    <option value="Logistics & Delivery">Logistics, Transport & Delivery</option>
                    <option value="Construction & Plumbing">Construction, Plumbing & Masonry</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Skills & No-Resume Choice (Youth) OR Verification (Employer) */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              {role === 'youth' ? (
                <>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Select Your Practical Skills (Click all that apply):
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {popularSkills.map(skill => {
                        const selected = formData.skills.includes(skill);
                        return (
                          <button
                            type="button"
                            key={skill}
                            onClick={() => toggleSkill(skill)}
                            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                              selected
                                ? 'bg-emerald-700 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {selected && <Check className="w-3 h-3" />}
                            <span>{skill}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Tell us about your practical hands-on work:
                    </label>
                    <textarea
                      rows="2"
                      value={formData.practical_experience}
                      onChange={(e) => setFormData({ ...formData, practical_experience: e.target.value })}
                      placeholder="e.g. Worked at uncle's garage for 6 months, know how to change motorcycle engine oil and fix punctures..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                    />
                  </div>

                  {/* NO RESUME COMPULSORY CHOICE */}
                  <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                    <span className="font-bold text-emerald-900 block text-xs">
                      Resume & Profile Setup:
                    </span>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="resume_choice"
                        checked={formData.resume_choice === 'skill_passport'}
                        onChange={() => setFormData({ ...formData, resume_choice: 'skill_passport' })}
                        className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-emerald-800">
                        <b>I don't have a formal resume (Recommended)</b> — Generate my verified Digital Skill Passport from my practical skills.
                      </span>
                    </label>

                    <label className="flex items-start gap-2 cursor-pointer pt-1">
                      <input
                        type="radio"
                        name="resume_choice"
                        checked={formData.resume_choice === 'upload_resume'}
                        onChange={() => setFormData({ ...formData, resume_choice: 'upload_resume' })}
                        className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-slate-600">
                        I already have a resume file (Optional upload)
                      </span>
                    </label>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-800 block text-xs">
                      About Your Small Business
                    </span>
                    <textarea
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe what your workshop, farm, or retail store does and what kind of local talent you typically need..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                    />
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 flex items-start gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>
                      You can request an official <b>Verified Business Badge</b> inside your dashboard by submitting your MSME or Trade registration.
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="pt-4 flex items-center justify-between gap-3 border-t border-stone-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(prev => prev - 1)}
                className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 font-semibold flex items-center gap-1 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{lang === 'kn' ? 'ಹಿಂದಕ್ಕೆ' : lang === 'hi' ? 'पीछे' : 'Back'}</span>
              </button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold flex items-center gap-1 shadow-sm transition-all"
              >
                <span>{lang === 'kn' ? 'ಮುಂದುವರಿಸಿ' : lang === 'hi' ? 'आगे बढ़ें' : 'Continue'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold flex items-center gap-1 shadow-sm transition-all"
              >
                <span>
                  {loading
                    ? (lang === 'kn' ? 'ಪ್ರೊಫೈಲ್ ರಚಿಸಲಾಗುತ್ತಿದೆ...' : lang === 'hi' ? 'प्रोफ़ाइल बन रही है...' : 'Creating Profile...')
                    : (lang === 'kn' ? 'ಪೂರ್ಣಗೊಳಿಸಿ ಮತ್ತು ಪ್ರಾರಂಭಿಸಿ' : lang === 'hi' ? 'पूर्ण करें और शुरू करें' : 'Complete & Launch')}
                </span>
                <Check className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </form>

        <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100">
          <span>{lang === 'kn' ? 'ಈಗಾಗಲೇ ನೋಂದಾಯಿಸಿದ್ದೀರಾ? ' : lang === 'hi' ? 'पहले से पंजीकृत हैं? ' : 'Already registered? '}</span>
          <button
            onClick={() => onNavigate('login')}
            className="font-bold text-emerald-800 hover:underline"
          >
            {lang === 'kn' ? 'ಇಲ್ಲಿ ಲಾಗಿನ್ ಮಾಡಿ' : lang === 'hi' ? 'यहाँ लॉगिन करें' : 'Log In Here'}
          </button>
        </div>

      </div>
    </div>
  );
}
