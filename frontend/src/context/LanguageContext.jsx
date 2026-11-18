import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Brand & Header
    brandName: 'RuralConnect AI',
    tagline: 'Local Talent. Right Skills. Real Opportunities.',
    navJobs: 'Find Jobs',
    navMap: 'Discover Map',
    navSkillGap: 'Skill Gap Analyzer',
    navImpact: 'Impact Dashboard',
    navReferral: 'Community Referral',
    login: 'Log In',
    register: 'Register',
    logout: 'Log Out',
    youthDashboard: 'Youth Portal',
    employerDashboard: 'Employer Portal',
    adminDashboard: 'Admin Control',
    portal: 'Portal',

    // Demo Bar
    demoModeNotice: 'Hackathon Evaluation Mode: Switch role in 1-click',
    demoYouthBtn: 'Praveen (Youth)',
    demoEmployerBtn: 'Venkatesh (Employer)',
    demoAdminBtn: 'Gram Vikas (Admin)',
    demoScriptBtn: '2-Min Demo Script',
    demoScriptTitle: '2-Minute Judge Evaluation Tour',
    demoScriptSubtitle: 'How to evaluate RuralConnect AI end-to-end',
    demoStep1Title: 'Step 1: Rural Youth Experience (Praveen Kumar, Bantwal)',
    demoStep1Desc: 'Click "Praveen (Youth)" above. Note the 100% explainable match for Electrical Workshop Assistant. Click "Why You Match" to see transparent scoring. View his Digital Skill Passport without requiring a resume.',
    demoStep2Title: 'Step 2: AI Skill Gap Analyzer ("Know Your Skills, Grow Your Career")',
    demoStep2Desc: 'Open the Skill Gap Analyzer. See the structured 3-step learning roadmap and the Skill-to-Income projection (+122% salary jump from ₹9k to ₹20k/month upon learning solar & pump starter skills).',
    demoStep3Title: 'Step 3: Small Employer Reverse Matching (Venkatesh Rao)',
    demoStep3Desc: 'Click "Venkatesh (Employer)". Small businesses don\'t need to post & pray: our Reverse Matching Engine actively surfaces nearby verified candidates (Praveen at 0.5km with 100% match) ranked by commute and practical aptitude.',
    demoStep4Title: 'Step 4: Trust & Admin Moderation (Gram Vikas Officer)',
    demoStep4Desc: 'Click "Gram Vikas (Admin)". Review genuine employer verification requests, moderate reported scam flags, and inspect district-level skill deficit heatmaps.',
    demoScriptClose: 'Start Exploring',
    toggleLangHint: 'Try toggling English / ಕನ್ನಡ / हिन्दी in the top right navbar!',

    // Hero Section
    heroBadge: 'HackCulture 2026 Innovation Showcase',
    heroEcosystemBadge: 'Rural Employment & Skill Ecosystem',
    heroTitle: 'Connecting Rural Youth to Nearby Employers with Explainable AI',
    heroSubtitle: 'Bridging the distance between untapped rural talent and local businesses. No formal resume required — your practical skills matter.',
    exploreJobs: 'Explore Local Jobs',
    tryInstantDemo: 'Try Instant Demo as Job Seeker',
    zeroFees: 'Zero Application Fees',
    noResumeNeeded: 'No Formal CV Compulsory',
    bilingualNotice: 'Trilingual: English, ಕನ್ನಡ, हिन्दी',
    mobileFirst: 'Low-Bandwidth Mobile First',

    // Problem Statement Section
    problemBadge: 'The Hackathon Problem Statement',
    problemQuote: '"Rural youth cannot find work that fits, and small employers cannot find them."',
    problemYouthTitle: 'For Rural Job Seekers:',
    problemYouthPoint1: 'Urban job platforms demand formal English resumes that mask practical aptitude.',
    problemYouthPoint2: 'Jobs are either too far away (unviable daily commute) or pay misleading salaries.',
    problemYouthPoint3: 'Rejection leaves youth clueless about which specific skills to learn next.',
    problemEmployerTitle: 'For Local Small Employers:',
    problemEmployerPoint1: 'Small workshops and farms cannot afford expensive recruiter postings.',
    problemEmployerPoint2: 'Word-of-mouth hiring is slow, fragile, and limited to immediate family networks.',
    problemEmployerPoint3: 'Urgent seasonal demand (harvesting, festivals) stalls due to lack of local candidate visibility.',

    // How It Works
    howItWorksBadge: 'Intelligent Ecosystem Architecture',
    howItWorksTitle: 'How RuralConnect AI Solves the Divide',
    howItWorksSubtitle: 'A seamless bridge from practical skill discovery to verified employment.',
    step1Title: 'Aptitude-First Profile (No Resume Barrier)',
    step1Desc: 'Youth list their practical hands-on experience (wiring, tractor operation, retail counter, tailoring). We generate a verified Digital Skill Passport without requiring formal PDFs.',
    step2Title: 'Explainable AI Matching & Commute Discovery',
    step2Desc: 'Our 5-factor scoring engine balances skills (40%), commute distance (25%), education (15%), salary (10%), and shift availability (10%), explaining transparently why each job fits.',
    step3Title: 'Skill Gap Roadmaps & Reverse Hiring',
    step3Desc: 'Rejections become learning pathways with regional free video modules. Simultaneously, employers use Reverse Matching to proactively reach out to nearby candidates.',

    // 5 Pillars
    pillarsBadge: 'Why We Stand Out',
    pillarsTitle: '5 Pillars That Make RuralConnect AI Truly Innovative',
    pillar1Title: '1. Explainable AI Match Index',
    pillar1Desc: 'Zero black-box percentages. Candidates and employers see exactly why a match was scored (e.g. "Only 0.5 km away", "Practical Wiring verified", "Salary meets expectation").',
    pillar2Title: '2. AI Skill Gap & Income Roadmap',
    pillar2Desc: '"Know Your Skills, Grow Your Career" provides structured 3-step learning milestones and projects salary jumps (e.g. ₹9,000 to ₹20,000/mo) after completing practical modules.',
    pillar3Title: '3. Employer Reverse Candidate Matching',
    pillar3Desc: 'Small employers don\'t post and wait in silence. The system proactively surfaces ranked nearby talent based on travel distance and hands-on readiness.',
    pillar4Title: '4. Trust, Safety & Anti-Scam Verification',
    pillar4Desc: 'Rigorous MSME verification badges, strict zero-fee policy for applicants, community reporting flags, and privacy-shielded candidate GPS coordinates.',
    pillar5Title: '5. Micro-Opportunities & Seasonal Mode',
    pillar5Desc: 'Supports seasonal harvest work, weekend retail support, festival gigs, and local apprenticeships with clear daily wages and transparent hours.',
    pillar6Title: '6. Trilingual & Voice Assistant',
    pillar6Desc: 'Instant English, Kannada (ಕನ್ನಡ) & Hindi (हिन्दी) switching, speech recognition, and audio guidance tailored for low-literacy smartphone users.',

    // Live Metrics
    metricsBadge: 'Live Ecosystem KPIs',
    metricsTitle: 'Measurable Impact Across Karnataka Taluks',
    metricYouth: 'Registered Rural Youth',
    metricEmployers: 'Verified Local MSMEs',
    metricFit: 'Average Proximity Fit',
    metricPay: 'Avg. Monthly Starting Pay',
    viewFullAnalytics: 'View Full Analytics Dashboard',

    // Testimonials & FAQs
    testimonialsBadge: 'Voices from the Ground',
    testimonialsTitle: 'Real Stories from Rural Karnataka',
    testimonialsSub: '(Illustrative field pilot testimonials)',
    faqBadge: 'Frequently Asked Questions',
    faqTitle: 'Got Questions? We Have Answers.',
    readyToConnect: 'Ready to Connect Talent with Real Opportunities?',
    readyToConnectSub: 'Experience the full live platform right now using our 1-click hackathon evaluation accounts.',
    exploreYouthPraveen: 'Explore as Rural Youth (Praveen)',
    exploreBizVenkatesh: 'Explore as Local Employer (Venkatesh)',
    exploreAdminGramVikas: 'Explore Admin Control (Gram Vikas)',

    // Job Card & Common Job Details
    smartMatch: 'AI Smart Match',
    verifiedEmployer: 'Verified Business',
    microOpportunity: 'Micro-Gig / Seasonal',
    fullTime: 'Full-Time',
    partTime: 'Part-Time',
    temporary: 'Temporary',
    seasonal: 'Seasonal',
    apprenticeship: 'Apprenticeship',
    whyMatch: 'Why You Match',
    skillGap: 'Skill Gap',
    applyNow: 'Apply Now',
    applied: 'Applied',
    viewDetails: 'View Details',
    commuteDistance: 'Commute Distance',
    expectedPay: 'Expected Pay',
    standardHours: 'Standard Working Hours',
    missingSkills: 'Missing Skills',
    noMatchingJobs: 'No matching jobs found right now.',
    showingJobs: 'Showing verified opportunities',
    zeroFeesGuaranteed: 'Zero application fees • Safe direct contact',

    // Match Modal
    explainableScoreTitle: 'Explainable AI Match Assessment',
    exceptionalFit: 'Exceptional Fit for Your Profile',
    strongFit: 'Strong Practical Potential',
    matchIndex: 'Match Index',
    transparentBreakdown: 'Transparent Criteria Breakdown',
    critSkills: '1. Verified Skills & Practical Aptitude',
    critDistance: '2. Distance & Commute Accessibility',
    critEducation: '3. Education & Practical Experience Fit',
    critSalary: '4. Salary Expectation Alignment',
    critAvailability: '5. Shift & Work Schedule Alignment',
    whyRecommended: 'Why this job is recommended for you:',
    addCoverNote: 'Add a note to the employer (Optional):',
    coverNotePlaceholder: 'e.g. I live nearby in Bantwal and have practical experience in wiring. I can start immediately.',
    submitApplication: 'Submit Free Application',
    submitting: 'Submitting...',
    applicationSuccess: 'Application submitted successfully! The employer has been notified.',
    alreadyAppliedNotice: 'You have already applied for this vacancy. Track your status in your Applications portal.',
    viewFreeRoadmap: 'View Free Roadmap',
    close: 'Close',

    // Skill Gap Modal
    skillsHeadline: 'Know Your Skills, Grow Your Career',
    incomePotential: 'Skill-to-Income Potential',
    unlockUpTo: 'Unlock up to',
    currentAvg: 'Current Avg',
    certifiedAvg: 'Certified Avg',
    practicalRoadmapTitle: 'Practical Step-by-Step Learning Roadmap',
    estimatedTotal: 'Estimated Total',
    hours: 'hrs',
    days: 'Days',
    targetMilestone: 'Target Milestone',
    eligibleRoles: 'Eligible Local Roles Upon Completion:',
    freeModulesNotice: 'All learning modules are 100% free with regional audio and video.',
    done: 'Done',

    // Discover Map
    mapTitle: 'Interactive Local Employment Discovery',
    mapSub: 'Discover verified small business vacancies and micro-opportunities across Karnataka',
    useMyLocation: 'Use My Location',
    myLocationActive: 'Location Detected',
    locationDenied: 'Location permission denied. You can select your village manually.',
    manualLocationHint: 'Click anywhere on map or choose a district to center your search.',
    mapPrivacyNotice: 'Privacy-Guarded Map Discovery: Only verified business coordinates are publicly mapped. Exact candidate residential coordinates are strictly confidential.',
    radiusLabel: 'Radius:',
    districtLabel: 'District:',
    sectorLabel: 'Sector:',
    allDistricts: 'All Districts',
    allSectors: 'All Sectors',
    permanentJobsPin: 'Permanent / Full-Time',
    microGigPin: 'Micro-Opportunity / Seasonal',
    selectedOpportunity: 'Selected Opportunity',
    viewAndApply: 'View Full Details & Apply',
    selectPinNotice: 'Select a pin on the map or click a job from the list below.',
    nearbyJobsList: 'Synchronized Jobs List',
    noCoordJobsTitle: 'Other Nearby Opportunities (Map Coordinates Pending)',
    noCoordJobsDesc: 'These local employers have verified vacancies with textual village addresses.',
    loadingMap: 'Loading OpenStreetMap & verified pins...',
    mapErrorNotice: 'Map tiles failed to load. Please check internet connection or browse jobs below.',
    withinRadius: 'within range',
    userLocationPin: 'You are here',

    // Reverse Candidate Matching (Employer)
    reverseMatchHeadline: 'Reverse Candidate Matching for Small Businesses',
    reverseMatchSub: 'Instead of waiting for applications, our AI proactively scans verified rural talent within your commute radius.',
    rankedByProximity: 'Ranked by Proximity & Practical Aptitude',
    callCandidate: 'Call Candidate',
    contactNumber: 'Phone:',
    shortlistForTrial: 'Shortlist for Trial',
    practicalAptitude: 'Practical Aptitude:',
    expectedSalaryLabel: 'Expected:',
    candidateShortlistedAlert: 'Candidate shortlisted for trial interview!',

    // Employer Dashboard
    employerPortal: 'Small Business Employer Portal',
    activeVacancies: 'Active Vacancies',
    totalApplicants: 'Total Applicants',
    shortlistedApplicants: 'Shortlisted Candidates',
    successfulHires: 'Successful Hires',
    publishNewVacancy: 'Publish New Vacancy',
    tabReverseMatch: 'Reverse Candidate Matching',
    tabVacancies: 'My Vacancies',
    tabApplicants: 'Applicants Pipeline',
    tabTrust: 'Trust & Verification',
    postVacancyTitle: 'Publish New Job Vacancy',
    jobTitleLabel: 'Job Title *',
    sectorCategoryLabel: 'Sector Category',
    jobTypeLabel: 'Job Type',
    requiredSkillsLabel: 'Required Practical Skills (Comma-separated)',
    minSalaryLabel: 'Min Salary (₹) *',
    maxSalaryLabel: 'Max Salary (₹) *',
    jobDescLabel: 'Job Description & Practical Duties',
    jobDescPlaceholder: 'Describe day-to-day work, training provided, lunch/tea benefits...',
    publishButton: 'Publish Vacancy',
    publishing: 'Publishing...',
    cancel: 'Cancel',
    hireCandidate: 'Hire Candidate 🎉',
    scheduleInterview: 'Schedule Interview',
    shortlistBtn: 'Shortlist',
    verificationRequestSubmitted: 'Verification request submitted! Administrator will review your business credentials.',
    requestMsmeBadge: 'Request MSME Verification Badge',
    businessTrustDesc: 'Verified businesses receive an official Verified Employer Badge across all job listings and map pins, building instant trust with rural candidates.',

    // Youth Dashboard
    youthPortal: 'Rural Youth Candidate Portal',
    verifiedTalentBadge: 'Verified Rural Talent',
    digitalSkillPassport: 'Digital Skill Passport',
    oneClickBiodata: '1-Click Biodata / PDF',
    tabSmartMatches: 'AI Smart Matches',
    tabMyApplications: 'My Applications',
    tabMapDiscovery: 'Discover Map',
    appTrackerTitle: 'Application Status Tracker',
    appTrackerSub: 'Real-time status updates from local employers',
    noApplicationsYet: 'You haven\'t applied to any vacancies yet. Explore the AI Smart Matches tab!',
    appStatusApplied: 'Application Submitted',
    appStatusReceived: 'Received by Employer',
    appStatusReview: 'Under Review',
    appStatusShortlisted: 'Shortlisted for Trial 🎉',
    appStatusInterview: 'Interview Scheduled 📅',
    appStatusSelected: 'Hired / Placed 🏆',
    appStatusRejected: 'Not Selected',
    appStatusWithdrawn: 'Withdrawn',
    employerNoteLabel: 'Employer Note:',

    // Admin Dashboard
    adminControl: 'RuralConnect Administrator Control',
    adminSub: 'Monitoring MSME compliance, job safety, and district-level skill deficit heatmaps',
    govCertified: 'Government & Gram Vikas Certified',
    registeredYouth: 'Registered Rural Youth',
    registeredBusinesses: 'Registered Businesses',
    activeJobsTotal: 'Active Job Vacancies',
    totalPlacements: 'Total Placements',
    tabVerificationQueue: 'Verification Queue',
    tabReports: 'Scam & Trust Reports',
    tabDistrictHeatmap: 'District Opportunity Gap Heatmap',
    approveBadge: 'Approve Badge',
    revokeBadge: 'Revoke Badge',
    removeScamJob: 'Remove Fraudulent Job',
    dismissFlag: 'Dismiss Flag',
    districtGapAlert: 'AI Opportunity Gap Alert:',
    topDemandedLabel: 'Demanded by Local Employers:',
    skillDeficitLabel: 'Skill Deficit (Shortage):',

    // Authentication (Login & Register)
    welcomeBack: 'Welcome Back',
    signInPrompt: 'Sign in to access your RuralConnect AI portal',
    roleYouth: 'Youth',
    roleEmployer: 'Employer',
    roleAdmin: 'Admin',
    emailAddress: 'Email Address',
    password: 'Password',
    signInBtn: 'Sign In',
    dontHaveAccount: 'Don\'t have an account yet?',
    registerHere: 'Register Here',
    alreadyRegistered: 'Already registered?',
    logInHere: 'Log In Here',
    joinAsYouth: 'Join as Rural Youth',
    registerSmallBusiness: 'Register Small Business',
    guidedOnboarding: 'Guided Onboarding:',
    stepOf: 'Step',
    of: 'of',
    iAmJobSeeker: 'I am a Job Seeker (Youth)',
    iAmEmployer: 'I am an Employer (Business)',
    fullNameLabel: 'Your Full Name *',
    contactPersonLabel: 'Contact Person Full Name *',
    businessNameLabel: 'Business / Enterprise Name *',
    mobileNumberLabel: 'Mobile Phone Number *',
    villageLabel: 'Village / Grama *',
    educationLabel: 'Education Qualification',
    availabilityLabel: 'Availability',
    monthlyPayLabel: 'Expected Monthly Pay (₹)',
    practicalSkillsLabel: 'Select Your Practical Skills (Click all that apply):',
    practicalExpLabel: 'Tell us about your practical hands-on work:',
    noResumeOption: 'I don\'t have a formal resume (Recommended) — Generate my verified Digital Skill Passport from my practical skills.',
    hasResumeOption: 'I already have a resume file (Optional upload)',
    continueBtn: 'Continue',
    backBtn: 'Back',
    completeAndLaunch: 'Complete & Launch',

    // Career Guide & Voice Assistant
    voiceGuide: 'Rural Career Guide',
    voiceAssistantSubtitle: 'AI Assistant • EN / ಕನ್ನಡ / हिन्दी',
    listenAudio: 'Listen Audio',
    askQuestionPlaceholder: 'Ask question or speak...',
    speechNotSupported: 'Speech Recognition is not supported by your browser. Please type your message.',

    // Community Referral
    referralTitle: 'Community Referral Portal',
    referralSub: 'For Gram Panchayats, SHGs & Youth Clubs',
    referrerName: 'Your Name (Referrer) *',
    referrerPhone: 'Your Phone *',
    referrerOrg: 'Community Organization',
    candidateName: 'Candidate Name *',
    candidatePhone: 'Candidate Phone *',
    submitReferral: 'Submit Referral',
    referralSuccess: 'Referral Registered Successfully!',
    referralSuccessSub: 'Our rural talent coordinators will verify details and reach out to the youth and local businesses.',

    // Footer
    footerMission: 'Empowering rural youth and local micro-enterprises with explainable AI skill matching, transparent commute discovery, and practical career progression.',
    footerHackathon: 'Built for HackCulture Global Hackathon',
    footerZeroFee: '100% Zero Fee Guarantee — Rural youth never pay for job applications.',
    footerPrivacy: 'Privacy First: Private candidate coordinates and numbers are guarded with consent.',
    footerHelpline: 'Toll-Free Helpline: 1800-RURAL-AI',
    footerCopyright: '© 2026 RuralConnect AI. Open ecosystem architecture for inclusive rural employment.',
    footerDignity: 'Crafted for rural empowerment and local economic dignity.'
  },

  kn: {
    // Brand & Header
    brandName: 'ರೂರಲ್ ಕನೆಕ್ಟ್ ಎಐ',
    tagline: 'ಸ್ಥಳೀಯ ಪ್ರತಿಭೆ. ಸರಿಯಾದ ಕೌಶಲ್ಯ. ನೈಜ ಉದ್ಯೋಗಾವಕಾಶ.',
    navJobs: 'ಉದ್ಯೋಗ ಹುಡುಕಿ',
    navMap: 'ಉದ್ಯೋಗ ನಕ್ಷೆ (Map)',
    navSkillGap: 'ಕೌಶಲ್ಯ ವಿಶ್ಲೇಷಣೆ',
    navImpact: 'ಪರಿಣಾಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    navReferral: 'ಗ್ರಾಮೀಣ ಶಿಫಾರಸು',
    login: 'ಪ್ರವೇಶಿಸಿ (Login)',
    register: 'ನೋಂದಾಯಿಸಿ (Register)',
    logout: 'ನಿರ್ಗಮಿಸಿ (Logout)',
    youthDashboard: 'ಯುವಜನರ ಪೋರ್ಟಲ್',
    employerDashboard: 'ಉದ್ಯೋಗದಾತರ ಪೋರ್ಟಲ್',
    adminDashboard: 'ಆಡಳಿತ ಮಂಡಳಿ',
    portal: 'ಪೋರ್ಟಲ್',

    // Demo Bar
    demoModeNotice: 'ಹ್ಯಾಕಥಾನ್ ಮೌಲ್ಯಮಾಪನ: ಒಂದೇ ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಖಾತೆ ಬದಲಿಸಿ',
    demoYouthBtn: 'ಪ್ರವೀಣ್ (ಯುವಕ)',
    demoEmployerBtn: 'ವೆಂಕಟೇಶ್ (ಮಾಲೀಕ)',
    demoAdminBtn: 'ಗ್ರಾಮ ವಿಕಾಸ್ (ಅಡ್ಮಿನ್)',
    demoScriptBtn: '2-ನಿಮಿಷದ ಡೆಮೊ ಮಾರ್ಗದರ್ಶಿ',
    demoScriptTitle: '2-ನಿಮಿಷದ ತೀರ್ಪುಗಾರರ ಮೌಲ್ಯಮಾಪನ ಪ್ರವಾಸ',
    demoScriptSubtitle: 'ರೂರಲ್ ಕನೆಕ್ಟ್ ಎಐ ಅನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಪರೀಕ್ಷಿಸುವುದು ಹೇಗೆ',
    demoStep1Title: 'ಹಂತ 1: ಗ್ರಾಮೀಣ ಯುವಕರ ಅನುಭವ (ಪ್ರವೀಣ್ ಕುಮಾರ್, ಬಂಟ್ವಾಳ)',
    demoStep1Desc: 'ಮೇಲಿನ "ಪ್ರವೀಣ್ (ಯುವಕ)" ಕ್ಲಿಕ್ ಮಾಡಿ. ಎಲೆಕ್ಟ್ರಿಕಲ್ ವರ್ಕ್‌ಶಾಪ್ ಸಹಾಯಕ ಹುದ್ದೆಗೆ 100% ಹೊಂದಾಣಿಕೆಯನ್ನು ಗಮನಿಸಿ. ಅಂಕಗಳ ವಿವರಣೆಯನ್ನು ನೋಡಲು "ಹೊಂದಾಣಿಕೆಯ ವಿವರಣೆ" ಕ್ಲಿಕ್ ಮಾಡಿ. ರೆಸ್ಯೂಮ್ ಇಲ್ಲದೆಯೇ ಅವರ ಡಿಜಿಟಲ್ ಸ್ಕಿಲ್ ಪಾಸ್‌ಪೋರ್ಟ್ ಪರಿಶೀಲಿಸಿ.',
    demoStep2Title: 'ಹಂತ 2: ಕೌಶಲ್ಯ ವಿಶ್ಲೇಷಣೆ ("ನಿಮ್ಮ ಕೌಶಲ್ಯ ತಿಳಿಯಿರಿ, ಭವಿಷ್ಯ ಬೆಳೆಸಿ")',
    demoStep2Desc: 'ಸ್ಕಿಲ್ ಗ್ಯಾಪ್ ಅನಲೈಜರ್ ತೆರೆಯಿರಿ. 3-ಹಂತದ ಕಲಿಕಾ ಹಾದಿ ಮತ್ತು ಆದಾಯದ ಹೆಚ್ಚಳದ ಅಂದಾಜನ್ನು (+122% ವೇತನ ಏರಿಕೆ) ಪರಿಶೀಲಿಸಿ.',
    demoStep3Title: 'ಹಂತ 3: ಸಣ್ಣ ಉದ್ಯಮಗಳಿಗೆ ರಿವರ್ಸ್ ಮ್ಯಾಚಿಂಗ್ (ವೆಂಕಟೇಶ್ ರಾವ್)',
    demoStep3Desc: '"ವೆಂಕಟೇಶ್ (ಮಾಲೀಕ)" ಕ್ಲಿಕ್ ಮಾಡಿ. ಜಾಹೀರಾತು ನೀಡಿ ಕಾಯುವ ಅಗತ್ಯವಿಲ್ಲ: ನಮ್ಮ ರಿವರ್ಸ್ ಮ್ಯಾಚಿಂಗ್ ವ್ಯವಸ್ಥೆಯು ಹತ್ತಿರದ ಅರ್ಹ ಅಭ್ಯರ್ಥಿಗಳನ್ನು ನೇರವಾಗಿ ತೋರಿಸುತ್ತದೆ (0.5 ಕಿ.ಮೀ ದೂರದಲ್ಲಿ ಪ್ರವೀಣ್).',
    demoStep4Title: 'ಹಂತ 4: ವಿಶ್ವಾಸಾರ್ಹತೆ ಮತ್ತು ಆಡಳಿತ (ಗ್ರಾಮ ವಿಕಾಸ್ ಅಧಿಕಾರಿ)',
    demoStep4Desc: '"ಗ್ರಾಮ ವಿಕಾಸ್ (ಅಡ್ಮಿನ್)" ಕ್ಲಿಕ್ ಮಾಡಿ. ಉದ್ಯಮಗಳ ಪರಿಶೀಲನಾ ವಿನಂತಿಗಳನ್ನು ಅನುಮೋದಿಸಿ, ನಕಲಿ ಉದ್ಯೋಗ ದೂರುಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
    demoScriptClose: 'ಅನ್ವೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ',
    toggleLangHint: 'ಮೇಲಿನ ಬಲಭಾಗದಲ್ಲಿ English / ಕನ್ನಡ / हिन्दी ಭಾಷೆಗಳನ್ನು ಬದಲಾಯಿಸಿ!',

    // Hero Section
    heroBadge: 'ಹ್ಯಾಕ್‌ಕಲ್ಚರ್ 2026 ಜಾಗತಿಕ ಹ್ಯಾಕಥಾನ್ ಪ್ರಸ್ತುತಿ',
    heroEcosystemBadge: 'ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಮತ್ತು ಕೌಶಲ್ಯ ಪರಿಸರ',
    heroTitle: 'ಗ್ರಾಮೀಣ ಯುವಕರು ಮತ್ತು ಸ್ಥಳೀಯ ಉದ್ಯಮಗಳಿಗೆ ಸೂಕ್ತ ಕೊಂಡಿ',
    heroSubtitle: 'ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯಗಳಿಗೆ ಮೊದಲ ಆದ್ಯತೆ. ರೆಸ್ಯೂಮ್ ಇಲ್ಲದಿದ್ದರೂ ನಿಮ್ಮ ಸಾಮರ್ಥ್ಯಕ್ಕೆ ತಕ್ಕ ಹತ್ತಿರದ ಉದ್ಯೋಗಗಳನ್ನು ಪಡೆಯಿರಿ.',
    exploreJobs: 'ಸ್ಥಳೀಯ ಉದ್ಯೋಗಗಳನ್ನು ನೋಡಿ',
    tryInstantDemo: 'ಯುವಕರಾಗಿ ಡೆಮೊ ಪ್ರಯತ್ನಿಸಿ',
    zeroFees: 'ಅರ್ಜಿ ಶುಲ್ಕ ಸಂಪೂರ್ಣ ಉಚಿತ',
    noResumeNeeded: 'ಇಂಗ್ಲಿಷ್ ರೆಸ್ಯೂಮ್ ಕಡ್ಡಾಯವಲ್ಲ',
    bilingualNotice: 'ತ್ರಿಭಾಷಾ ಬೆಂಬಲ: English, ಕನ್ನಡ, हिन्दी',
    mobileFirst: 'ಕಡಿಮೆ ಇಂಟರ್ನೆಟ್‌ನಲ್ಲೂ ಸರಾಗ ಕಾರ್ಯ',

    // Problem Statement Section
    problemBadge: 'ಹ್ಯಾಕಥಾನ್ ಅಧಿಕೃತ ಸಮಸ್ಯೆ ಹೇಳಿಕೆ',
    problemQuote: '"ಗ್ರಾಮೀಣ ಯುವಕರಿಗೆ ಸೂಕ್ತ ಕೆಲಸ ಸಿಗುತ್ತಿಲ್ಲ, ಮತ್ತು ಸಣ್ಣ ಉದ್ಯೋಗದಾತರಿಗೆ ಯುವಕರು ಸಿಗುತ್ತಿಲ್ಲ."',
    problemYouthTitle: 'ಗ್ರಾಮೀಣ ಉದ್ಯೋಗಾಕಾಂಕ್ಷಿಗಳಿಗೆ:',
    problemYouthPoint1: 'ನಗರದ ಜಾಬ್ ಪೋರ್ಟಲ್‌ಗಳು ಇಂಗ್ಲಿಷ್ ರೆಸ್ಯೂಮ್ ಕೇಳುತ್ತವೆ, ಇದು ಗ್ರಾಮೀಣ ಪ್ರತಿಭೆಯನ್ನು ಮರೆಮಾಡುತ್ತದೆ.',
    problemYouthPoint2: 'ಉದ್ಯೋಗಗಳು ತುಂಬಾ ದೂರದಲ್ಲಿರುತ್ತವೆ ಅಥವಾ ದಾರಿತಪ್ಪಿಸುವ ವೇತನವನ್ನು ತೋರಿಸುತ್ತವೆ.',
    problemYouthPoint3: 'ಕೆಲಸ ಸಿಗದಿದ್ದಾಗ ಮುಂದೆ ಯಾವ ಕೌಶಲ್ಯ ಕಲಿಯಬೇಕೆಂದು ಯುವಕರಿಗೆ ಮಾರ್ಗದರ್ಶನವಿರುವುದಿಲ್ಲ.',
    problemEmployerTitle: 'ಸ್ಥಳೀಯ ಸಣ್ಣ ಉದ್ಯೋಗದಾತರಿಗೆ:',
    problemEmployerPoint1: 'ಸಣ್ಣ ವರ್ಕ್‌ಶಾಪ್ ಮತ್ತು ಕೃಷಿ ಘಟಕಗಳಿಗೆ ದುಬಾರಿ ನೇಮಕಾತಿ ಜಾಹೀರಾತು ನೀಡಲು ಸಾಧ್ಯವಿಲ್ಲ.',
    problemEmployerPoint2: 'ಬಾಯಿಮಾತಿನ ನೇಮಕಾತಿಯು ನಿಧಾನ ಮತ್ತು ಕುಟುಂಬದ ಪರಿಚಯಸ್ಥರಿಗೆ ಮಾತ್ರ ಸೀಮಿತ.',
    problemEmployerPoint3: 'ಕೊಯ್ಲು ಮತ್ತು ಹಬ್ಬಗಳ ತುರ್ತು ಸಂದರ್ಭಗಳಲ್ಲಿ ಸ್ಥಳೀಯ ಕಾರ್ಮಿಕರು ತಕ್ಷಣ ಸಿಗುವುದಿಲ್ಲ.',

    // How It Works
    howItWorksBadge: 'ಬುದ್ಧಿವಂತ ಪರಿಸರ ವ್ಯವಸ್ಥೆ',
    howItWorksTitle: 'ರೂರಲ್ ಕನೆಕ್ಟ್ ಎಐ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
    howItWorksSubtitle: 'ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯ ಪತ್ತೆಯಿಂದ ಹಿಡಿದು ಅಧಿಕೃತ ಉದ್ಯೋಗ ನೀಡುವವರೆಗೆ ಸರಳ ಹಾದಿ.',
    step1Title: 'ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯ ಪ್ರೊಫೈಲ್ (ರೆಸ್ಯೂಮ್ ಅಗತ್ಯವಿಲ್ಲ)',
    step1Desc: 'ಯುವಕರು ತಮ್ಮ ಕೈಕೆಲಸದ ಅನುಭವವನ್ನು ದಾಖಲಿಸುತ್ತಾರೆ (ವೈರಿಂಗ್, ಟ್ರ್ಯಾಕ್ಟರ್ ಚಾಲನೆ, ಬಿಲ್ಲಿಂಗ್, ಟೈಲರಿಂಗ್). ನಾವು ಡಿಜಿಟಲ್ ಸ್ಕಿಲ್ ಪಾಸ್‌ಪೋರ್ಟ್ ಸೃಷ್ಟಿಸುತ್ತೇವೆ.',
    step2Title: 'ವಿವರಣಾತ್ಮಕ ಎಐ ಮ್ಯಾಚಿಂಗ್ ಮತ್ತು ಪ್ರಯಾಣ ಅಂತರ',
    step2Desc: 'ಕೌಶಲ್ಯ (40%), ಪ್ರಯಾಣ ದೂರ (25%), ವಿದ್ಯಾರ್ಹತೆ (15%), ವೇತನ (10%) ಮತ್ತು ಲಭ್ಯತೆಯನ್ನು (10%) ಆಧರಿಸಿ ಉದ್ಯೋಗ ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ.',
    step3Title: 'ಕೌಶಲ್ಯ ಕಲಿಕಾ ಹಾದಿ ಮತ್ತು ರಿವರ್ಸ್ ನೇಮಕಾತಿ',
    step3Desc: 'ಕೆಲಸ ಸಿಗದಿದ್ದರೆ ಉಚಿತ ಪ್ರಾದೇಶಿಕ ವೀಡಿಯೊಗಳ ಮೂಲಕ ಕೌಶಲ್ಯ ಕಲಿಯಬಹುದು. ಮಾಲೀಕರು ಹತ್ತಿರದ ಅಭ್ಯರ್ಥಿಗಳನ್ನು ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಬಹುದು.',

    // 5 Pillars
    pillarsBadge: 'ನಮ್ಮ ವಿಶಿಷ್ಟತೆಗಳು',
    pillarsTitle: 'ರೂರಲ್ ಕನೆಕ್ಟ್ ಎಐ ಅನ್ನು ವಿಶೇಷವಾಗಿಸುವ 5 ಪ್ರಮುಖ ಆಧಾರಸ್ತಂಭಗಳು',
    pillar1Title: '1. ಪಾರದರ್ಶಕ ಎಐ ಹೊಂದಾಣಿಕೆ ಅಂಕ',
    pillar1Desc: 'ಯಾವುದೇ ಸುಳ್ಳು ಶೇಕಡಾವಾರು ಅಂಕಿಗಳಿಲ್ಲ. ಹೊಂದಾಣಿಕೆಗೆ ಕಾರಣವೇನು (ಉದಾ: "ನಿಮ್ಮ ಮನೆಯಿಂದ ಕೇವಲ 0.5 ಕಿ.ಮೀ", "ವೈರಿಂಗ್ ಕೌಶಲ್ಯ ದೃಢೀಕರಿಸಲಾಗಿದೆ") ಎಂಬುದನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ವಿವರಿಸಲಾಗುತ್ತದೆ.',
    pillar2Title: '2. ಕೌಶಲ್ಯ ಕಲಿಕೆ ಮತ್ತು ಆದಾಯ ಹೆಚ್ಚಳ',
    pillar2Desc: '"ನಿಮ್ಮ ಕೌಶಲ್ಯ ತಿಳಿಯಿರಿ, ಭವಿಷ್ಯ ಬೆಳೆಸಿ" ವೈಶಿಷ್ಟ್ಯವು 3-ಹಂತದ ಕಲಿಕಾ ಹಾದಿಯನ್ನು ನೀಡುತ್ತದೆ ಮತ್ತು ಮಾಸಿಕ ವೇತನ ಹೇಗೆ ಹೆಚ್ಚುತ್ತದೆ ಎಂಬುದನ್ನು ತೋರಿಸುತ್ತದೆ.',
    pillar3Title: '3. ಉದ್ಯೋಗದಾತರಿಗೆ ನೇರ ಅಭ್ಯರ್ಥಿ ಶೋಧನೆ',
    pillar3Desc: 'ಮಾಲೀಕರು ಜಾಹೀರಾತು ನೀಡಿ ಕಾಯಬೇಕಾಗಿಲ್ಲ. ಸ್ಥಳೀಯ ವ್ಯಾಪ್ತಿಯಲ್ಲಿರುವ ಅರ್ಹ ಅಭ್ಯರ್ಥಿಗಳನ್ನು ಸಿಸ್ಟಮ್ ನೇರವಾಗಿ ಅವರ ಮುಂದೆ ಪ್ರಸ್ತುತಪಡಿಸುತ್ತದೆ.',
    pillar4Title: '4. ನೈಜತೆ, ಸುರಕ್ಷತೆ ಮತ್ತು ವಂಚನೆ ತಡೆ',
    pillar4Desc: 'ಎಂಎಸ್ಎಂಇ ದೃಢೀಕರಣ ಬ್ಯಾಡ್ಜ್, ಅಭ್ಯರ್ಥಿಗಳಿಗೆ 100% ಉಚಿತ ಅರ್ಜಿ ಸೌಲಭ್ಯ ಮತ್ತು ಅಭ್ಯರ್ಥಿಗಳ ಖಾಸಗಿ ವಿಳಾಸದ ರಕ್ಷಣೆ.',
    pillar5Title: '5. ಸಣ್ಣ ಅವಧಿಯ ಮತ್ತು ಸೀಸನಲ್ ಅವಕಾಶಗಳು',
    pillar5Desc: 'ಕೃಷಿ ಕೊಯ್ಲು ಕೆಲಸಗಳು, ವಾರಾಂತ್ಯದ ಅಂಗಡಿ ಕೆಲಸಗಳು, ಹಬ್ಬದ ಸಹಾಯಕ ಕೆಲಸಗಳು ಮತ್ತು ಅಪ್ರೆಂಟಿಸ್‌ಶಿಪ್‌ಗಳಿಗೆ ಪ್ರತ್ಯೇಕ ವ್ಯವಸ್ಥೆ.',
    pillar6Title: '6. ತ್ರಿಭಾಷಾ ಧ್ವನಿ ಸಹಾಯಕ',
    pillar6Desc: 'ಕನ್ನಡ, ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಹಿಂದಿ ಭಾಷೆಗಳಲ್ಲಿ ಸುಲಭವಾಗಿ ಮಾತನಾಡಿ ಮಾಹಿತಿ ಪಡೆಯುವ ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ.',

    // Live Metrics
    metricsBadge: 'ನೈಜ ಪರಿಸರ ಅಂಕಿಅಂಶಗಳು',
    metricsTitle: 'ಕರ್ನಾಟಕದ ತಾಲೂಕುಗಳಲ್ಲಿ ಗೋಚರಿಸುತ್ತಿರುವ ಬದಲಾವಣೆ',
    metricYouth: 'ನೋಂದಾಯಿತ ಗ್ರಾಮೀಣ ಯುವಕರು',
    metricEmployers: 'ದೃಢೀಕೃತ ಸ್ಥಳೀಯ ಉದ್ಯಮಗಳು',
    metricFit: 'ಸರಾಸರಿ ಸಾಮೀಪ್ಯ ಹೊಂದಾಣಿಕೆ',
    metricPay: 'ಸರಾಸರಿ ಮಾಸಿಕ ಆರಂಭಿಕ ವೇತನ',
    viewFullAnalytics: 'ಸಂಪೂರ್ಣ ವಿಶ್ಲೇಷಣೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ನೋಡಿ',

    // Testimonials & FAQs
    testimonialsBadge: 'ಗ್ರಾಮೀಣ ಜನರ ಧ್ವನಿ',
    testimonialsTitle: 'ಗ್ರಾಮೀಣ ಕರ್ನಾಟಕದ ನೈಜ ಯಶೋಗಾಥೆಗಳು',
    testimonialsSub: '(ಪ್ರಾತ್ಯಕ್ಷಿಕೆ ಕ್ಷೇತ್ರ ಪರೀಕ್ಷೆಯ ಅಭಿಪ್ರಾಯಗಳು)',
    faqBadge: 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು (FAQ)',
    faqTitle: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳಿಗೆ ನಮ್ಮ ಉತ್ತರಗಳು',
    readyToConnect: 'ಪ್ರತಿಭೆ ಮತ್ತು ಅವಕಾಶಗಳನ್ನು ಬೆಸೆಯಲು ಸಿದ್ಧರಿದ್ದೀರಾ?',
    readyToConnectSub: 'ನಮ್ಮ 1-ಕ್ಲಿಕ್ ಡೆಮೊ ಖಾತೆಗಳ ಮೂಲಕ ಈಗಲೇ ಸಂಪೂರ್ಣ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಅನ್ನು ಅನುಭವಿಸಿ.',
    exploreYouthPraveen: 'ಯುವಕನಾಗಿ ನೋಡಿ (ಪ್ರವೀಣ್)',
    exploreBizVenkatesh: 'ಉದ್ಯೋಗದಾತರಾಗಿ ನೋಡಿ (ವೆಂಕಟೇಶ್)',
    exploreAdminGramVikas: 'ಅಡ್ಮಿನ್ ಆಗಿ ನೋಡಿ (ಗ್ರಾಮ ವಿಕಾಸ್)',

    // Job Card & Common Details
    smartMatch: 'ಎಐ ಸ್ಮಾರ್ಟ್ ಹೊಂದಾಣಿಕೆ',
    verifiedEmployer: 'ದೃಢೀಕೃತ ಉದ್ಯಮ',
    microOpportunity: 'ಸೀಸನಲ್ ಮೈಕ್ರೋ-ಗಿಗ್',
    fullTime: 'ಪೂರ್ಣಾವಧಿ',
    partTime: 'ಅರೆಕಾಲಿಕ',
    temporary: 'ತಾತ್ಕಾಲಿಕ',
    seasonal: 'ಸೀಸನಲ್',
    apprenticeship: 'ಅಪ್ರೆಂಟಿಸ್‌ಶಿಪ್',
    whyMatch: 'ಹೊಂದಾಣಿಕೆಯ ವಿವರಣೆ',
    skillGap: 'ಕೌಶಲ್ಯ ಅಂತರ',
    applyNow: 'ಈಗಲೇ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    applied: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ',
    viewDetails: 'ವಿವರ ನೋಡಿ',
    commuteDistance: 'ಪ್ರಯಾಣ ದೂರ',
    expectedPay: 'ನಿರೀಕ್ಷಿತ ವೇತನ',
    standardHours: 'ಕೆಲಸದ ಸಮಯ',
    missingSkills: 'ಕಲಿಯಬೇಕಾದ ಕೌಶಲ್ಯಗಳು',
    noMatchingJobs: 'ಪ್ರಸ್ತುತ ಯಾವುದೇ ಉದ್ಯೋಗಗಳು ಲಭ್ಯವಿಲ್ಲ.',
    showingJobs: 'ಲಭ್ಯವಿರುವ ನೈಜ ಉದ್ಯೋಗಾವಕಾಶಗಳು',
    zeroFeesGuaranteed: 'ಅರ್ಜಿ ಶುಲ್ಕವಿಲ್ಲ • ನೇರ ಸಂಪರ್ಕ',

    // Match Modal
    explainableScoreTitle: 'ಎಐ ಹೊಂದಾಣಿಕೆ ವಿವರಣಾತ್ಮಕ ಮೌಲ್ಯಮಾಪನ',
    exceptionalFit: 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್‌ಗೆ ಅತ್ಯುತ್ತಮ ಹೊಂದಾಣಿಕೆ',
    strongFit: 'ಉತ್ತಮ ಪ್ರಾಯೋಗಿಕ ಹೊಂದಾಣಿಕೆ',
    matchIndex: 'ಹೊಂದಾಣಿಕೆ ಸೂಚಿ',
    transparentBreakdown: 'ಪಾರದರ್ಶಕ ಮಾನದಂಡಗಳ ವಿವರ',
    critSkills: '1. ದೃಢೀಕೃತ ಕೌಶಲ್ಯಗಳು ಮತ್ತು ಸಾಮರ್ಥ್ಯ',
    critDistance: '2. ಪ್ರಯಾಣದ ದೂರ ಮತ್ತು ಸಾಮೀಪ್ಯ',
    critEducation: '3. ವಿದ್ಯಾರ್ಹತೆ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಅನುಭವ',
    critSalary: '4. ವೇತನ ನಿರೀಕ್ಷೆಯ ಹೊಂದಾಣಿಕೆ',
    critAvailability: '5. ಕೆಲಸದ ಸಮಯ ಮತ್ತು ಲಭ್ಯತೆ',
    whyRecommended: 'ಈ ಉದ್ಯೋಗವನ್ನು ನಿಮಗೆ ಏಕೆ ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ:',
    addCoverNote: 'ಉದ್ಯೋಗದಾತರಿಗೆ ಸಂದೇಶ (ಐಚ್ಛಿಕ):',
    coverNotePlaceholder: 'ಉದಾ: ನಾನು ಬಂಟ್ವಾಳ ಸಮೀಪದಲ್ಲೇ ವಾಸಿಸುತ್ತಿದ್ದು, ವೈರಿಂಗ್ ಅನುಭವ ಹೊಂದಿದ್ದೇನೆ. ತಕ್ಷಣ ಕೆಲಸಕ್ಕೆ ಸೇರಬಲ್ಲೆ.',
    submitApplication: 'ಉಚಿತ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    submitting: 'ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...',
    applicationSuccess: 'ಅರ್ಜಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ! ಉದ್ಯೋಗದಾತರಿಗೆ ಮಾಹಿತಿ ಕಳುಹಿಸಲಾಗಿದೆ.',
    alreadyAppliedNotice: 'ನೀವು ಈಗಾಗಲೇ ಈ ಹುದ್ದೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿದ್ದೀರಿ. ನಿಮ್ಮ ಅರ್ಜಿಗಳ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಸ್ಥಿತಿಯನ್ನು ಗಮನಿಸಿ.',
    viewFreeRoadmap: 'ಉಚಿತ ಕಲಿಕಾ ಹಾದಿ ನೋಡಿ',
    close: 'ಮುಚ್ಚಿ',

    // Skill Gap Modal
    skillsHeadline: 'ನಿಮ್ಮ ಕೌಶಲ್ಯ ತಿಳಿಯಿರಿ, ಭವಿಷ್ಯ ಬೆಳೆಸಿ',
    incomePotential: 'ಕೌಶಲ್ಯ-ಆದಾಯ ಹೆಚ್ಚಳ ಸಾಮರ್ಥ್ಯ',
    unlockUpTo: 'ಹೆಚ್ಚುವರಿ ವೇತನ ಸಾಮರ್ಥ್ಯ',
    currentAvg: 'ಪ್ರಸ್ತುತ ಸರಾಸರಿ',
    certifiedAvg: 'ಕಲಿಕೆಯ ನಂತರದ ಸರಾಸರಿ',
    practicalRoadmapTitle: 'ಹಂತ-ಹಂತದ ಪ್ರಾಯೋಗಿಕ ಕಲಿಕಾ ಮಾರ್ಗಸೂಚಿ',
    estimatedTotal: 'ಒಟ್ಟು ಅಂದಾಜು ಸಮಯ',
    hours: 'ಗಂಟೆಗಳು',
    days: 'ದಿನಗಳು',
    targetMilestone: 'ಗುರಿ ಮೈಲಿಗಲ್ಲು',
    eligibleRoles: 'ಕಲಿಕೆಯ ನಂತರ ಸಿಗುವ ಸ್ಥಳೀಯ ಉದ್ಯೋಗಗಳು:',
    freeModulesNotice: 'ಎಲ್ಲಾ ಕಲಿಕಾ ವೀಡಿಯೊಗಳು ಕನ್ನಡ ಆಡಿಯೊದೊಂದಿಗೆ 100% ಉಚಿತವಾಗಿ ಲಭ್ಯವಿದೆ.',
    done: 'ಪೂರ್ಣಗೊಂಡಿದೆ',

    // Discover Map
    mapTitle: 'ಸ್ಥಳೀಯ ಉದ್ಯೋಗ ನಕ್ಷೆ (Discover Map)',
    mapSub: 'ಕರ್ನಾಟಕದಾದ್ಯಂತ ಸಣ್ಣ ಉದ್ಯಮಗಳ ಖಾಲಿ ಹುದ್ದೆಗಳು ಮತ್ತು ಸೀಸನಲ್ ಕೆಲಸಗಳನ್ನು ನಕ್ಷೆಯಲ್ಲಿ ಹುಡುಕಿ',
    useMyLocation: 'ನನ್ನ ಸ್ಥಳ ಬಳಸಿ (GPS)',
    myLocationActive: 'ಸ್ಥಳ ಪತ್ತೆಯಾಗಿದೆ',
    locationDenied: 'ಸ್ಥಳ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ. ನಿಮ್ಮ ತಾಲೂಕನ್ನು ನೀವೇ ಆಯ್ಕೆ ಮಾಡಬಹುದು.',
    manualLocationHint: 'ನಕ್ಷೆಯ ಮೇಲೆ ಎಲ್ಲಿಯಾದರೂ ಕ್ಲಿಕ್ ಮಾಡಿ ಅಥವಾ ಕೆಳಗೆ ಜಿಲ್ಲೆಯನ್ನು ಆರಿಸಿ.',
    mapPrivacyNotice: 'ಗೌಪ್ಯತೆ ರಕ್ಷಿತ ನಕ್ಷೆ: ಕೇವಲ ಉದ್ಯೋಗದಾತರ ಅಂಗಡಿ/ವರ್ಕ್‌ಶಾಪ್ ಸ್ಥಳಗಳನ್ನು ಮಾತ್ರ ನಕ್ಷೆಯಲ್ಲಿ ತೋರಿಸಲಾಗುತ್ತದೆ. ಅಭ್ಯರ್ಥಿಗಳ ಖಾಸಗಿ ಮನೆ ವಿಳಾಸ ಎಂದಿಗೂ ಬಹಿರಂಗವಾಗುವುದಿಲ್ಲ.',
    radiusLabel: 'ಪ್ರಯಾಣ ವ್ಯಾಪ್ತಿ:',
    districtLabel: 'ಜಿಲ್ಲೆ:',
    sectorLabel: 'ವಿಭಾಗ:',
    allDistricts: 'ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು',
    allSectors: 'ಎಲ್ಲಾ ವಿಭಾಗಗಳು',
    permanentJobsPin: 'ಕಾಯಂ / ಪೂರ್ಣಾವಧಿ ಉದ್ಯೋಗ',
    microGigPin: 'ಸೀಸನಲ್ / ಮೈಕ್ರೋ-ಗಿಗ್',
    selectedOpportunity: 'ಆಯ್ಕೆಮಾಡಿದ ಉದ್ಯೋಗ',
    viewAndApply: 'ವಿವರ ನೋಡಿ ಮತ್ತು ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    selectPinNotice: 'ವಿವರಗಳನ್ನು ನೋಡಲು ನಕ್ಷೆಯಲ್ಲಿರುವ ಪಿನ್ ಕ್ಲಿಕ್ ಮಾಡಿ ಅಥವಾ ಪಟ್ಟಿಯಿಂದ ಆಯ್ಕೆಮಾಡಿ.',
    nearbyJobsList: 'ಲಭ್ಯವಿರುವ ಉದ್ಯೋಗಗಳ ಪಟ್ಟಿ',
    noCoordJobsTitle: 'ಇತರ ಹತ್ತಿರದ ಉದ್ಯೋಗಗಳು (ನಕ್ಷೆ ಸ್ಥಳ ನವೀಕರಣ ಬಾಕಿ)',
    noCoordJobsDesc: 'ಈ ಉದ್ಯೋಗಗಳಿಗೆ ಅಧಿಕೃತ ವಿಳಾಸವಿದೆ, ನಕ್ಷೆಯ ಜಿಪಿಎಸ್ ಗುರುತಿಸುವಿಕೆ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ.',
    loadingMap: 'ನಕ್ಷೆ ಮತ್ತು ಉದ್ಯೋಗ ಸ್ಥಳಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
    mapErrorNotice: 'ನಕ್ಷೆ ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕ ಪರೀಕ್ಷಿಸಿ ಅಥವಾ ಕೆಳಗಿನ ಪಟ್ಟಿ ಬಳಸಿ.',
    withinRadius: 'ವ್ಯಾಪ್ತಿಯಲ್ಲಿದೆ',
    userLocationPin: 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳ',

    // Reverse Candidate Matching
    reverseMatchHeadline: 'ಸಣ್ಣ ಉದ್ಯಮಗಳಿಗೆ ನೇರ ಗ್ರಾಮೀಣ ಅಭ್ಯರ್ಥಿ ಶಿಫಾರಸು',
    reverseMatchSub: 'ಅರ್ಜಿಗಳಿಗೆ ಕಾಯುವ ಬದಲು, ನಮ್ಮ ಎಐ ನಿಮ್ಮ ವ್ಯಾಪ್ತಿಯಲ್ಲಿರುವ ಪರಿಶೀಲಿತ ಅಭ್ಯರ್ಥಿಗಳನ್ನು ತಕ್ಷಣ ತೋರಿಸುತ್ತದೆ.',
    rankedByProximity: 'ಸಾಮೀಪ್ಯ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಅನುಭವದ ಆಧಾರದ ಮೇಲೆ ಶ್ರೇಯಾಂಕ',
    callCandidate: 'ಅಭ್ಯರ್ಥಿಗೆ ಕರೆ ಮಾಡಿ',
    contactNumber: 'ದೂರವಾಣಿ:',
    shortlistForTrial: 'ಟ್ರಯಲ್ ಪರೀಕ್ಷೆಗೆ ಆಯ್ಕೆಮಾಡಿ',
    practicalAptitude: 'ಪ್ರಾಯೋಗಿಕ ಅನುಭವ:',
    expectedSalaryLabel: 'ನಿರೀಕ್ಷಿತ ವೇತನ:',
    candidateShortlistedAlert: 'ಅಭ್ಯರ್ಥಿಯನ್ನು ಸಂದರ್ಶನಕ್ಕೆ ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ!',

    // Employer Dashboard
    employerPortal: 'ಸಣ್ಣ ಉದ್ಯಮ ಉದ್ಯೋಗದಾತರ ಪೋರ್ಟಲ್',
    activeVacancies: 'ಚಾಲ್ತಿಯಲ್ಲಿರುವ ಹುದ್ದೆಗಳು',
    totalApplicants: 'ಒಟ್ಟು ಬಂದಿರುವ ಅರ್ಜಿಗಳು',
    shortlistedApplicants: 'ಆಯ್ಕೆಮಾಡಿದ ಅಭ್ಯರ್ಥಿಗಳು',
    successfulHires: 'ನೇಮಕಗೊಂಡ ಅಭ್ಯರ್ಥಿಗಳು',
    publishNewVacancy: 'ಹೊಸ ಹುದ್ದೆ ಪ್ರಕಟಿಸಿ',
    tabReverseMatch: 'ನೇರ ಅಭ್ಯರ್ಥಿ ಶಿಫಾರಸು',
    tabVacancies: 'ನನ್ನ ಹುದ್ದೆಗಳು',
    tabApplicants: 'ಅರ್ಜಿಗಳ ನಿರ್ವಹಣೆ',
    tabTrust: 'ವಿಶ್ವಾಸಾರ್ಹತೆ ಮತ್ತು ದೃಢೀಕರಣ',
    postVacancyTitle: 'ಹೊಸ ಉದ್ಯೋಗಾವಕಾಶ ಪ್ರಕಟಿಸಿ',
    jobTitleLabel: 'ಉದ್ಯೋಗದ ಹೆಸರು *',
    sectorCategoryLabel: 'ವಿಭಾಗ',
    jobTypeLabel: 'ಉದ್ಯೋಗದ ವಿಧ',
    requiredSkillsLabel: 'ಅಗತ್ಯವಿರುವ ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯಗಳು',
    minSalaryLabel: 'ಕನಿಷ್ಠ ವೇತನ (₹) *',
    maxSalaryLabel: 'ಗರಿಷ್ಠ ವೇತನ (₹) *',
    jobDescLabel: 'ಕೆಲಸದ ವಿವರಣೆ',
    jobDescPlaceholder: 'ದೈನಂದಿನ ಕೆಲಸದ ಸ್ವರೂಪ, ತರಬೇತಿ ಸೌಲಭ್ಯ, ಊಟದ ವ್ಯವಸ್ಥೆ ಮುಂತಾದವುಗಳನ್ನು ತಿಳಿಸಿ...',
    publishButton: 'ಹುದ್ದೆ ಪ್ರಕಟಿಸಿ',
    publishing: 'ಪ್ರಕಟಿಸಲಾಗುತ್ತಿದೆ...',
    cancel: 'ರದ್ದುಮಾಡಿ',
    hireCandidate: 'ಕೆಲಸಕ್ಕೆ ನೇಮಿಸಿಕೊಳ್ಳಿ 🎉',
    scheduleInterview: 'ಸಂದರ್ಶನ ನಿಗದಿಪಡಿಸಿ',
    shortlistBtn: 'ಶಾರ್ಟ್‌ಲಿಸ್ಟ್',
    verificationRequestSubmitted: 'ದೃಢೀಕರಣ ವಿನಂತಿಯನ್ನು ಸಲ್ಲಿಸಲಾಗಿದೆ! ಅಧಿಕಾರಿಗಳು ಶೀಘ್ರದಲ್ಲೇ ಪರಿಶೀಲಿಸುತ್ತಾರೆ.',
    requestMsmeBadge: 'ಎಂಎಸ್ಎಂಇ ದೃಢೀಕರಣ ಬ್ಯಾಡ್ಜ್ ವಿನಂತಿಸಿ',
    businessTrustDesc: 'ದೃಢೀಕೃತ ಉದ್ಯಮಗಳು ನಕ್ಷೆ ಮತ್ತು ಜಾಹೀರಾತುಗಳಲ್ಲಿ ಅಧಿಕೃತ ಬ್ಯಾಡ್ಜ್ ಪಡೆಯುತ್ತವೆ, ಇದರಿಂದ ಗ್ರಾಮೀಣ ಯುವಕರು ಹೆಚ್ಚು ವಿಶ್ವಾಸದಿಂದ ಅರ್ಜಿ ಸಲ್ಲಿಸುತ್ತಾರೆ.',

    // Youth Dashboard
    youthPortal: 'ಗ್ರಾಮೀಣ ಯುವ ಉದ್ಯೋಗಾಕಾಂಕ್ಷಿ ಪೋರ್ಟಲ್',
    verifiedTalentBadge: 'ದೃಢೀಕೃತ ಗ್ರಾಮೀಣ ಪ್ರತಿಭೆ',
    digitalSkillPassport: 'ಡಿಜಿಟಲ್ ಸ್ಕಿಲ್ ಪಾಸ್‌ಪೋರ್ಟ್',
    oneClickBiodata: '1-ಕ್ಲಿಕ್ ಬಯೋಡೇಟಾ / PDF',
    tabSmartMatches: 'ಎಐ ಸ್ಮಾರ್ಟ್ ಹೊಂದಾಣಿಕೆ',
    tabMyApplications: 'ನನ್ನ ಅರ್ಜಿಗಳು',
    tabMapDiscovery: 'ಉದ್ಯೋಗ ನಕ್ಷೆ',
    appTrackerTitle: 'ಅರ್ಜಿ ಸ್ಥಿತಿ ಟ್ರ್ಯಾಕರ್',
    appTrackerSub: 'ಸ್ಥಳೀಯ ಮಾಲೀಕರಿಂದ ನೈಜ ಸಮಯದ ನವೀಕರಣಗಳು',
    noApplicationsYet: 'ನೀವಿನ್ನೂ ಯಾವುದೇ ಉದ್ಯೋಗಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿಲ್ಲ. ಸ್ಮಾರ್ಟ್ ಹೊಂದಾಣಿಕೆ ಪರಿಶೀಲಿಸಿ!',
    appStatusApplied: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ',
    appStatusReceived: 'ಮಾಲೀಕರಿಗೆ ತಲುಪಿದೆ',
    appStatusReview: 'ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ',
    appStatusShortlisted: 'ಟ್ರಯಲ್ ಪರೀಕ್ಷೆಗೆ ಆಯ್ಕೆಯಾಗಿದೆ 🎉',
    appStatusInterview: 'ಸಂದರ್ಶನ ನಿಗದಿಯಾಗಿದೆ 📅',
    appStatusSelected: 'ಕೆಲಸಕ್ಕೆ ಆಯ್ಕೆಯಾಗಿದ್ದೀರಿ! 🏆',
    appStatusRejected: 'ಆಯ್ಕೆಯಾಗಿಲ್ಲ',
    appStatusWithdrawn: 'ಹಿಂಪಡೆಯಲಾಗಿದೆ',
    employerNoteLabel: 'ಮಾಲೀಕರ ಟಿಪ್ಪಣಿ:',

    // Admin Dashboard
    adminControl: 'ರೂರಲ್ ಕನೆಕ್ಟ್ ಆಡಳಿತ ನಿಯಂತ್ರಣ',
    adminSub: 'ಎಂಎಸ್ಎಂಇ ನಿಯಮಾವಳಿ, ಉದ್ಯೋಗ ಸುರಕ್ಷತೆ ಮತ್ತು ಜಿಲ್ಲಾವಾರು ಕೌಶಲ್ಯ ಅಂತರದ ಮೇಲ್ವಿಚಾರಣೆ',
    govCertified: 'ಗ್ರಾಮ ವಿಕಾಸ್ ದೃಢೀಕೃತ',
    registeredYouth: 'ನೋಂದಾಯಿತ ಯುವಕರು',
    registeredBusinesses: 'ನೋಂದಾಯಿತ ಉದ್ಯಮಗಳು',
    activeJobsTotal: 'ಚಾಲ್ತಿಯಲ್ಲಿರುವ ಉದ್ಯೋಗಗಳು',
    totalPlacements: 'ಒಟ್ಟು ನೇಮಕಾತಿಗಳು',
    tabVerificationQueue: 'ದೃಢೀಕರಣ ಪರಿಶೀಲನೆ ಪಟ್ಟಿ',
    tabReports: 'ವಂಚನೆ ಮತ್ತು ದೂರುಗಳ ಪರಿಶೀಲನೆ',
    tabDistrictHeatmap: 'ಜಿಲ್ಲಾವಾರು ಉದ್ಯೋಗಾವಕಾಶ ಅಂತರ',
    approveBadge: 'ಬ್ಯಾಡ್ಜ್ ಅನುಮೋದಿಸಿ',
    revokeBadge: 'ಬ್ಯಾಡ್ಜ್ ಹಿಂಪಡೆಯಿರಿ',
    removeScamJob: 'ನಕಲಿ ಉದ್ಯೋಗ ತೆಗೆದುಹಾಕಿ',
    dismissFlag: 'ದೂರನ್ನು ವಜಾಗೊಳಿಸಿ',
    districtGapAlert: 'ಎಐ ಅವಕಾಶ ಅಂತರ ಎಚ್ಚರಿಕೆ:',
    topDemandedLabel: 'ಉದ್ಯೋಗದಾತರಿಂದ ಹೆಚ್ಚಿನ ಬೇಡಿಕೆ:',
    skillDeficitLabel: 'ಕೌಶಲ್ಯ ಕೊರತೆ:',

    // Authentication
    welcomeBack: 'ಮತ್ತೆ ಸುಸ್ವಾಗತ',
    signInPrompt: 'ನಿಮ್ಮ ರೂರಲ್ ಕನೆಕ್ಟ್ ಎಐ ಖಾತೆಗೆ ಲಾಗಿನ್ ಮಾಡಿ',
    roleYouth: 'ಯುವಕ',
    roleEmployer: 'ಉದ್ಯೋಗದಾತ',
    roleAdmin: 'ಅಡ್ಮಿನ್',
    emailAddress: 'ಇಮೇಲ್ ವಿಳಾಸ',
    password: 'ಪಾಸ್‌ವರ್ಡ್',
    signInBtn: 'ಲಾಗಿನ್ ಮಾಡಿ',
    dontHaveAccount: 'ಇನ್ನೂ ಖಾತೆ ಹೊಂದಿಲ್ಲವೇ?',
    registerHere: 'ಇಲ್ಲಿ ನೋಂದಾಯಿಸಿ',
    alreadyRegistered: 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?',
    logInHere: 'ಇಲ್ಲಿ ಪ್ರವೇಶಿಸಿ',
    joinAsYouth: 'ಗ್ರಾಮೀಣ ಯುವಕರಾಗಿ ಸೇರಿ',
    registerSmallBusiness: 'ಸಣ್ಣ ಉದ್ಯಮ ನೋಂದಾಯಿಸಿ',
    guidedOnboarding: 'ಮಾರ್ಗದರ್ಶಿತ ನೋಂದಣಿ:',
    stepOf: 'ಹಂತ',
    of: 'ರ',
    iAmJobSeeker: 'ನಾನು ಉದ್ಯೋಗಾಕಾಂಕ್ಷಿ (ಯುವಕ)',
    iAmEmployer: 'ನಾನು ಉದ್ಯೋಗದಾತ (ವ್ಯಾಪಾರ/ಉದ್ಯಮ)',
    fullNameLabel: 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು *',
    contactPersonLabel: 'ಮಾಲೀಕರ ಪೂರ್ಣ ಹೆಸರು *',
    businessNameLabel: 'ಉದ್ಯಮ / ಸಂಸ್ಥೆಯ ಹೆಸರು *',
    mobileNumberLabel: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ *',
    villageLabel: 'ಗ್ರಾಮ / ಊರು *',
    educationLabel: 'ವಿದ್ಯಾರ್ಹತೆ',
    availabilityLabel: 'ಲಭ್ಯತೆ',
    monthlyPayLabel: 'ನಿರೀಕ್ಷಿತ ಮಾಸಿಕ ವೇತನ (₹)',
    practicalSkillsLabel: 'ನಿಮ್ಮ ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯಗಳನ್ನು ಆರಿಸಿ:',
    practicalExpLabel: 'ನಿಮ್ಮ ಕೈಕೆಲಸದ ಅನುಭವವನ್ನು ಸಂಕ್ಷಿಪ್ತವಾಗಿ ತಿಳಿಸಿ:',
    noResumeOption: 'ನನ್ನ ಬಳಿ ಇಂಗ್ಲಿಷ್ ರೆಸ್ಯೂಮ್ ಇಲ್ಲ (ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ) — ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯಗಳ ಆಧಾರದ ಮೇಲೆ ಡಿಜಿಟಲ್ ಸ್ಕಿಲ್ ಪಾಸ್‌ಪೋರ್ಟ್ ರಚಿಸಿ.',
    hasResumeOption: 'ನನ್ನ ಬಳಿ ರೆಸ್ಯೂಮ್ ಫೈಲ್ ಇದೆ (ಐಚ್ಛಿಕ)',
    continueBtn: 'ಮುಂದುವರಿಯಿರಿ',
    backBtn: 'ಹಿಂದಕ್ಕೆ',
    completeAndLaunch: 'ಪೂರ್ಣಗೊಳಿಸಿ',

    // Career Guide & Voice Assistant
    voiceGuide: 'ಗ್ರಾಮೀಣ ವೃತ್ತಿ ಮಾರ್ಗದರ್ಶಿ',
    voiceAssistantSubtitle: 'ಎಐ ಧ್ವನಿ ಸಹಾಯ • EN / ಕನ್ನಡ / हिन्दी',
    listenAudio: 'ಧ್ವನಿ ಆಲಿಸಿ',
    askQuestionPlaceholder: 'ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಮಾತನಾಡಿ...',
    speechNotSupported: 'ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಬೆಂಬಲಿಸುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಟೈಪ್ ಮಾಡಿ.',

    // Community Referral
    referralTitle: 'ಗ್ರಾಮೀಣ ಸಮುದಾಯ ಶಿಫಾರಸು ಪೋರ್ಟಲ್',
    referralSub: 'ಗ್ರಾಮ ಪಂಚಾಯತ್, ಸ್ತ್ರೀಶಕ್ತಿ ಸಂಘ ಮತ್ತು ಯುವಕ ಮಂಡಲಗಳಿಗಾಗಿ',
    referrerName: 'ನಿಮ್ಮ ಹೆಸರು (ಶಿಫಾರಸುದಾರರು) *',
    referrerPhone: 'ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ *',
    referrerOrg: 'ಸಂಸ್ಥೆ / ಸಂಘ',
    candidateName: 'ಅಭ್ಯರ್ಥಿಯ ಹೆಸರು *',
    candidatePhone: 'ಅಭ್ಯರ್ಥಿಯ ಮೊಬೈಲ್ *',
    submitReferral: 'ಶಿಫಾರಸು ಸಲ್ಲಿಸಿ',
    referralSuccess: 'ಶಿಫಾರಸನ್ನು ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಿಸಲಾಗಿದೆ!',
    referralSuccessSub: 'ನಮ್ಮ ಗ್ರಾಮೀಣ ಸಂಯೋಜಕರು ಅಭ್ಯರ್ಥಿಯನ್ನು ಮತ್ತು ಸ್ಥಳೀಯ ಮಾಲೀಕರನ್ನು ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.',

    // Footer
    footerMission: 'ವಿವರಣಾತ್ಮಕ ಎಐ ಕೌಶಲ್ಯ ಹೊಂದಾಣಿಕೆ, ಸುಲಭ ಪ್ರಯಾಣ ಅಂತರ ಮತ್ತು ವೃತ್ತಿ ಪ್ರಗತಿಯೊಂದಿಗೆ ಗ್ರಾಮೀಣ ಯುವಕರು ಮತ್ತು ಸಣ್ಣ ಉದ್ಯಮಗಳಿಗೆ ಶಕ್ತಿ ತುಂಬುವುದು.',
    footerHackathon: 'ಹ್ಯಾಕ್‌ಕಲ್ಚರ್ ಜಾಗತಿಕ ಹ್ಯಾಕಥಾನ್‌ಗಾಗಿ ಅಭಿವೃದ್ಧಿಪಡಿಸಲಾಗಿದೆ',
    footerZeroFee: '100% ಉಚಿತ ಖಾತರಿ — ಯುವಕರಿಂದ ಯಾವುದೇ ಅರ್ಜಿ ಶುಲ್ಕ ಪಡೆಯುವುದಿಲ್ಲ.',
    footerPrivacy: 'ಖಾಸಗಿತನ ಮೊದಲು: ಅಭ್ಯರ್ಥಿಗಳ ನಿಖರ ಮನೆ ವಿಳಾಸವನ್ನು ರಕ್ಷಿಸಲಾಗುತ್ತದೆ.',
    footerHelpline: 'ಉಚಿತ ಸಹಾಯವಾಣಿ: 1800-RURAL-AI',
    footerCopyright: '© 2026 ರೂರಲ್ ಕನೆಕ್ಟ್ ಎಐ. ಸಮಗ್ರ ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಪರಿಸರ ವ್ಯವಸ್ಥೆ.',
    footerDignity: 'ಗ್ರಾಮೀಣ ಸಬಲೀಕರಣ ಮತ್ತು ಸ್ಥಳೀಯ ಆರ್ಥಿಕ ಘನತೆಗಾಗಿ ಸಮರ್ಪಿತ.'
  },

  hi: {
    // Brand & Header
    brandName: 'रूरल कनेक्ट एआई',
    tagline: 'स्थानीय प्रतिभा। सही कौशल। वास्तविक अवसर।',
    navJobs: 'नौकरियां खोजें',
    navMap: 'रोजगार मानचित्र (Map)',
    navSkillGap: 'कौशल विश्लेषक',
    navImpact: 'प्रभाव डैशबोर्ड',
    navReferral: 'सामुदायिक रेफरल',
    login: 'लॉग इन करें',
    register: 'पंजीकरण करें',
    logout: 'लॉग आउट',
    youthDashboard: 'युवा पोर्टल',
    employerDashboard: 'नियोक्ता पोर्टल',
    adminDashboard: 'प्रशासनिक नियंत्रण',
    portal: 'पोर्टल',

    // Demo Bar
    demoModeNotice: 'हैकथॉन मूल्यांकन मोड: 1-क्लिक में उपयोगकर्ता बदलें',
    demoYouthBtn: 'प्रवीण (युवा)',
    demoEmployerBtn: 'वेंकटेश (नियोक्ता)',
    demoAdminBtn: 'ग्राम विकास (एडमिन)',
    demoScriptBtn: '2-मिनट डेमो गाइड',
    demoScriptTitle: '2-मिनट निर्णायक मूल्यांकन टूर',
    demoScriptSubtitle: 'रूरल कनेक्ट एआई का संपूर्ण परीक्षण कैसे करें',
    demoStep1Title: 'चरण 1: ग्रामीण युवा अनुभव (प्रवीण कुमार, बंटवाल)',
    demoStep1Desc: 'ऊपर "प्रवीण (युवा)" पर क्लिक करें। इलेक्ट्रिकल वर्कशॉप सहायक पद हेतु 100% मैच देखें। पारदर्शी स्कोरिंग देखने हेतु "मैच का कारण" पर क्लिक करें। बिना रिज्यूम के डिजिटल स्किल पासपोर्ट देखें।',
    demoStep2Title: 'चरण 2: कौशल विश्लेषक ("कौशल पहचानें, भविष्य संवारें")',
    demoStep2Desc: 'स्किल गैप एनालाइजर खोलें। 3-चरणीय व्यावहारिक रोडमैप और वेतन वृद्धि (+122% आय में उछाल) का अनुमान देखें।',
    demoStep3Title: 'चरण 3: छोटे नियोक्ताओं हेतु रिवर्स मैचिंग (वेंकटेश राव)',
    demoStep3Desc: '"वेंकटेश (नियोक्ता)" पर क्लिक करें। विज्ञापन देकर प्रतीक्षा करने की आवश्यकता नहीं: रिवर्स मैचिंग इंजन 0.5 किमी के दायरे में प्रवीण को तुरंत शीर्ष पर दिखाता है।',
    demoStep4Title: 'चरण 4: सुरक्षा एवं प्रशासनिक नियंत्रण (ग्राम विकास अधिकारी)',
    demoStep4Desc: '"ग्राम विकास (एडमिन)" पर क्लिक करें। एमएसएमई सत्यापन अनुरोधों की जांच करें और फर्जी नौकरियों की रिपोर्ट पर कार्रवाई करें।',
    demoScriptClose: 'शुरू करें',
    toggleLangHint: 'ऊपर दाईं ओर English / ಕನ್ನಡ / हिन्दी भाषा बदल सकते हैं!',

    // Hero Section
    heroBadge: 'हैककल्चर 2026 वैश्विक हैकथॉन प्रस्तुति',
    heroEcosystemBadge: 'ग्रामीण रोजगार एवं कौशल पारिस्थितिकी तंत्र',
    heroTitle: 'ग्रामीण युवाओं और स्थानीय व्यवसायों को जोड़ने वाला पारदर्शी एआई',
    heroSubtitle: 'व्यावहारिक हुनर को सर्वोच्च प्राथमिकता। किसी औपचारिक रिज्यूम की बाध्यता नहीं — आपके काम का अनुभव ही आपकी पहचान है।',
    exploreJobs: 'स्थानीय नौकरियां देखें',
    tryInstantDemo: 'युवा के रूप में डेमो देखें',
    zeroFees: 'शून्य आवेदन शुल्क',
    noResumeNeeded: 'औपचारिक सीवी अनिवार्य नहीं',
    bilingualNotice: 'त्रिभाषी समर्थन: English, ಕನ್ನಡ, हिन्दी',
    mobileFirst: 'धीमे इंटरनेट पर भी तीव्र गति',

    // Problem Statement Section
    problemBadge: 'हैकथॉन का आधिकारिक समस्या कथन',
    problemQuote: '"ग्रामीण युवाओं को उपयुक्त काम नहीं मिलता, और छोटे नियोक्ताओं को युवा नहीं मिलते।"',
    problemYouthTitle: 'ग्रामीण नौकरी चाहने वालों के लिए:',
    problemYouthPoint1: 'शहरी जॉब पोर्टल अंग्रेजी रिज्यूम मांगते हैं, जिससे व्यावहारिक हुनर छिप जाता है।',
    problemYouthPoint2: 'नौकरियां बहुत दूर होती हैं या भ्रामक वेतन दर्शाती हैं।',
    problemYouthPoint3: 'काम न मिलने पर युवा समझ नहीं पाते कि आगे कौन सा कौशल सीखना है।',
    problemEmployerTitle: 'स्थानीय छोटे नियोक्ताओं के लिए:',
    problemEmployerPoint1: 'छोटे वर्कशॉप और कृषि फार्म महंगे भर्ती विज्ञापन नहीं दे सकते।',
    problemEmployerPoint2: 'पारंपरिक भर्ती धीमी और केवल जान-पहचान तक सीमित होती है।',
    problemEmployerPoint3: 'फसल कटाई और त्योहारी सीजन में स्थानीय कामगार तुरंत नहीं मिल पाते।',

    // How It Works
    howItWorksBadge: 'इंटेलिजेंट सिस्टम आर्किटेक्चर',
    howItWorksTitle: 'रूरल कनेक्ट एआई इस अंतर को कैसे मिटाता है',
    howItWorksSubtitle: 'व्यावहारिक कौशल पहचान से लेकर सत्यापित रोजगार तक एक सहज यात्रा।',
    step1Title: 'कौशल-प्रथम प्रोफाइल (रिज्यूम का कोई अवरोध नहीं)',
    step1Desc: 'युवा अपने हाथ के काम का अनुभव दर्ज करते हैं (वायरिंग, ट्रैक्टर संचालन, बिलिंग, सिलाई)। हम सत्यापित डिजिटल स्किल पासपोर्ट तैयार करते हैं।',
    step2Title: 'पारदर्शी एआई मैचिंग एवं यात्रा दूरी',
    step2Desc: 'हमारा 5-कारक स्कोरिंग इंजन कौशल (40%), दूरी (25%), शिक्षा (15%), वेतन (10%) और कार्य समय (10%) का संतुलन बनाकर स्पष्ट व्याख्या देता है।',
    step3Title: 'कौशल उन्नयन रोडमैप एवं रिवर्स हायरिंग',
    step3Desc: 'नौकरी न मिलने पर मुफ्त क्षेत्रीय वीडियो से कौशल सीख सकते हैं। वहीं नियोक्ता सीधे पास के कामगारों से संपर्क कर सकते हैं।',

    // 5 Pillars
    pillarsBadge: 'हमारी विशिष्टताएं',
    pillarsTitle: 'रूरल कनेक्ट एआई को सबसे अलग बनाने वाले 5 स्तंभ',
    pillar1Title: '1. पारदर्शी एआई मैच इंडेक्स',
    pillar1Desc: 'कोई भ्रामक प्रतिशत नहीं। उम्मीदवार और नियोक्ता स्पष्ट देखते हैं कि मैच क्यों हुआ (जैसे: "गांव से मात्र 0.5 किमी", "वायरिंग कौशल सत्यापित")।',
    pillar2Title: '2. कौशल विश्लेषक एवं आय रोडमैप',
    pillar2Desc: '"कौशल पहचानें, भविष्य संवारें" 3 चरणों में सीखने का मार्ग दिखाता है और मासिक आय ₹9,000 से ₹20,000 होने का स्पष्ट अनुमान देता है।',
    pillar3Title: '3. नियोक्ताओं के लिए रिवर्स कैंडिडेट मैचिंग',
    pillar3Desc: 'नियोक्ता को विज्ञापन देकर खाली नहीं बैठना पड़ता। सिस्टम उनके आस-पास के कुशल युवाओं को तुरंत उनके सामने लाता है।',
    pillar4Title: '4. सुरक्षा, प्रामाणिकता एवं धोखाधड़ी रोकथाम',
    pillar4Desc: 'सख्त एमएसएमई सत्यापन, 100% मुफ्त आवेदन की गारंटी और उम्मीदवारों के सटीक घर के पते की पूर्ण सुरक्षा।',
    pillar5Title: '5. अल्पकालिक एवं मौसमी रोजगार मोड',
    pillar5Desc: 'फसल कटाई, सप्ताहांत किराना सहायता, त्योहारी काम और अप्रेंटिसशिप के लिए पारदर्शी दैनिक वेतन वाले अवसर।',
    pillar6Title: '6. त्रिभाषी आवाज सहायक',
    pillar6Desc: 'हिंदी, कन्नड़ और अंग्रेजी में सहजता से बोलकर या लिखकर सहायता प्राप्त करने की सुविधा।',

    // Live Metrics
    metricsBadge: 'लाइव पारिस्थितिकी आंकड़े',
    metricsTitle: 'जमीनी स्तर पर दिखाई दे रहा वास्तविक प्रभाव',
    metricYouth: 'पंजीकृत ग्रामीण युवा',
    metricEmployers: 'सत्यापित स्थानीय व्यवसाय',
    metricFit: 'औसत यात्रा सामीप्य',
    metricPay: 'औसत मासिक शुरुआती वेतन',
    viewFullAnalytics: 'संपूर्ण एनालिटिक्स डैशबोर्ड देखें',

    // Testimonials & FAQs
    testimonialsBadge: 'ग्रामीण भारत की आवाज',
    testimonialsTitle: 'जमीनी स्तर की वास्तविक कहानियां',
    testimonialsSub: '(फील्ड पायलट के आधार पर)',
    faqBadge: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)',
    faqTitle: 'आपके प्रश्नों के हमारे उत्तर',
    readyToConnect: 'हुनर को सही अवसर से जोड़ने के लिए तैयार हैं?',
    readyToConnectSub: 'हमारे 1-क्लिक डेमो खातों के माध्यम से तुरंत पूरे प्लेटफॉर्म का अनुभव करें।',
    exploreYouthPraveen: 'युवा के रूप में देखें (प्रवीण)',
    exploreBizVenkatesh: 'नियोक्ता के रूप में देखें (वेंकटेश)',
    exploreAdminGramVikas: 'एडमिन के रूप में देखें (ग्राम विकास)',

    // Job Card & Common Details
    smartMatch: 'एआई स्मार्ट मैच',
    verifiedEmployer: 'सत्यापित व्यवसाय',
    microOpportunity: 'मौसमी माइक्रो-गिग',
    fullTime: 'पूर्णकालिक',
    partTime: 'अंशकालिक',
    temporary: 'अस्थायी',
    seasonal: 'मौसमी',
    apprenticeship: 'अप्रेंटिसशिप',
    whyMatch: 'मैच का कारण',
    skillGap: 'कौशल अंतर',
    applyNow: 'अभी आवेदन करें',
    applied: 'आवेदन किया गया',
    viewDetails: 'विवरण देखें',
    commuteDistance: 'यात्रा दूरी',
    expectedPay: 'अपेक्षित वेतन',
    standardHours: 'कार्य का समय',
    missingSkills: 'सीखने योग्य कौशल',
    noMatchingJobs: 'फिलहाल कोई उपयुक्त नौकरी उपलब्ध नहीं है।',
    showingJobs: 'सत्यापित उपलब्ध नौकरियां',
    zeroFeesGuaranteed: 'कोई आवेदन शुल्क नहीं • सीधा संपर्क',

    // Match Modal
    explainableScoreTitle: 'एआई मैचिंग पारदर्शी मूल्यांकन',
    exceptionalFit: 'आपकी प्रोफाइल हेतु सर्वोत्तम अवसर',
    strongFit: 'मजबूत व्यावहारिक उपयुक्तता',
    matchIndex: 'मैच सूचकांक',
    transparentBreakdown: 'पारदर्शी मूल्यांकन विवरण',
    critSkills: '1. सत्यापित कौशल एवं व्यावहारिक क्षमता',
    critDistance: '2. यात्रा दूरी एवं सुगमता',
    critEducation: '3. योग्यता एवं जमीनी अनुभव',
    critSalary: '4. वेतन अपेक्षा की अनुकूलता',
    critAvailability: '5. कार्य समय एवं उपलब्धता',
    whyRecommended: 'यह नौकरी आपके लिए क्यों अनुशंसित है:',
    addCoverNote: 'नियोक्ता के लिए संदेश (वैकल्पिक):',
    coverNotePlaceholder: 'उदा: मैं पास ही बंटवाल में रहता हूँ और मुझे घरेलू वायरिंग का अनुभव है। मैं तुरंत कार्य शुरू कर सकता हूँ।',
    submitApplication: 'निःशुल्क आवेदन भेजें',
    submitting: 'भेजा जा रहा है...',
    applicationSuccess: 'आवेदन सफलतापूर्वक भेजा गया! नियोक्ता को सूचित कर दिया गया है।',
    alreadyAppliedNotice: 'आप इस नौकरी के लिए पहले ही आवेदन कर चुके हैं। अपने पोर्टल में स्थिति ट्रैक करें।',
    viewFreeRoadmap: 'मुफ्त रोडमैप देखें',
    close: 'बंद करें',

    // Skill Gap Modal
    skillsHeadline: 'कौशल पहचानें, भविष्य संवारें',
    incomePotential: 'कौशल-आय वृद्धि क्षमता',
    unlockUpTo: 'संभावित आय में वृद्धि',
    currentAvg: 'वर्तमान औसत',
    certifiedAvg: 'सर्टिफाइड होने के बाद औसत',
    practicalRoadmapTitle: 'कदम-दर-कदम व्यावहारिक सीखने का रोडमैप',
    estimatedTotal: 'कुल अनुमानित समय',
    hours: 'घंटे',
    days: 'दिन',
    targetMilestone: 'लक्ष्य मील का पत्थर',
    eligibleRoles: 'सीखने के बाद उपलब्ध स्थानीय नौकरियां:',
    freeModulesNotice: 'सभी शिक्षण वीडियो एवं मॉड्यूल क्षेत्रीय भाषा में 100% निःशुल्क हैं।',
    done: 'पूर्ण',

    // Discover Map
    mapTitle: 'इंटरैक्टिव रोजगार मानचित्र (Discover Map)',
    mapSub: 'अपने आस-पास छोटे व्यवसायों की रिक्तियों और मौसमी अवसरों को मानचित्र पर खोजें',
    useMyLocation: 'मेरा वर्तमान स्थान प्रयोग करें (GPS)',
    myLocationActive: 'स्थान सक्रिय है',
    locationDenied: 'स्थान अनुमति अस्वीकृत। आप मैन्युअल रूप से अपना गांव या जिला चुन सकते हैं।',
    manualLocationHint: 'मानचित्र पर कहीं भी क्लिक करें या नीचे जिला चुनकर केंद्र बदलें।',
    mapPrivacyNotice: 'सुरक्षित मानचित्र: केवल सत्यापित दुकानों/वर्कशॉप के पते सार्वजनिक रूप से प्रदर्शित होते हैं। उम्मीदवारों के घर के पते पूरी तरह गोपनीय रहते हैं।',
    radiusLabel: 'दायरा:',
    districtLabel: 'जिला:',
    sectorLabel: 'क्षेत्र:',
    allDistricts: 'सभी जिले',
    allSectors: 'सभी क्षेत्र',
    permanentJobsPin: 'स्थायी / पूर्णकालिक नौकरी',
    microGigPin: 'मौसमी / माइक्रो-गिग',
    selectedOpportunity: 'चयनित अवसर',
    viewAndApply: 'विवरण देखें और आवेदन करें',
    selectPinNotice: 'मानचित्र पर पिन चुनें या नीचे दी गई सूची में से किसी नौकरी पर क्लिक करें।',
    nearbyJobsList: 'आस-पास उपलब्ध नौकरियों की सूची',
    noCoordJobsTitle: 'अन्य नजदीकी नौकरियां (मानचित्र स्थान अपडेट प्रक्रिया में)',
    noCoordJobsDesc: 'इन स्थानीय नियोक्ताओं के पास सत्यापित रिक्तियां हैं, जिनका लिखित पता उपलब्ध है।',
    loadingMap: 'मानचित्र एवं रिक्तियों को लोड किया जा रहा है...',
    mapErrorNotice: 'मानचित्र लोड करने में असमर्थ। कृपया इंटरनेट जांचें या नीचे दी गई सूची देखें।',
    withinRadius: 'दायरे में',
    userLocationPin: 'आप यहाँ हैं',

    // Reverse Candidate Matching
    reverseMatchHeadline: 'छोटे व्यवसायों हेतु सीधी ग्रामीण उम्मीदवार खोज',
    reverseMatchSub: 'आवेदन की प्रतीक्षा करने के बजाय, हमारा एआई आपके कार्यक्षेत्र के योग्य उम्मीदवारों को तुरंत दिखाता है।',
    rankedByProximity: 'दूरी एवं व्यावहारिक हुनर के आधार पर प्राथमिकता',
    callCandidate: 'उम्मीदवार को कॉल करें',
    contactNumber: 'मोबाइल:',
    shortlistForTrial: 'ट्रायल के लिए शॉर्टलिस्ट करें',
    practicalAptitude: 'व्यावहारिक अनुभव:',
    expectedSalaryLabel: 'अपेक्षित वेतन:',
    candidateShortlistedAlert: 'उम्मीदवार को इंटरव्यू/ट्रायल हेतु शॉर्टलिस्ट कर लिया गया है!',

    // Employer Dashboard
    employerPortal: 'लघु उद्योग नियोक्ता पोर्टल',
    activeVacancies: 'सक्रिय रिक्तियां',
    totalApplicants: 'कुल प्राप्त आवेदन',
    shortlistedApplicants: 'शॉर्टलिस्टेड उम्मीदवार',
    successfulHires: 'सफल नियुक्तियां',
    publishNewVacancy: 'नई रिक्ति प्रकाशित करें',
    tabReverseMatch: 'सीधी उम्मीदवार खोज',
    tabVacancies: 'मेरी रिक्तियां',
    tabApplicants: 'आवेदन प्रबंधन',
    tabTrust: 'विश्वसनीयता एवं सत्यापन',
    postVacancyTitle: 'नया रोजगार अवसर प्रकाशित करें',
    jobTitleLabel: 'पद का नाम *',
    sectorCategoryLabel: 'उद्योग श्रेणी',
    jobTypeLabel: 'नौकरी का प्रकार',
    requiredSkillsLabel: 'आवश्यक व्यावहारिक कौशल (अल्पविराम से अलग करें)',
    minSalaryLabel: 'न्यूनतम वेतन (₹) *',
    maxSalaryLabel: 'अधिकतम वेतन (₹) *',
    jobDescLabel: 'कार्य का विवरण',
    jobDescPlaceholder: 'दैनिक कार्यों, सिखाए जाने वाले काम, दोपहर के भोजन आदि का उल्लेख करें...',
    publishButton: 'रिक्ति प्रकाशित करें',
    publishing: 'प्रकाशित हो रहा है...',
    cancel: 'रद्द करें',
    hireCandidate: 'नियुक्त करें 🎉',
    scheduleInterview: 'इंटरव्यू तय करें',
    shortlistBtn: 'शॉर्टलिस्ट',
    verificationRequestSubmitted: 'सत्यापन अनुरोध भेज दिया गया है! अधिकारी शीघ्र जांच करेंगे।',
    requestMsmeBadge: 'एमएसएमई सत्यापन बैज का अनुरोध करें',
    businessTrustDesc: 'सत्यापित व्यवसायों को मानचित्र एवं रिक्तियों पर आधिकारिक बैज मिलता है, जिससे ग्रामीण युवा अधिक विश्वास के साथ आवेदन करते हैं।',

    // Youth Dashboard
    youthPortal: 'ग्रामीण युवा रोजगार पोर्टल',
    verifiedTalentBadge: 'सत्यापित ग्रामीण प्रतिभा',
    digitalSkillPassport: 'डिजिटल स्किल पासपोर्ट',
    oneClickBiodata: '1-क्लिक बायोडाटा / PDF',
    tabSmartMatches: 'एआई स्मार्ट मैच',
    tabMyApplications: 'मेरे आवेदन',
    tabMapDiscovery: 'रोजगार मानचित्र',
    appTrackerTitle: 'आवेदन स्थिति ट्रैकर',
    appTrackerSub: 'स्थानीय नियोक्ताओं से रीयल-टाइम अपडेट',
    noApplicationsYet: 'आपने अभी तक किसी नौकरी के लिए आवेदन नहीं किया है। स्मार्ट मैच देखें!',
    appStatusApplied: 'आवेदन भेजा गया',
    appStatusReceived: 'नियोक्ता को प्राप्त हुआ',
    appStatusReview: 'समीक्षाधीन',
    appStatusShortlisted: 'ट्रायल हेतु चयनित 🎉',
    appStatusInterview: 'इंटरव्यू तय हुआ 📅',
    appStatusSelected: 'नौकरी मिल गई! 🏆',
    appStatusRejected: 'चयन नहीं हुआ',
    appStatusWithdrawn: 'वापस लिया गया',
    employerNoteLabel: 'नियोक्ता की टिप्पणी:',

    // Admin Dashboard
    adminControl: 'रूरल कनेक्ट प्रशासनिक नियंत्रण',
    adminSub: 'एमएसएमई अनुपालन, रोजगार सुरक्षा एवं जिलावार कौशल अंतर की निगरानी',
    govCertified: 'ग्राम विकास द्वारा प्रमाणित',
    registeredYouth: 'पंजीकृत ग्रामीण युवा',
    registeredBusinesses: 'पंजीकृत स्थानीय व्यवसाय',
    activeJobsTotal: 'सक्रिय रिक्तियां',
    totalPlacements: 'कुल नियुक्तियां',
    tabVerificationQueue: 'सत्यापन समीक्षा कतार',
    tabReports: 'धोखाधड़ी एवं शिकायत निवारण',
    tabDistrictHeatmap: 'जिलावार रोजगार अंतर हीटमैप',
    approveBadge: 'बैज स्वीकृत करें',
    revokeBadge: 'बैज रद्द करें',
    removeScamJob: 'फर्जी रिक्ति हटाएं',
    dismissFlag: 'शिकायत खारिज करें',
    districtGapAlert: 'एआई अवसर अंतर चेतावनी:',
    topDemandedLabel: 'स्थानीय नियोक्ताओं में मांग:',
    skillDeficitLabel: 'कौशल की कमी:',

    // Authentication
    welcomeBack: 'पुनः स्वागत है',
    signInPrompt: 'अपने रूरल कनेक्ट एआई पोर्टल में प्रवेश करें',
    roleYouth: 'युवा',
    roleEmployer: 'नियोक्ता',
    roleAdmin: 'एडमिन',
    emailAddress: 'ईमेल पता',
    password: 'पासवर्ड',
    signInBtn: 'लॉग इन करें',
    dontHaveAccount: 'अभी तक खाता नहीं है?',
    registerHere: 'यहाँ पंजीकरण करें',
    alreadyRegistered: 'पहले से पंजीकृत हैं?',
    logInHere: 'यहाँ प्रवेश करें',
    joinAsYouth: 'ग्रामीण युवा के रूप में जुड़ें',
    registerSmallBusiness: 'छोटा व्यवसाय पंजीकृत करें',
    guidedOnboarding: 'मार्गदर्शित पंजीकरण:',
    stepOf: 'चरण',
    of: 'का',
    iAmJobSeeker: 'मैं नौकरी चाहने वाला हूँ (युवा)',
    iAmEmployer: 'मैं नियोक्ता हूँ (व्यवसाय)',
    fullNameLabel: 'आपका पूरा नाम *',
    contactPersonLabel: 'संपर्क व्यक्ति का नाम *',
    businessNameLabel: 'व्यवसाय / दुकान का नाम *',
    mobileNumberLabel: 'मोबाइल फोन नंबर *',
    villageLabel: 'गांव / कस्बा *',
    educationLabel: 'शैक्षणिक योग्यता',
    availabilityLabel: 'उपलब्धता',
    monthlyPayLabel: 'अपेक्षित मासिक वेतन (₹)',
    practicalSkillsLabel: 'अपने व्यावहारिक कौशल चुनें:',
    practicalExpLabel: 'अपने हाथ के काम का अनुभव संक्षेप में बताएं:',
    noResumeOption: 'मेरे पास औपचारिक रिज्यूम नहीं है (अनुशंसित) — मेरे व्यावहारिक हुनर के आधार पर डिजिटल स्किल पासपोर्ट बनाएं।',
    hasResumeOption: 'मेरे पास रिज्यूम फाइल है (वैकल्पिक)',
    continueBtn: 'आगे बढ़ें',
    backBtn: 'पीछे',
    completeAndLaunch: 'पूर्ण करें',

    // Career Guide & Voice Assistant
    voiceGuide: 'ग्रामीण करियर गाइड',
    voiceAssistantSubtitle: 'एआई सहायक • EN / ಕನ್ನಡ / हिन्दी',
    listenAudio: 'आवाज सुनें',
    askQuestionPlaceholder: 'प्रश्न लिखें या बोलकर पूछें...',
    speechNotSupported: 'आपके ब्राउज़र में आवाज पहचान की सुविधा नहीं है। कृपया टाइप करें।',

    // Community Referral
    referralTitle: 'ग्रामीण सामुदायिक रेफरल पोर्टल',
    referralSub: 'ग्राम पंचायतों, स्वयं सहायता समूहों (SHG) एवं युवा मंडलों हेतु',
    referrerName: 'आपका नाम (रेफरर) *',
    referrerPhone: 'आपका मोबाइल *',
    referrerOrg: 'सामुदायिक संस्था',
    candidateName: 'उम्मीदवार का नाम *',
    candidatePhone: 'उम्मीदवार का मोबाइल *',
    submitReferral: 'रेफरल जमा करें',
    referralSuccess: 'रेफरल सफलतापूर्वक दर्ज किया गया!',
    referralSuccessSub: 'हमारे ग्रामीण समन्वयक उम्मीदवार और स्थानीय नियोक्ताओं से शीघ्र संपर्क करेंगे।',

    // Footer
    footerMission: 'पारदर्शी एआई कौशल मिलान, सुगम यात्रा और करियर विकास के साथ ग्रामीण युवाओं एवं छोटे व्यवसायों को सशक्त बनाना।',
    footerHackathon: 'हैककल्चर वैश्विक हैकथॉन हेतु निर्मित',
    footerZeroFee: '100% निःशुल्क गारंटी — ग्रामीण युवाओं से कोई आवेदन शुल्क नहीं लिया जाता।',
    footerPrivacy: 'गोपनीयता सर्वोपरि: उम्मीदवारों के सटीक घर के पते सुरक्षित रखे जाते हैं।',
    footerHelpline: 'टोल-फ्री हेल्पलाइन: 1800-RURAL-AI',
    footerCopyright: '© 2026 रूरल कनेक्ट एआई। समावेशी ग्रामीण रोजगार पारिस्थितिकी तंत्र।',
    footerDignity: 'ग्रामीण सशक्तिकरण एवं स्थानीय आर्थिक स्वाभिमान हेतु समर्पित।'
  }
};

