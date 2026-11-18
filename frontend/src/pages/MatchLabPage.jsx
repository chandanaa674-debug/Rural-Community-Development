import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Sparkles, Sliders, CheckCircle2, AlertTriangle, ArrowRight,
  TrendingUp, RefreshCw, Layers, ShieldCheck, MapPin, Banknote,
  GraduationCap, Clock, HelpCircle, Award, Compass, Cpu, Zap,
  Check, X, FileText, BarChart3, Users, Building
} from 'lucide-react';

export default function MatchLabPage({ onNavigate, onOpenSkillGap }) {
  const { lang, t, getSkillLabel, getCategoryLabel, getDistrictLabel } = useLanguage();

  const [activeTab, setActiveTab] = useState('match'); // 'match', 'compare', 'scenarios', 'impact'
  const [scenarios, setScenarios] = useState([]);
  const [loadingScenarios, setLoadingScenarios] = useState(false);

  // STAGE A: Candidate Input
  const [candidate, setCandidate] = useState({
    name: 'Praveen Poojary',
    village: 'Bantwal Grama',
    district: 'Dakshina Kannada',
    education: '12th / PUC Pass (Science)',
    skills: [
      { name: 'Electrical Repair', level: 'Intermediate', is_practical: true },
      { name: 'Wiring', level: 'Intermediate', is_practical: true },
      { name: 'Appliance Repair', level: 'Basic', is_practical: true }
    ],
    practical_experience: 'Assisted senior village electrician on 45+ domestic wiring and pump starter repairs.',
    preferred_work: 'Electrical & Repair',
    expected_salary: 12000,
    availability: 'full-time',
    willing_to_relocate: false,
    latitude: 12.8954,
    longitude: 75.0345
  });

  // STAGE B: Employer Requirements
  const [job, setJob] = useState({
    business_name: 'Sri Rama Electrical Works',
    title: 'Electrical Workshop Assistant',
    category: 'Electrical & Repair',
    required_skills: ['Electrical Repair', 'Wiring', 'Motor Winding Basics'],
    preferred_education: 'Any / Practical Skills',
    min_salary: 12000,
    max_salary: 16000,
    village: 'Bantwal Town',
    district: 'Dakshina Kannada',
    job_type: 'full-time',
    working_hours: '9:00 AM - 6:30 PM',
    latitude: 12.8980,
    longitude: 75.0360
  });

  // Configurable Weights
  const [showWeightSliders, setShowWeightSliders] = useState(false);
  const [weights, setWeights] = useState({
    skills: 35,
    experience: 15,
    location: 15,
    education: 10,
    salary: 10,
    availability: 10,
    work_preferences: 5
  });

  // Execution & Results
  const [processing, setProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const [matchResult, setMatchResult] = useState(null);

  // Comparison State
  const [comparisonResult, setComparisonResult] = useState(null);
  const [comparing, setComparing] = useState(false);

  // Impact Simulator State
  const [impactInputs, setImpactInputs] = useState({
    youth_count: 500,
    employer_count: 45,
    vacancies_per_employer: 2.5,
    match_rate: 82.0,
    candidates_per_vacancy: 4.0
  });
  const [impactResult, setImpactResult] = useState(null);
  const [loadingImpact, setLoadingImpact] = useState(false);

  // Preset Candidates
  const presetCandidates = [
    {
      label: 'Rural Electrician Trainee',
      data: {
        name: 'Praveen Poojary',
        village: 'Bantwal Grama',
        district: 'Dakshina Kannada',
        education: '12th / PUC Pass (Science)',
        skills: [
          { name: 'Electrical Repair', level: 'Intermediate', is_practical: true },
          { name: 'Wiring', level: 'Intermediate', is_practical: true },
          { name: 'Appliance Repair', level: 'Basic', is_practical: true }
        ],
        practical_experience: 'Assisted senior village electrician on 45+ domestic wiring and pump starter repairs.',
        preferred_work: 'Electrical & Repair',
        expected_salary: 12000,
        availability: 'full-time',
        willing_to_relocate: false,
        latitude: 12.8954,
        longitude: 75.0345
      }
    },
    {
      label: 'PUC Computer Graduate',
      data: {
        name: 'Ravi Kumar',
        village: 'Bantwal Grama',
        district: 'Dakshina Kannada',
        education: '12th / PUC Pass (Commerce)',
        skills: [
          { name: 'Data Entry', level: 'Intermediate', is_practical: true },
          { name: 'Typing', level: 'Intermediate', is_practical: true },
          { name: 'MS Office', level: 'Basic', is_practical: true }
        ],
        practical_experience: 'Managed village cooperative society monthly register and customer bill entry for 8 months.',
        preferred_work: 'Office & Computer',
        expected_salary: 12000,
        availability: 'full-time',
        willing_to_relocate: false,
        latitude: 12.8954,
        longitude: 75.0345
      }
    },
    {
      label: 'Agri Machinery Operator',
      data: {
        name: 'Basavaraj Gowda',
        village: 'Thirthahalli Road',
        district: 'Shivamogga',
        education: '10th Standard',
        skills: [
          { name: 'Tractor Driving', level: 'Advanced', is_practical: true },
          { name: 'Agricultural Machinery', level: 'Intermediate', is_practical: true },
          { name: 'Cultivation', level: 'Advanced', is_practical: true }
        ],
        practical_experience: '5 years operating family power tillers, tractors, and arecanut peeling machines.',
        preferred_work: 'Agriculture',
        expected_salary: 14000,
        availability: 'seasonal',
        willing_to_relocate: false,
        latitude: 13.9299,
        longitude: 75.5681
      }
    },
    {
      label: 'Tailoring Assistant',
      data: {
        name: 'Kavitha M.',
        village: 'Maddur Taluk',
        district: 'Mandya',
        education: '10th Standard',
        skills: [
          { name: 'Tailoring', level: 'Advanced', is_practical: true },
          { name: 'Garment Stitching', level: 'Intermediate', is_practical: true },
          { name: 'Alteration', level: 'Intermediate', is_practical: true }
        ],
        practical_experience: 'Trained in rural Self-Help Group (SHG) tailoring center; completed 120+ orders.',
        preferred_work: 'Tailoring & Garments',
        expected_salary: 10000,
        availability: 'full-time',
        willing_to_relocate: false,
        latitude: 12.5244,
        longitude: 76.8958
      }
    },
    {
      label: 'Two-Wheeler Mechanic',
      data: {
        name: 'Suresh Naik',
        village: 'Sagar Taluk',
        district: 'Shivamogga',
        education: 'Below 10th Standard',
        skills: [
          { name: 'Vehicle Repair', level: 'Intermediate', is_practical: true },
          { name: 'Two Wheeler Mechanic', level: 'Intermediate', is_practical: true },
          { name: 'Brake Servicing', level: 'Basic', is_practical: true }
        ],
        practical_experience: 'Apprenticed with uncle in local shed repairing Hero & Bajaj motorcycles and changing engine oil.',
        preferred_work: 'Automotive',
        expected_salary: 11000,
        availability: 'full-time',
        willing_to_relocate: false,
        latitude: 14.1670,
        longitude: 75.0300
      }
    },
    {
      label: 'Retail Sales Counter',
      data: {
        name: 'Deepa Nayak',
        village: 'Karkala Town',
        district: 'Udupi',
        education: '12th / PUC Pass',
        skills: [
          { name: 'Retail Sales', level: 'Intermediate', is_practical: true },
          { name: 'Customer Handling', level: 'Intermediate', is_practical: true },
          { name: 'Billing', level: 'Basic', is_practical: true }
        ],
        practical_experience: 'Worked at village provision store handling retail counters and UPI billing.',
        preferred_work: 'Retail',
        expected_salary: 11500,
        availability: 'full-time',
        willing_to_relocate: false,
        latitude: 13.2140,
        longitude: 74.9970
      }
    }
  ];

  // Preset Employers
  const presetEmployers = [
    {
      label: 'Electrical Workshop (Bantwal)',
      data: {
        business_name: 'Sri Rama Electrical Works',
        title: 'Electrical Workshop Assistant',
        category: 'Electrical & Repair',
        required_skills: ['Electrical Repair', 'Wiring', 'Motor Winding Basics'],
        preferred_education: 'Any / Practical Skills',
        min_salary: 12000,
        max_salary: 16000,
        village: 'Bantwal Town',
        district: 'Dakshina Kannada',
        job_type: 'full-time',
        working_hours: '9:00 AM - 6:30 PM',
        latitude: 12.8980,
        longitude: 75.0360
      }
    },
    {
      label: 'Agro Processing (Shivamogga)',
      data: {
        business_name: 'Sahyadri Agro Processing Co-op',
        title: 'Seasonal Machinery Operator & Field Transit',
        category: 'Agriculture',
        required_skills: ['Tractor Driving', 'Farm Equipment', 'Heavy Lifting'],
        preferred_education: 'Any / Practical Experience',
        min_salary: 14000,
        max_salary: 18000,
        village: 'Shivamogga Rural',
        district: 'Shivamogga',
        job_type: 'seasonal',
        working_hours: '8:00 AM - 5:00 PM',
        latitude: 13.9350,
        longitude: 75.5720
      }
    },
    {
      label: 'Digital Grama Kendra (Bantwal)',
      data: {
        business_name: 'Digital Grama Seva Kendra',
        title: 'Computer Operator & Billing Assistant',
        category: 'Office & Computer',
        required_skills: ['Data Entry', 'Spreadsheet Basics', 'Customer Handling'],
        preferred_education: 'PUC / Any',
        min_salary: 11000,
        max_salary: 15000,
        village: 'Bantwal Town',
        district: 'Dakshina Kannada',
        job_type: 'full-time',
        working_hours: '9:30 AM - 6:00 PM',
        latitude: 12.8995,
        longitude: 75.0380
      }
    },
    {
      label: 'Garments Boutique (Mandya)',
      data: {
        business_name: 'Nandini Garments & Boutique',
        title: 'Garment Stitching & Alteration Helper',
        category: 'Tailoring & Garments',
        required_skills: ['Tailoring', 'Garment Stitching', 'Cutting Master Basics'],
        preferred_education: 'Any / Practical Skills',
        min_salary: 10000,
        max_salary: 14000,
        village: 'Mandya City',
        district: 'Mandya',
        job_type: 'full-time',
        working_hours: '10:00 AM - 6:00 PM',
        latitude: 12.5218,
        longitude: 76.8950
      }
    },
    {
      label: 'Two-Wheeler Auto Care (Sagar)',
      data: {
        business_name: 'Maruthi Auto Care & Spares',
        title: 'Two-Wheeler Service Technician',
        category: 'Mechanical & Automotive',
        required_skills: ['Two Wheeler Mechanic', 'Engine Oil Change', 'Puncture Repair'],
        preferred_education: 'Practical Experience Valued',
        min_salary: 11000,
        max_salary: 15000,
        village: 'Sagar Town',
        district: 'Shivamogga',
        job_type: 'full-time',
        working_hours: '9:00 AM - 7:00 PM',
        latitude: 14.1695,
        longitude: 75.0330
      }
    },
    {
      label: 'Retail Supermarket (Karkala)',
      data: {
        business_name: 'Malnad Fresh Mart & Provisions',
        title: 'Retail Inventory & Counter Assistant',
        category: 'Retail',
        required_skills: ['Retail Sales', 'Billing', 'Inventory Management'],
        preferred_education: '10th / PUC',
        min_salary: 11000,
        max_salary: 14500,
        village: 'Karkala Town',
        district: 'Udupi',
        job_type: 'full-time',
        working_hours: '9:00 AM - 8:00 PM',
        latitude: 13.2180,
        longitude: 74.9990
      }
    }
  ];

  const processStepTitles = [
    'Parsing candidate practical skills & vernacular taxonomy...',
    'Understanding employer operational requirements...',
    'Evaluating practical hands-on experience equivalence...',
    'Computing Haversine commute proximity & daily travel viability...',
    'Verifying wage expectations and shift schedule compatibility...',
    'Executing multi-factor weighted scoring equation...',
    'Synthesizing explainable rationale & skill gap bridge...'
  ];

  // Fetch demonstration scenarios
  useEffect(() => {
    fetch('/api/simulation/scenarios')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setScenarios(data.scenarios || []);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch initial impact simulation
  useEffect(() => {
    runImpactCalculation();
  }, []);

  // Run AI Matching
  const handleRunMatch = async () => {
    setProcessing(true);
    setProcessStep(0);
    setMatchResult(null);

    // Step-by-step progress animation
    for (let step = 0; step < 7; step++) {
      setProcessStep(step);
      await new Promise(r => setTimeout(r, 220));
    }

    try {
      const res = await fetch('/api/simulation/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidate,
          job,
          weights
        })
      });
      const data = await res.json();
      if (data.success) {
        setMatchResult(data.result);
      }
    } catch (err) {
      console.error('Simulation matching failed', err);
    } finally {
      setProcessing(false);
    }
  };

  // Run AI vs Baseline Comparison
  const handleRunComparison = async () => {
    setComparing(true);
    try {
      const res = await fetch('/api/simulation/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate, job })
      });
      const data = await res.json();
      if (data.success) {
        setComparisonResult(data.comparison);
      }
    } catch (err) {
      console.error('Comparison failed', err);
    } finally {
      setComparing(false);
    }
  };

  // Load a Pre-built Scenario
  const handleLoadScenario = (sc) => {
    setCandidate(sc.candidate);
    setJob(sc.employer);
    setActiveTab('match');
    setTimeout(() => {
      handleRunMatch();
    }, 150);
  };

  // Run Impact Simulation
  const runImpactCalculation = async () => {
    setLoadingImpact(true);
    try {
      const res = await fetch('/api/simulation/impact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(impactInputs)
      });
      const data = await res.json();
      if (data.success) {
        setImpactResult(data.impact);
      }
    } catch (err) {
      console.error('Impact calculation failed', err);
    } finally {
      setLoadingImpact(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Simulation Header */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-600" />
              <span>Interactive Evaluation Environment</span>
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              Live Mathematical Pipeline
            </span>
          </div>

          <div className="text-xs text-stone-500 font-medium">
            HackCulture Global Hackathon Innovation Track
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            RuralConnect AI Match Lab
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
            See how intelligent employment matching connects rural talent with local businesses. Test custom candidate profiles, tune multi-factor weights, and compare against legacy keyword matching.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="pt-3 border-t border-stone-100 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('match')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'match'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Match Simulator</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('compare');
              if (!comparisonResult) handleRunComparison();
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'compare'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>AI vs Keyword Baseline</span>
          </button>

          <button
            onClick={() => setActiveTab('scenarios')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'scenarios'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>5 Demonstration Scenarios</span>
          </button>

          <button
            onClick={() => setActiveTab('impact')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'impact'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Live Impact Simulator</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 1: AI MATCH SIMULATOR ================= */}
      {activeTab === 'match' && (
        <div className="space-y-6">
          
          {/* Quick Select Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quick Candidate Preset */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                Quick-Load Candidate Preset:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presetCandidates.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCandidate(preset.data);
                      setMatchResult(null);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      candidate.name === preset.data.name
                        ? 'bg-emerald-800 text-white font-bold shadow-sm'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Employer Preset */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                Quick-Load Vacancy Preset:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presetEmployers.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setJob(preset.data);
                      setMatchResult(null);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      job.title === preset.data.title && job.business_name === preset.data.business_name
                        ? 'bg-emerald-800 text-white font-bold shadow-sm'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dual Input Stages: Stage A & Stage B */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* STAGE A: CANDIDATE INPUT */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                    A
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900">Stage A: Candidate Profile</h3>
                    <p className="text-[11px] text-stone-500">Untapped rural talent abilities</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Editable Profile
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Candidate Name</label>
                    <input
                      type="text"
                      value={candidate.name}
                      onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
                      className="w-full p-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Education</label>
                    <input
                      type="text"
                      value={candidate.education}
                      onChange={(e) => setCandidate({ ...candidate, education: e.target.value })}
                      className="w-full p-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Village & Taluk</label>
                    <input
                      type="text"
                      value={candidate.village}
                      onChange={(e) => setCandidate({ ...candidate, village: e.target.value })}
                      className="w-full p-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">District</label>
                    <input
                      type="text"
                      value={candidate.district}
                      onChange={(e) => setCandidate({ ...candidate, district: e.target.value })}
                      className="w-full p-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">
                    Verified Skills (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={candidate.skills.map(s => s.name || s).join(', ')}
                    onChange={(e) => {
                      const names = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                      setCandidate({
                        ...candidate,
                        skills: names.map(n => ({ name: n, level: 'Intermediate', is_practical: true }))
                      });
                    }}
                    className="w-full p-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">
                    Hands-On Practical Experience (No formal CV required)
                  </label>
                  <textarea
                    rows="2"
                    value={candidate.practical_experience}
                    onChange={(e) => setCandidate({ ...candidate, practical_experience: e.target.value })}
                    className="w-full p-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Expected Salary (₹/mo)</label>
                    <input
                      type="number"
                      step="500"
                      value={candidate.expected_salary}
                      onChange={(e) => setCandidate({ ...candidate, expected_salary: parseFloat(e.target.value) || 0 })}
                      className="w-full p-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Availability</label>
                    <select
                      value={candidate.availability}
                      onChange={(e) => setCandidate({ ...candidate, availability: e.target.value })}
                      className="w-full p-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    >
                      <option value="full-time">Full-Time</option>
                      <option value="part-time">Part-Time</option>
                      <option value="seasonal">Seasonal / Micro-Gig</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* STAGE B: EMPLOYER REQUIREMENTS */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-black">
                    B
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900">Stage B: Employer Vacancy</h3>
                    <p className="text-[11px] text-stone-500">Local small enterprise demand</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  MSME Opening
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Business Name</label>
                    <input
                      type="text"
                      value={job.business_name}
                      onChange={(e) => setJob({ ...job, business_name: e.target.value })}
                      className="w-full p-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Job Title</label>
                    <input
                      type="text"
                      value={job.title}
                      onChange={(e) => setJob({ ...job, title: e.target.value })}
                      className="w-full p-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Category</label>
                    <select
                      value={job.category}
                      onChange={(e) => setJob({ ...job, category: e.target.value })}
                      className="w-full p-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    >
                      <option value="Electrical & Repair">Electrical & Repair</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Retail">Retail</option>
                      <option value="Office & Computer">Office & Computer</option>
                      <option value="Tailoring & Garments">Tailoring & Garments</option>
                      <option value="Mechanical & Automotive">Mechanical & Automotive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Preferred Education</label>
                    <input
                      type="text"
                      value={job.preferred_education}
                      onChange={(e) => setJob({ ...job, preferred_education: e.target.value })}
                      className="w-full p-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">
                    Required Skills (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={job.required_skills.join(', ')}
                    onChange={(e) => {
                      const reqs = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                      setJob({ ...job, required_skills: reqs });
                    }}
                    className="w-full p-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Min Salary (₹/mo)</label>
                    <input
                      type="number"
                      step="500"
                      value={job.min_salary}
                      onChange={(e) => setJob({ ...job, min_salary: parseFloat(e.target.value) || 0 })}
                      className="w-full p-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Max Salary (₹/mo)</label>
                    <input
                      type="number"
                      step="500"
                      value={job.max_salary}
                      onChange={(e) => setJob({ ...job, max_salary: parseFloat(e.target.value) || 0 })}
                      className="w-full p-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Work Location</label>
                    <input
                      type="text"
                      value={`${job.village}, ${job.district}`}
                      onChange={(e) => {
                        const parts = e.target.value.split(',');
                        setJob({
                          ...job,
                          village: parts[0]?.trim() || job.village,
                          district: parts[1]?.trim() || job.district
                        });
                      }}
                      className="w-full p-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Job Type</label>
                    <select
                      value={job.job_type}
                      onChange={(e) => setJob({ ...job, job_type: e.target.value })}
                      className="w-full p-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    >
                      <option value="full-time">Full-Time</option>
                      <option value="seasonal">Seasonal / Micro-Gig</option>
                      <option value="part-time">Part-Time</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Configurable Multi-Factor Weights Drawer */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200/90 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowWeightSliders(!showWeightSliders)}
                className="flex items-center gap-2 text-xs font-bold text-stone-700 hover:text-stone-900"
              >
                <Sliders className="w-3.5 h-3.5 text-emerald-700" />
                <span>Configurable Scoring Model Weights (Default: Skills 35%, Exp 15%, Loc 15%, Edu 10%, Sal 10%, Avail 10%, Pref 5%)</span>
              </button>
              <span className="text-[11px] text-stone-500 font-medium">
                {showWeightSliders ? 'Click to collapse' : 'Click to customize weights'}
              </span>
            </div>

            {showWeightSliders && (
              <div className="pt-3 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <div className="flex justify-between font-medium text-stone-600 mb-1">
                    <span>Skills Weight</span>
                    <span className="font-bold text-emerald-800">{weights.skills}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={weights.skills}
                    onChange={(e) => setWeights({ ...weights, skills: parseFloat(e.target.value) })}
                    className="w-full accent-emerald-700"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium text-stone-600 mb-1">
                    <span>Experience Weight</span>
                    <span className="font-bold text-emerald-800">{weights.experience}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={weights.experience}
                    onChange={(e) => setWeights({ ...weights, experience: parseFloat(e.target.value) })}
                    className="w-full accent-emerald-700"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium text-stone-600 mb-1">
                    <span>Commute Weight</span>
                    <span className="font-bold text-emerald-800">{weights.location}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={weights.location}
                    onChange={(e) => setWeights({ ...weights, location: parseFloat(e.target.value) })}
                    className="w-full accent-emerald-700"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium text-stone-600 mb-1">
                    <span>Salary Weight</span>
                    <span className="font-bold text-emerald-800">{weights.salary}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    value={weights.salary}
                    onChange={(e) => setWeights({ ...weights, salary: parseFloat(e.target.value) })}
                    className="w-full accent-emerald-700"
                  />
                </div>
              </div>
            )}
          </div>

          {/* STAGE C: RUN AI MATCHING BUTTON */}
          <div className="text-center pt-2">
            <button
              onClick={handleRunMatch}
              disabled={processing}
              className="px-8 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md shadow-emerald-900/20 hover:shadow-lg transition-all inline-flex items-center gap-2 group disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-emerald-300 group-hover:rotate-12 transition-transform" />
              <span>{processing ? 'Executing Multi-Factor AI Engine...' : 'Run AI Matching'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <p className="text-[11px] text-stone-500 mt-2">
              Runs real mathematical calculations based on entered candidate practical experience & job criteria.
            </p>
          </div>

          {/* Live Progress Animation Display */}
          {processing && (
            <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2.5 text-xs font-bold text-stone-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></span>
                <span>Executing Match Pipeline: Step {processStep + 1} of 7</span>
              </div>
              <p className="text-xs text-emerald-800 font-mono bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                {processStepTitles[processStep]}
              </p>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-700 h-2 rounded-full transition-all duration-200"
                  style={{ width: `${((processStep + 1) / 7) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* REAL EXPLAINABLE RESULTS VIEW */}
          {matchResult && (
            <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in zoom-in-95 duration-200">
              
              {/* Header Hero Score */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-100 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Explainable Hybrid Match Result
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Confidence: {matchResult.confidence_score}%
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                    {candidate.name} ↔ {job.title}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {job.business_name} • Commute Distance: <b className="text-stone-800">{matchResult.distance_km} km</b>
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center p-3.5 bg-stone-50 rounded-2xl border border-stone-200 min-w-[120px]">
                    <span className="text-3xl font-black text-emerald-800 block leading-none">
                      {matchResult.match_percentage}%
                    </span>
                    <span className="text-[10px] font-bold uppercase text-stone-500 mt-1 block">
                      Overall Suitability
                    </span>
                  </div>
                </div>
              </div>

              {/* Qualitative Recommendation Rationale */}
              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>AI Assessment Recommendation:</span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  {lang === 'kn' ? matchResult.recommendation_kannada : (lang === 'hi' ? matchResult.recommendation_hindi : matchResult.recommendation_text)}
                </p>
              </div>

              {/* 7-Factor Transparent Breakdown Bars */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Detailed 7-Factor Scoring Breakdown:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {Object.entries(matchResult.factor_breakdown).map(([key, val]) => (
                    <div key={key} className="p-3 bg-stone-50/60 rounded-xl border border-stone-200/80 space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-stone-700">
                        <span>{val.label}</span>
                        <span className="font-bold text-emerald-800">
                          {val.score} / {val.max} pts ({val.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-700 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min(100, (val.score / val.max) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Matched vs Missing Skills Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 bg-emerald-50/40 rounded-xl border border-emerald-200 space-y-2">
                  <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Matched Competencies ({matchResult.matched_skills.length})</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {matchResult.matched_skills.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white text-emerald-800 border border-emerald-200 shadow-2xs">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200 space-y-2">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Missing Skills for 100% Fit ({matchResult.missing_skills.length})</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {matchResult.missing_skills.length === 0 ? (
                      <span className="text-xs text-stone-500">None! Complete skill fit.</span>
                    ) : (
                      matchResult.missing_skills.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white text-amber-900 border border-amber-300 shadow-2xs">
                          {s}
                        </span>
                      ))
                    )}
                  </div>
                  {matchResult.missing_skills.length > 0 && onOpenSkillGap && (
                    <button
                      onClick={() => onOpenSkillGap(job)}
                      className="text-xs text-blue-700 hover:text-blue-900 font-bold underline block pt-1"
                    >
                      Bridge Missing Skills with Free Roadmap →
                    </button>
                  )}
                </div>
              </div>

              {/* Explainable Rationale Bullet Points */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Why RuralConnect AI Recommended this Match:
                </span>
                <div className="space-y-1.5">
                  {(lang === 'kn' ? matchResult.reasons_kannada : (lang === 'hi' ? matchResult.reasons_hindi : matchResult.reasons)).map((r, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                      <Check className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ================= TAB 2: AI VS KEYWORD BASELINE ================= */}
      {activeTab === 'compare' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-2">
            <h3 className="text-lg font-bold text-stone-900">
              Technological Innovation: AI Multi-Factor vs Traditional Keyword Matching
            </h3>
            <p className="text-xs text-stone-600 max-w-3xl leading-relaxed">
              Standard urban job portals (Naukri, Indeed) rely strictly on exact keyword substring queries. In rural markets, this causes massive rejection of capable candidates who describe practical experience in vernacular terms. Here is the direct side-by-side execution on the current input.
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={handleRunComparison}
              disabled={comparing}
              className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-sm inline-flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${comparing ? 'animate-spin' : ''}`} />
              <span>{comparing ? 'Re-running Comparison...' : 'Run Side-by-Side Comparison'}</span>
            </button>
          </div>

          {comparisonResult && (
            <div className="space-y-6 animate-in fade-in">
              {/* Dual Column Visual Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Baseline Column */}
                <div className="bg-stone-50 rounded-2xl border border-stone-300 p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-red-600 tracking-wider">
                        Legacy Approach
                      </span>
                      <h4 className="font-bold text-sm text-stone-900">Traditional Keyword Matching</h4>
                    </div>
                    <span className="text-xl font-black text-stone-500">
                      {comparisonResult.baseline_keyword_matching.overall_score}%
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-stone-600">
                    <div className="p-2.5 bg-white rounded-xl border border-stone-200">
                      <b className="text-stone-800">Skill Recognition:</b> {comparisonResult.baseline_keyword_matching.matched_skills_count} exact matches.
                      <p className="text-[11px] text-red-600 mt-0.5">Misses practical synonyms (e.g. fails to recognize switchboard wiring as electrical repair).</p>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-stone-200">
                      <b className="text-stone-800">Commute Understanding:</b> Binary district string check only.
                      <p className="text-[11px] text-red-600 mt-0.5">Cannot measure actual travel distance in kilometers.</p>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-stone-200">
                      <b className="text-stone-800">Missing Skill Gap:</b> None identified.
                      <p className="text-[11px] text-red-600 mt-0.5">Treats missing skills as binary rejection without educational next steps.</p>
                    </div>
                  </div>
                </div>

                {/* Intelligent AI Column */}
                <div className="bg-emerald-50/50 rounded-2xl border border-emerald-300 p-5 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider">
                        RuralConnect Innovation
                      </span>
                      <h4 className="font-bold text-sm text-emerald-950">Intelligent Hybrid Matching</h4>
                    </div>
                    <span className="text-2xl font-black text-emerald-800">
                      {comparisonResult.intelligent_matching.overall_score}%
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-stone-700">
                    <div className="p-2.5 bg-white rounded-xl border border-emerald-200 shadow-2xs">
                      <b className="text-emerald-950">Taxonomy Synonym Graph:</b> {comparisonResult.intelligent_matching.matched_skills_count} verified matches.
                      <p className="text-[11px] text-emerald-800 mt-0.5">Recognizes colloquial trade synonyms and practical field apprenticeship.</p>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-emerald-200 shadow-2xs">
                      <b className="text-emerald-950">Commute Distance:</b> {comparisonResult.intelligent_matching.distance_km} km Geodesic Radius.
                      <p className="text-[11px] text-emerald-800 mt-0.5">Applies continuous proximity decay curve to preserve local retention.</p>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-emerald-200 shadow-2xs">
                      <b className="text-emerald-950">Granular Skill Gap Bridge:</b> {comparisonResult.intelligent_matching.missing_skills_count} modular gaps isolated.
                      <p className="text-[11px] text-emerald-800 mt-0.5">Directly maps missing items into 3-step free learning roadmaps.</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Benchmark Dataset Evaluation Card */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-100 gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-stone-900">
                      Empirical Benchmark Performance (N=60 Field Ground-Truth Dataset)
                    </h4>
                    <p className="text-xs text-stone-500">
                      Evaluated against real candidate-employer pairs in Dakshina Kannada, Shivamogga, and Mandya.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded text-[11px] font-bold bg-stone-100 text-stone-700">
                    Labelled Test Set
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-center space-y-1">
                    <span className="text-[11px] text-stone-500 font-medium">Precision@3</span>
                    <div className="text-2xl font-black text-emerald-800">
                      {comparisonResult.benchmark_metrics.precision_at_3.intelligent_ai}
                    </div>
                    <span className="text-[10px] text-stone-400 block">
                      vs {comparisonResult.benchmark_metrics.precision_at_3.keyword_baseline} (Keyword)
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 block">
                      {comparisonResult.benchmark_metrics.precision_at_3.improvement}
                    </span>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-center space-y-1">
                    <span className="text-[11px] text-stone-500 font-medium">Recall@3</span>
                    <div className="text-2xl font-black text-emerald-800">
                      {comparisonResult.benchmark_metrics.recall_at_3.intelligent_ai}
                    </div>
                    <span className="text-[10px] text-stone-400 block">
                      vs {comparisonResult.benchmark_metrics.recall_at_3.keyword_baseline} (Keyword)
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 block">
                      {comparisonResult.benchmark_metrics.recall_at_3.improvement}
                    </span>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-center space-y-1">
                    <span className="text-[11px] text-stone-500 font-medium">Missing-Skill Detection</span>
                    <div className="text-2xl font-black text-emerald-800">
                      {comparisonResult.benchmark_metrics.missing_skill_accuracy.intelligent_ai}
                    </div>
                    <span className="text-[10px] text-stone-400 block">
                      vs 0% (Keyword Binary Rejection)
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 block">
                      Enables Career Mobility
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-stone-400 pt-1 leading-relaxed">
                  <b>Methodology & Limitations:</b> Ground-truth hiring decisions and candidate suitability were annotated with local Panchayat development officers and MSME workshop owners. Dataset represents semi-formal trade occupations; urban white-collar positions are intentionally out-of-scope.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 3: 5 DEMONSTRATION SCENARIOS ================= */}
      {activeTab === 'scenarios' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-2">
            <h3 className="text-lg font-bold text-stone-900">
              5 Pre-Configured Demonstration Scenarios for Judges
            </h3>
            <p className="text-xs text-stone-600 max-w-3xl leading-relaxed">
              Explore common real-world rural employment challenges. Click any scenario below to automatically load the candidate and employer parameters and inspect the resulting explainable match.
            </p>
          </div>

          <div className="space-y-4">
            {scenarios.map((sc, idx) => (
              <div
                key={sc.id}
                className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-sm hover:border-emerald-500 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    <h4 className="font-bold text-sm text-stone-900">{sc.title}</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-700">
                      {sc.category}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {sc.summary}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-500 pt-1">
                    <span><b>Candidate:</b> {sc.candidate.name} ({sc.candidate.village})</span>
                    <span>•</span>
                    <span><b>Employer:</b> {sc.employer.business_name}</span>
                    <span>•</span>
                    <span><b>Salary:</b> ₹{sc.employer.min_salary?.toLocaleString()} - ₹{sc.employer.max_salary?.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleLoadScenario(sc)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm whitespace-nowrap self-start md:self-center transition-all"
                >
                  <span>Load & Run Scenario</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: LIVE IMPACT SIMULATOR ================= */}
      {activeTab === 'impact' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                SIMULATED ESTIMATES
              </span>
              <span className="text-xs text-stone-400">Mathematical Macro Model</span>
            </div>
            <h3 className="text-lg font-bold text-stone-900">
              Live Employment Impact Simulator
            </h3>
            <p className="text-xs text-stone-600 max-w-3xl leading-relaxed">
              Adjust the policy levers and deployment parameters below to simulate macro economic mobility, local hiring velocity, and wage unlocks across rural taluks.
            </p>
          </div>

          {/* Interactive Sliders Grid */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Simulation Levers & Community Parameters:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-stone-700 mb-1">
                  <span>Registered Rural Youth Pool</span>
                  <span className="font-bold text-emerald-800">{impactInputs.youth_count.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={impactInputs.youth_count}
                  onChange={(e) => setImpactInputs({ ...impactInputs, youth_count: parseInt(e.target.value) })}
                  className="w-full accent-emerald-700"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-stone-700 mb-1">
                  <span>Participating Local MSMEs</span>
                  <span className="font-bold text-emerald-800">{impactInputs.employer_count.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={impactInputs.employer_count}
                  onChange={(e) => setImpactInputs({ ...impactInputs, employer_count: parseInt(e.target.value) })}
                  className="w-full accent-emerald-700"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-stone-700 mb-1">
                  <span>Avg. Monthly Vacancies / MSME</span>
                  <span className="font-bold text-emerald-800">{impactInputs.vacancies_per_employer}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="0.5"
                  value={impactInputs.vacancies_per_employer}
                  onChange={(e) => setImpactInputs({ ...impactInputs, vacancies_per_employer: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-700"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-stone-700 mb-1">
                  <span>Intelligent Match Accuracy</span>
                  <span className="font-bold text-emerald-800">{impactInputs.match_rate}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="98"
                  step="1"
                  value={impactInputs.match_rate}
                  onChange={(e) => setImpactInputs({ ...impactInputs, match_rate: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-700"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-stone-700 mb-1">
                  <span>Candidate Evaluations / Vacancy</span>
                  <span className="font-bold text-emerald-800">{impactInputs.candidates_per_vacancy}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={impactInputs.candidates_per_vacancy}
                  onChange={(e) => setImpactInputs({ ...impactInputs, candidates_per_vacancy: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-700"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={runImpactCalculation}
                  disabled={loadingImpact}
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold shadow-sm flex items-center justify-center gap-1.5 transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingImpact ? 'animate-spin' : ''}`} />
                  <span>Recalculate Projections</span>
                </button>
              </div>
            </div>
          </div>

          {/* Projected Outcomes Display */}
          {impactResult && (
            <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <h4 className="font-bold text-sm text-stone-900">
                    Projected Outcomes (Simulated Estimates)
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-stone-400">
                  Model: Haversine Micro-Commute Elasticity
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-stone-400">Total Vacancies</span>
                  <div className="text-2xl font-black text-stone-900">
                    {impactResult.projected_metrics.total_available_vacancies}
                  </div>
                  <span className="text-[10px] text-stone-500 block">Across {impactInputs.employer_count} MSMEs</span>
                </div>

                <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-800">Verified Matches</span>
                  <div className="text-2xl font-black text-emerald-800">
                    {impactResult.projected_metrics.potential_verified_matches}
                  </div>
                  <span className="text-[10px] text-emerald-700 block">High proximity suitability</span>
                </div>

                <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-blue-800">Projected Placements</span>
                  <div className="text-2xl font-black text-blue-900">
                    {impactResult.projected_metrics.projected_successful_placements}
                  </div>
                  <span className="text-[10px] text-blue-700 block">
                    {impactResult.projected_metrics.employer_hiring_coverage_percent}% hiring coverage
                  </span>
                </div>

                <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-800">Annual Wage Unlock</span>
                  <div className="text-2xl font-black text-amber-900">
                    ₹{impactResult.projected_metrics.annual_economic_wage_unlock_crores} Cr
                  </div>
                  <span className="text-[10px] text-amber-700 block">Direct rural household liquidity</span>
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
                <div className="flex items-center gap-2 font-bold text-stone-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Distress Migration Prevention:</span>
                </div>
                <p>
                  Estimated <b>{impactResult.projected_metrics.distress_migration_prevented_count} rural youth</b> retained in home taluks with daily commute under {impactResult.projected_metrics.average_commute_distance_km} km, avoiding high-cost relocation to overcrowded metropolitan slums.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