// Comprehensive Dynamic Content Translation Helpers
export const DYNAMIC_TRANSLATIONS = {
  categories: {
    'Electrical & Repair': {
      en: 'Electrical & Repair',
      kn: 'ವಿದ್ಯುತ್ ಮತ್ತು ದುರಸ್ತಿ',
      hi: 'इलेक्ट्रिकल एवं मरम्मत'
    },
    'Agriculture': {
      en: 'Agriculture',
      kn: 'ಕೃಷಿ ಮತ್ತು ಕೊಯ್ಲು',
      hi: 'कृषि एवं फसल कटाई'
    },
    'Retail': {
      en: 'Retail & Supermarket',
      kn: 'ಚಿಲ್ಲರೆ ಅಂಗಡಿ ಮತ್ತು ಬಿಲ್ಲಿಂಗ್',
      hi: 'खुदरा एवं स्टोर बिलिंग'
    },
    'Delivery & Logistics': {
      en: 'Delivery & Logistics',
      kn: 'ಡೆಲಿವರಿ ಮತ್ತು ಸಾರಿಗೆ',
      hi: 'वितरण एवं लॉजिस्टिक्स'
    },
    'Office & Computer': {
      en: 'Office & Computer',
      kn: 'ಕಂಪ್ಯೂಟರ್ ಮತ್ತು ಕಚೇರಿ',
      hi: 'कार्यालय एवं कंप्यूटर'
    },
    'Workshop & Services': {
      en: 'Workshop & Services',
      kn: 'ವರ್ಕ್‌ಶಾಪ್ ಮತ್ತು ಸೇವೆಗಳು',
      hi: 'वर्कशॉप एवं सेवाएं'
    },
    'Construction & Plumbing': {
      en: 'Construction & Plumbing',
      kn: 'ನಿರ್ಮಾಣ ಮತ್ತು ಪ್ಲಂಬಿಂಗ್',
      hi: 'निर्माण एवं प्लंबिंग'
    }
  },
  jobTypes: {
    'full-time': { en: 'Full-Time', kn: 'ಪೂರ್ಣಾವಧಿ', hi: 'पूर्णकालिक' },
    'part-time': { en: 'Part-Time', kn: 'ಅರೆಕಾಲಿಕ', hi: 'अंशकालिक' },
    'seasonal': { en: 'Seasonal / Micro-Gig', kn: 'ಸೀಸನಲ್ ಮೈಕ್ರೋ-ಗಿಗ್', hi: 'मौसमी माइक्रो-गिग' },
    'temporary': { en: 'Temporary', kn: 'ತಾತ್ಕಾಲಿಕ', hi: 'अस्थायी' },
    'apprenticeship': { en: 'Apprenticeship', kn: 'ಅಪ್ರೆಂಟಿಸ್‌ಶಿಪ್', hi: 'अप्रेंटिसशिप' }
  },
  skills: {
    'electrical repair': { en: 'Electrical Repair', kn: 'ವಿದ್ಯುತ್ ಉಪಕರಣ ದುರಸ್ತಿ', hi: 'इलेक्ट्रिकल रिपेयरिंग' },
    'wiring': { en: 'Wiring', kn: 'ವೈರಿಂಗ್ ಜೋಡಣೆ', hi: 'घरेलू वायरिंग' },
    'appliance repair': { en: 'Appliance Repair', kn: 'ಗೃಹೋಪಯೋಗಿ ವಸ್ತು ದುರಸ್ತಿ', hi: 'उपकरण मरम्मत' },
    'motor winding': { en: 'Motor Winding', kn: 'ಮೋಟರ್ ವೈಂಡಿಂಗ್', hi: 'मोटर वाइंडिंग' },
    'data entry': { en: 'Data Entry', kn: 'ಡೇಟಾ ಎಂಟ್ರಿ', hi: 'डेटा एंट्री' },
    'spreadsheet basics': { en: 'Spreadsheet Basics', kn: 'ಎಕ್ಸೆಲ್ ಸ್ಪ್ರೆಡ್‌ಶೀಟ್', hi: 'एक्सेल स्प्रेडशीट' },
    'retail sales': { en: 'Retail Sales', kn: 'ಚಿಲ್ಲರೆ ಮಾರಾಟ', hi: 'स्टोर सेल्स' },
    'billing': { en: 'Billing & POS', kn: 'ಬಿಲ್ಲಿಂಗ್ (POS)', hi: 'बिलिंग एवं पीओएस' },
    'tractor driving': { en: 'Tractor Driving', kn: 'ಟ್ರ್ಯಾಕ್ಟರ್ ಚಾಲನೆ', hi: 'ट्रैक्टर ड्राइविंग' },
    'farm equipment': { en: 'Farm Equipment', kn: 'ಕೃಷಿ ಉಪಕರಣ ನಿರ್ವಹಣೆ', hi: 'कृषि उपकरण संचालन' },
    'dairy farming': { en: 'Dairy Farming', kn: 'ಡೈರಿ ಮತ್ತು ಹೈನುಗಾರಿಕೆ', hi: 'डेयरी फार्मिंग' },
    'tailoring': { en: 'Tailoring & Stitching', kn: 'ಟೈಲರಿಂಗ್ ಮತ್ತು ಹೊಲಿಗೆ', hi: 'सिलाई एवं टेलरिंग' },
    'plumbing': { en: 'Plumbing', kn: 'ಪ್ಲಂಬಿಂಗ್ ಮತ್ತು ಪೈಪ್ ಫಿಟ್ಟಿಂಗ್', hi: 'प्लंबिंग एवं पाइप फिटिंग' },
    'pipe fitting': { en: 'Pipe Fitting', kn: 'ಪೈಪ್ ಫಿಟ್ಟಿಂಗ್', hi: 'पाइप फिटिंग' },
    'water pump repair': { en: 'Water Pump Repair', kn: 'ನೀರಿನ ಪಂಪ್ ದುರಸ್ತಿ', hi: 'वाटर पंप मरम्मत' },
    'solar installation': { en: 'Solar PV Installation', kn: 'ಸೌರ ಫಲಕ ಅಳವಡಿಕೆ', hi: 'सोलर पैनल इंस्टालेशन' },
    'customer handling': { en: 'Customer Handling', kn: 'ಗ್ರಾಹಕ ನಿರ್ವಹಣೆ', hi: 'ग्राहक सेवा' },
    'circuit testing': { en: 'Circuit Testing', kn: 'ಸರ್ಕ್ಯೂಟ್ ಪರೀಕ್ಷೆ', hi: 'सर्किट टेस्टिंग' }
  },
  statuses: {
    'applied': { en: 'Application Submitted', kn: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ', hi: 'आवेदन भेजा गया' },
    'received': { en: 'Received by Employer', kn: 'ಮಾಲೀಕರಿಗೆ ತಲುಪಿದೆ', hi: 'नियोक्ता को प्राप्त हुआ' },
    'under_review': { en: 'Under Review', kn: 'ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ', hi: 'समीक्षाधीन' },
    'shortlisted': { en: 'Shortlisted for Trial 🎉', kn: 'ಟ್ರಯಲ್ ಪರೀಕ್ಷೆಗೆ ಆಯ್ಕೆಯಾಗಿದೆ 🎉', hi: 'ट्रायल हेतु चयनित 🎉' },
    'interview_scheduled': { en: 'Interview Scheduled 📅', kn: 'ಸಂದರ್ಶನ ನಿಗದಿಯಾಗಿದೆ 📅', hi: 'इंटरव्यू तय हुआ 📅' },
    'selected': { en: 'Hired / Placed 🏆', kn: 'ಕೆಲಸಕ್ಕೆ ಆಯ್ಕೆಯಾಗಿದ್ದೀರಿ! 🏆', hi: 'नौकरी मिल गई! 🏆' },
    'rejected': { en: 'Not Selected', kn: 'ಆಯ್ಕೆಯಾಗಿಲ್ಲ', hi: 'चयन नहीं हुआ' },
    'withdrawn': { en: 'Withdrawn', kn: 'ಹಿಂಪಡೆಯಲಾಗಿದೆ', hi: 'वापस लिया गया' }
  },
  districts: {
    'Dakshina Kannada': { en: 'Dakshina Kannada', kn: 'ದಕ್ಷಿಣ ಕನ್ನಡ', hi: 'दक्षिण कन्नड़' },
    'Shivamogga': { en: 'Shivamogga', kn: 'ಶಿವಮೊಗ್ಗ', hi: 'शिवमोग्गा' },
    'Mandya': { en: 'Mandya', kn: 'ಮಂಡ್ಯ', hi: 'मांड्या' },
    'Uttara Kannada': { en: 'Uttara Kannada', kn: 'ಉತ್ತರ ಕನ್ನಡ', hi: 'उत्तर कन्नड़' },
    'Udupi': { en: 'Udupi', kn: 'ಉಡುಪಿ', hi: 'उडुपी' },
    'Belagavi': { en: 'Belagavi', kn: 'ಬೆಳಗಾವಿ', hi: 'बेलगावी' },
    'Hassan': { en: 'Hassan', kn: 'ಹಾಸನ', hi: 'हासन' }
  }
};

export const LanguageProvider = ({ children }) => {
  // Read persisted language preference from localStorage, default to 'en'
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('rc_language');
      if (saved && (saved === 'en' || saved === 'kn' || saved === 'hi')) {
        return saved;
      }
    } catch (e) {}
    return 'en';
  });

  const setLang = (newLang) => {
    if (newLang === 'en' || newLang === 'kn' || newLang === 'hi') {
      setLangState(newLang);
      try {
        localStorage.setItem('rc_language', newLang);
      } catch (e) {}
    }
  };

  const t = (key, fallback = '') => {
    return translations[lang]?.[key] || translations['en']?.[key] || fallback || key;
  };

  // Helper for translating job category
  const getCategoryLabel = (category) => {
    if (!category) return '';
    return DYNAMIC_TRANSLATIONS.categories[category]?.[lang] || category;
  };

  // Helper for translating job type
  const getJobTypeLabel = (jobType) => {
    if (!jobType) return '';
    const norm = jobType.toLowerCase();
    return DYNAMIC_TRANSLATIONS.jobTypes[norm]?.[lang] || jobType.toUpperCase();
  };

  // Helper for translating skill names
  const getSkillLabel = (skillName) => {
    if (!skillName) return '';
    const norm = skillName.toLowerCase().trim();
    return DYNAMIC_TRANSLATIONS.skills[norm]?.[lang] || skillName;
  };

  // Helper for translating status
  const getStatusLabel = (status) => {
    if (!status) return '';
    return DYNAMIC_TRANSLATIONS.statuses[status]?.[lang] || status.replace('_', ' ');
  };

  // Helper for translating district
  const getDistrictLabel = (district) => {
    if (!district) return '';
    return DYNAMIC_TRANSLATIONS.districts[district]?.[lang] || district;
  };

  // Helper for dynamic Job Title
  const getJobTitle = (job) => {
    if (!job) return '';
    if (lang === 'kn' && job.title_kannada) return job.title_kannada;
    if (lang === 'hi' && job.title_hindi) return job.title_hindi;
    return job.title;
  };

  // Voice synthesis (Web Speech API) supporting en-IN, kn-IN, hi-IN
  const speakText = (text, customLang = lang) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (customLang === 'kn') utterance.lang = 'kn-IN';
      else if (customLang === 'hi') utterance.lang = 'hi-IN';
      else utterance.lang = 'en-IN';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <LanguageContext.Provider value={{
      lang,
      setLang,
      t,
      getCategoryLabel,
      getJobTypeLabel,
      getSkillLabel,
      getStatusLabel,
      getDistrictLabel,
      getJobTitle,
      speakText
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
