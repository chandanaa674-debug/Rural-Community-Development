/**
 * RuralConnect • Rural Employment Connect Platform
 * Trilingual System (EN, KN, HI), Working LocalStorage Jobs Engine, Filter & Direct Contact
 */

document.addEventListener('DOMContentLoaded', () => {

  // ================= 1. TRILINGUAL DICTIONARY =================
  const translations = {
    // Brand
    brand_name: {
      en: "RuralConnect",
      kn: "ರೂರಲ್‌ಕನೆಕ್ಟ್",
      hi: "रूरलकनेक्ट"
    },
    brand_sub: {
      en: "Local Employment Bridge",
      kn: "ಸ್ಥಳೀಯ ಉದ್ಯೋಗ ಸೇತು",
      hi: "स्थानीय रोजगार सेतु"
    },

    // Navigation
    nav_home: {
      en: "Home",
      kn: "ಮುಖಪುಟ",
      hi: "मुखपृष्ठ"
    },
    nav_jobs: {
      en: "Find Jobs",
      kn: "ಉದ್ಯೋಗ ಹುಡುಕಿ",
      hi: "नौकरी खोजें"
    },
    nav_hire: {
      en: "Hire Workers",
      kn: "ಕೆಲಸಗಾರರನ್ನು ನೇಮಿಸಿ",
      hi: "कामगार खोजें"
    },
    nav_how: {
      en: "How It Works",
      kn: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
      hi: "यह कैसे काम करता है"
    },
    nav_about: {
      en: "About Us",
      kn: "ನಮ್ಮ ಬಗ್ಗೆ",
      hi: "हमारे बारे में"
    },
    nav_contact: {
      en: "Contact",
      kn: "ಸಂಪರ್ಕ",
      hi: "संपर्क"
    },

    // Hero Section
    hero_badge: {
      en: "Local Talent • Right Opportunities",
      kn: "ಸ್ಥಳೀಯ ಪ್ರತಿಭೆ • ನೈಜ ಅವಕಾಶ",
      hi: "स्थानीय प्रतिभा • सही अवसर"
    },
    hero_title: {
      en: '"Rural youth cannot find work that fits, and small employers cannot find them."',
      kn: '"ಗ್ರಾಮೀಣ ಯುವಕರಿಗೆ ಸೂಕ್ತವಾದ ಕೆಲಸ ಸಿಗುತ್ತಿಲ್ಲ, ಮತ್ತು ಸಣ್ಣ ಉದ್ಯೋಗದಾತರಿಗೆ ಬೇಕಾದ ಕೆಲಸಗಾರರು ಸಿಗುತ್ತಿಲ್ಲ."',
      hi: '"ग्रामीण युवाओं को मनमुताबिक काम नहीं मिल रहा, और छोटे नियोक्ताओं को जरूरी कामगार नहीं मिल रहे।"'
    },
    hero_desc: {
      en: "We connect rural talent with local employment opportunities, helping young people find suitable work and small employers discover the workers they need.",
      kn: "ನಾವು ಗ್ರಾಮೀಣ ಪ್ರತಿಭೆಗಳನ್ನು ಸ್ಥಳೀಯ ಉದ್ಯೋಗಾವಕಾಶಗಳೊಂದಿಗೆ ಜೋಡಿಸುತ್ತೇವೆ. ಯುವಕರಿಗೆ ಯೋಗ್ಯ ಕೆಲಸ ಮತ್ತು ಸಣ್ಣ ಉದ್ಯಮಗಳಿಗೆ ಸೂಕ್ತ ಕೆಲಸಗಾರರನ್ನು ಸುಲಭವಾಗಿ ತಲುಪಿಸುತ್ತೇವೆ.",
      hi: "हम ग्रामीण प्रतिभाओं को स्थानीय रोजगार अवसरों से जोड़ते हैं, जिससे युवाओं को उपयुक्त काम और छोटे नियोक्ताओं को कुशल कामगार मिल सकें।"
    },
    hero_btn_find_job: {
      en: "Find a Job",
      kn: "ಉದ್ಯೋಗ ಹುಡುಕಿ",
      hi: "नौकरी खोजें"
    },
    hero_btn_hire: {
      en: "Hire Workers",
      kn: "ಕೆಲಸಗಾರರನ್ನು ನೇಮಿಸಿ",
      hi: "कामगार खोजें"
    },
    aud_1_title: {
      en: "For Rural Youth",
      kn: "ಗ್ರಾಮೀಣ ಯುವಕರಿಗಾಗಿ",
      hi: "ग्रामीण युवाओं के लिए"
    },
    aud_1_desc: {
      en: "Discover verified jobs near your village",
      kn: "ನಿಮ್ಮ ಊರಿನ ಹತ್ತಿರದ ಕೆಲಸಗಳನ್ನು ಕಂಡುಕೊಳ್ಳಿ",
      hi: "अपने गांव के पास सत्यापित काम खोजें"
    },
    aud_2_title: {
      en: "For Small Employers",
      kn: "ಸಣ್ಣ ಉದ್ಯೋಗದಾತರಿಗಾಗಿ",
      hi: "छोटे नियोक्ताओं के लिए"
    },
    aud_2_desc: {
      en: "Reach skilled local workers in minutes",
      kn: "ಕೆಲವೇ ನಿಮಿಷಗಳಲ್ಲಿ ಸ್ಥಳೀಯ ಕೆಲಸಗಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ",
      hi: "मिनटों में स्थानीय कामगारों से संपर्क करें"
    },
    hero_tag: {
      en: "Livelihoods in Villages",
      kn: "ಗ್ರಾಮಗಳಲ್ಲೇ ಉದ್ಯೋಗ",
      hi: "गांव में ही आजीविका"
    },
    hero_caption: {
      en: "Fostering dignity and fair wages within our home communities.",
      kn: "ನಮ್ಮ ಊರಿನಲ್ಲೇ ಗೌರವಾನ್ವಿತ ಜೀವನ ಮತ್ತು ಯೋಗ್ಯ ವೇತನ.",
      hi: "अपने गांव और परिवार के पास ही सम्मानजनक आजीविका।"
    },

    // Jobs Section
    jobs_tag: {
      en: "For Rural Youth",
      kn: "ಗ್ರಾಮೀಣ ಯುವಕರಿಗಾಗಿ",
      hi: "ग्रामीण युवाओं के लिए"
    },
    jobs_title: {
      en: "Available Local Jobs",
      kn: "ಲಭ್ಯವಿರುವ ಸ್ಥಳೀಯ ಉದ್ಯೋಗಗಳು",
      hi: "उपलब्ध स्थानीय नौकरियां"
    },
    jobs_subtitle: {
      en: "Browse verified opportunities from workshops, farms, shops, and small enterprises in nearby taluks.",
      kn: "ಹತ್ತಿರದ ತಾಲೂಕುಗಳ ಕಾರ್ಯಾಗಾರಗಳು, ಕೃಷಿ ಫಾರ್ಮ್‌ಗಳು ಮತ್ತು ಅಂಗಡಿಗಳಿಂದ ಉದ್ಯೋಗಾವಕಾಶಗಳು.",
      hi: "आसपास के तालुकों की वर्कशॉप, दुकानों, खेतों और लघु उद्योगों में उपलब्ध काम।"
    },
    filter_loc_lbl: {
      en: "Filter by Location:",
      kn: "ಸ್ಥಳದ ಪ್ರಕಾರ ಫಿಲ್ಟರ್ ಮಾಡಿ:",
      hi: "स्थान अनुसार चुनें:"
    },
    filter_type_lbl: {
      en: "Filter by Job Type:",
      kn: "ಕೆಲಸದ ಪ್ರಕಾರ:",
      hi: "काम के प्रकार अनुसार:"
    },
    filter_all_locations: {
      en: "All Locations",
      kn: "ಎಲ್ಲಾ ಸ್ಥಳಗಳು",
      hi: "सभी स्थान"
    },
    filter_all_types: {
      en: "All Job Types",
      kn: "ಎಲ್ಲಾ ಪ್ರಕಾರಗಳು",
      hi: "सभी प्रकार"
    },
    opt_fulltime: {
      en: "Full-time",
      kn: "ಪೂರ್ಣಾವಧಿ",
      hi: "पूर्णकालिक"
    },
    opt_parttime: {
      en: "Part-time",
      kn: "ಅರೆಕಾಲಿಕ",
      hi: "अंशकालिक"
    },
    opt_dailywage: {
      en: "Daily Wage",
      kn: "ದಿನಗೂಲಿ",
      hi: "दैनिक मजदूरी"
    },
    btn_contact_emp: {
      en: "Contact Employer",
      kn: "ಉದ್ಯೋಗದಾತರನ್ನು ಸಂಪರ್ಕಿಸಿ",
      hi: "नियोक्ता से संपर्क करें"
    },
    no_jobs_found: {
      en: "No jobs match your selected filters. Try choosing 'All Locations' or 'All Job Types'.",
      kn: "ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಫಿಲ್ಟರ್‌ಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುವ ಉದ್ಯೋಗಗಳಿಲ್ಲ. 'ಎಲ್ಲಾ ಸ್ಥಳಗಳು' ಆಯ್ಕೆಮಾಡಿ.",
      hi: "आपके चुने हुए फिल्टर के अनुसार कोई नौकरी नहीं मिली। कृपया 'सभी स्थान' चुनें।"
    },
    badge_new: {
      en: "Recently Added",
      kn: "ಹೊಸದಾಗಿ ಸೇರಿಸಲಾಗಿದೆ",
      hi: "हाल ही में जोड़ी गई"
    },

    // Hire Workers Section
    hire_tag: {
      en: "For Small Employers",
      kn: "ಸಣ್ಣ ಉದ್ಯೋಗದಾತರಿಗಾಗಿ",
      hi: "छोटे नियोक्ताओं के लिए"
    },
    hire_title: {
      en: "Hire Workers From Nearby Villages",
      kn: "ಹತ್ತಿರದ ಹಳ್ಳಿಗಳಿಂದ ಕೆಲಸಗಾರರನ್ನು ನೇಮಿಸಿ",
      hi: "पास के गांवों से कामगार खोजें"
    },
    hire_subtitle: {
      en: "Post your job opening in 2 minutes. Your vacancy will be immediately visible to local youth.",
      kn: "ಕೇವಲ 2 ನಿಮಿಷಗಳಲ್ಲಿ ನಿಮ್ಮ ಉದ್ಯೋಗಾವಕಾಶವನ್ನು ಪ್ರಕಟಿಸಿ. ಇದು ತಕ್ಷಣವೇ ಸ್ಥಳೀಯ ಯುವಕರಿಗೆ ಗೋಚರಿಸುತ್ತದೆ.",
      hi: "2 मिनट में अपनी जरूरत पोस्ट करें। आपका पद तुरंत स्थानीय युवाओं को दिखने लगेगा।"
    },
    form_emp_name: {
      en: "Employer Name *",
      kn: "ಉದ್ಯೋಗದಾತರ ಹೆಸರು *",
      hi: "नियोक्ता का नाम *"
    },
    ph_emp_name: {
      en: "e.g. Venkatesh Prabhu",
      kn: "ಉದಾ: ವೆಂಕಟೇಶ್ ಪ್ರಭು",
      hi: "उदा. वेंकटेश प्रभु"
    },
    form_biz_name: {
      en: "Business / Farm Name (Optional)",
      kn: "ಉದ್ಯಮ / ಫಾರ್ಮ್ ಹೆಸರು (ಐಚ್ಛಿಕ)",
      hi: "व्यवसाय / फार्म का नाम (वैकल्पिक)"
    },
    ph_biz_name: {
      en: "e.g. Shree Krishna Electrical Works",
      kn: "ಉದಾ: ಶ್ರೀ ಕೃಷ್ಣ ಎಲೆಕ್ಟ್ರಿಕಲ್ಸ್",
      hi: "उदा. श्री कृष्णा इलेक्ट्रिकल्स"
    },
    form_job_title: {
      en: "Job Title *",
      kn: "ಉದ್ಯೋಗದ ಶೀರ್ಷಿಕೆ *",
      hi: "काम का नाम / पद *"
    },
    ph_job_title: {
      en: "e.g. Electrical Workshop Assistant",
      kn: "ಉದಾ: ಎಲೆಕ್ಟ್ರಿಕಲ್ ಸಹಾಯಕರ ಕೆಲಸ",
      hi: "उदा. इलेक्ट्रिकल वर्कशॉप हेल्पर"
    },
    form_job_loc: {
      en: "Location (Village / Taluk) *",
      kn: "ಸ್ಥಳ (ಗ್ರಾಮ / ತಾಲೂಕು) *",
      hi: "स्थान (गांव / तालुका) *"
    },
    ph_job_loc: {
      en: "e.g. Bantwal, Dakshina Kannada",
      kn: "ಉದಾ: ಬಂಟ್ವಾಳ, ದಕ್ಷಿಣ ಕನ್ನಡ",
      hi: "उदा. बंटवाल, दक्षिण कन्नड़"
    },
    form_job_type: {
      en: "Job Type *",
      kn: "ಉದ್ಯೋಗದ ಪ್ರಕಾರ *",
      hi: "काम का प्रकार *"
    },
    form_job_salary: {
      en: "Salary or Payment Details *",
      kn: "ವೇತನ ಅಥವಾ ದಿನಗೂಲಿ ವಿವರ *",
      hi: "वेतन या मजदूरी विवरण *"
    },
    ph_job_salary: {
      en: "e.g. ₹12,000 / month or ₹450 / day",
      kn: "ಉದಾ: ₹12,000 / ತಿಂಗಳಿಗೆ ಅಥವಾ ₹450 / ದಿನಕ್ಕೆ",
      hi: "उदा. ₹12,000 / माह या ₹450 / दिन"
    },
    form_job_skills: {
      en: "Required Skills (Comma separated) *",
      kn: "ಅಗತ್ಯವಿರುವ ಕೌಶಲ್ಯಗಳು *",
      hi: "आवश्यक हुनर / कौशल *"
    },
    ph_job_skills: {
      en: "e.g. Wiring, Household Appliance Repair, Tool Handling",
      kn: "ಉದಾ: ವೈರಿಂಗ್, ಉಪಕರಣ ರಿಪೇರಿ, ಉಪಕರಣಗಳ ಬಳಕೆ",
      hi: "उदा. वायरिंग, पंखा-मोटर रिपेयर, औजार चलाना"
    },
    form_job_contact: {
      en: "Contact Phone Number or Email *",
      kn: "ಸಂಪರ್ಕ ದೂರವಾಣಿ ಅಥವಾ ಇಮೇಲ್ *",
      hi: "संपर्क मोबाइल नंबर या ईमेल *"
    },
    ph_job_contact: {
      en: "e.g. 9845012345 or contact@example.com",
      kn: "ಉದಾ: 9845012345 ಅಥವಾ contact@example.com",
      hi: "उदा. 9845012345 या contact@example.com"
    },
    form_job_desc: {
      en: "Job Description *",
      kn: "ಕೆಲಸದ ವಿವರಣೆ *",
      hi: "काम का संक्षिप्त विवरण *"
    },
    ph_job_desc: {
      en: "Briefly describe what the worker will do and working hours...",
      kn: "ಕೆಲಸದ ಸ್ವರೂಪ ಮತ್ತು ಸಮಯದ ಬಗ್ಗೆ ಸಂಕ್ಷಿಪ್ತವಾಗಿ ಬರೆಯಿರಿ...",
      hi: "काम के प्रकार और समय के बारे में संक्षेप में लिखें..."
    },
    btn_post_job: {
      en: "Post Job Opportunity",
      kn: "ಉದ್ಯೋಗಾವಕಾಶ ಪ್ರಕಟಿಸಿ",
      hi: "नौकरी पोस्ट करें"
    },
    err_emp_name: {
      en: "Please enter your name.",
      kn: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",
      hi: "कृपया अपना नाम दर्ज करें।"
    },
    err_job_title: {
      en: "Please enter a job title.",
      kn: "ದಯವಿಟ್ಟು ಉದ್ಯೋಗದ ಶೀರ್ಷಿಕೆಯನ್ನು ನಮೂದಿಸಿ.",
      hi: "कृपया काम का नाम दर्ज करें।"
    },
    err_job_loc: {
      en: "Please enter the job location.",
      kn: "ದಯವಿಟ್ಟು ಕೆಲಸದ ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ.",
      hi: "कृपया काम का स्थान दर्ज करें।"
    },
    err_job_salary: {
      en: "Please specify the payment or wage.",
      kn: "ದಯವಿಟ್ಟು ವೇತನ ಅಥವಾ ದಿನಗೂಲಿ ನಮೂದಿಸಿ.",
      hi: "कृपया वेतन या मजदूरी दर्ज करें।"
    },
    err_job_skills: {
      en: "Please enter the required skills.",
      kn: "ದಯವಿಟ್ಟು ಅಗತ್ಯವಿರುವ ಕೌಶಲ್ಯಗಳನ್ನು ನಮೂದಿಸಿ.",
      hi: "कृपया आवश्यक हुनर दर्ज करें।"
    },
    err_job_contact: {
      en: "Please provide a valid 10-digit phone number or email.",
      kn: "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ 10-ಅಂಕಿಯ ಫೋನ್ ನಂಬರ್ ಅಥವಾ ಇಮೇಲ್ ನೀಡಿ.",
      hi: "कृपया वैध 10-अंकों का मोबाइल नंबर या ईमेल दर्ज करें।"
    },
    err_job_desc: {
      en: "Please write a brief description of the job.",
      kn: "ದಯವಿಟ್ಟು ಕೆಲಸದ ಬಗ್ಗೆ ಸಂಕ್ಷಿಪ್ತ ವಿವರಣೆ ನೀಡಿ.",
      hi: "कृपया काम का विवरण लिखें।"
    },
    post_success_msg: {
      en: "Job posted successfully! Your listing has been saved and is now live in the 'Find Jobs' section above.",
      kn: "ಉದ್ಯೋಗ ಯಶಸ್ವಿಯಾಗಿ ಪ್ರಕಟವಾಗಿದೆ! ನಿಮ್ಮ ಪ್ರಕಟಣೆಯು ಮೇಲಿನ 'ಉದ್ಯೋಗ ಹುಡುಕಿ' ಪಟ್ಟಿಯಲ್ಲಿ ತಕ್ಷಣವೇ ಕಾಣಿಸುತ್ತಿದೆ.",
      hi: "नौकरी सफलतापूर्वक पोस्ट हो गई है! आपका पद ऊपर 'नौकरी खोजें' सूची में तुरंत जोड़ दिया गया है।"
    },

    // How It Works Section
    how_tag: {
      en: "Simple Process",
      kn: "ಸರಳ ಹಂತಗಳು",
      hi: "आसान प्रक्रिया"
    },
    how_title: {
      en: "How RuralConnect Works",
      kn: "ರೂರಲ್‌ಕನೆಕ್ಟ್ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
      hi: "रूरलकनेक्ट कैसे काम करता है"
    },
    how_subtitle: {
      en: "A straightforward process designed for simplicity with no middle-agents and zero application fees.",
      kn: "ಯಾವುದೇ ದಲ್ಲಾಳಿಗಳಿಲ್ಲದೆ ಮತ್ತು ಉಚಿತವಾಗಿ ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸುವ ಪಾರದರ್ಶಕ ವ್ಯವಸ್ಥೆ.",
      hi: "बिना किसी बिचौलिए और बिना किसी शुल्क के सीधी और आसान प्रक्रिया।"
    },
    how_youth_title: {
      en: "For Job Seekers (Rural Youth)",
      kn: "ಉದ್ಯೋಗಾಕಾಂಕ್ಷಿಗಳಿಗೆ (ಗ್ರಾಮೀಣ ಯುವಕರು)",
      hi: "काम की तलाश करने वालों के लिए"
    },
    step_y1_title: {
      en: "1. Explore local jobs",
      kn: "೧. ಸ್ಥಳೀಯ ಉದ್ಯೋಗಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
      hi: "1. स्थानीय नौकरियां देखें"
    },
    step_y1_desc: {
      en: "Browse vacancies near your village or taluk by location and job type.",
      kn: "ನಿಮ್ಮ ತಾಲೂಕು ಅಥವಾ ಗ್ರಾಮದ ಹತ್ತಿರದ ಉದ್ಯೋಗಾವಕಾಶಗಳನ್ನು ಸುಲಭವಾಗಿ ನೋಡಿ.",
      hi: "अपने गांव या पास के कस्बे में उपलब्ध काम स्थान अनुसार देखें।"
    },
    step_y2_title: {
      en: "2. Find work matching your skills",
      kn: "೨. ನಿಮ್ಮ ಕೌಶಲ್ಯಕ್ಕೆ ತಕ್ಕ ಕೆಲಸ ಆರಿಸಿ",
      hi: "2. अपने हुनर अनुसार काम चुनें"
    },
    step_y2_desc: {
      en: "Check the required practical skills like wiring, driving, farming, or store handling.",
      kn: "ವೈರಿಂಗ್, ಡ್ರೈವಿಂಗ್, ಕೃಷಿ ಅಥವಾ ಅಂಗಡಿ ಕೆಲಸಗಳಂತಹ ನಿಮ್ಮ ಪ್ರಾಯೋಗಿಕ ಜ್ಞಾನಕ್ಕೆ ಸರಿಹೊಂದುವ ಕೆಲಸ ನೋಡಿ.",
      hi: "वायरिंग, ट्रैक्टर ड्राइविंग, खेती या दुकानदारी जैसे अपने हुनर के अनुसार अवसर चुनें।"
    },
    step_y3_title: {
      en: "3. Contact the employer directly",
      kn: "೩. ಉದ್ಯೋಗದಾತರನ್ನು ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ",
      hi: "3. नियोक्ता से सीधे बात करें"
    },
    step_y3_desc: {
      en: "Click 'Contact Employer' to view their phone number and call immediately.",
      kn: "'ಉದ್ಯೋಗದಾತರನ್ನು ಸಂಪರ್ಕಿಸಿ' ಕ್ಲಿಕ್ ಮಾಡಿ ಫೋನ್ ನಂಬರ್ ಪಡೆದು ನೇರವಾಗಿ ಮಾತನಾಡಿ.",
      hi: "'नियोक्ता से संपर्क करें' पर क्लिक कर सीधे फोन नंबर देखकर बात करें।"
    },
    how_emp_title: {
      en: "For Small Employers (Local MSMEs)",
      kn: "ಸಣ್ಣ ಉದ್ಯೋಗದಾತರಿಗೆ (ಸ್ಥಳೀಯ ಉದ್ಯಮಗಳು)",
      hi: "छोटे नियोक्ताओं के लिए"
    },
    step_e1_title: {
      en: "1. Share your job requirement",
      kn: "೧. ನಿಮ್ಮ ಉದ್ಯೋಗದ ಅಗತ್ಯವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ",
      hi: "1. अपनी जरूरत साझा करें"
    },
    step_e1_desc: {
      en: "Fill out the simple job posting form with salary, location, and required skills.",
      kn: "ಸ್ಥಳ, ವೇತನ ಮತ್ತು ಅಗತ್ಯವಿರುವ ಕೌಶಲ್ಯಗಳೊಂದಿಗೆ ಸರಳ ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ.",
      hi: "वेतन, स्थान और जरूरी हुनर के साथ सरल फॉर्म भरें।"
    },
    step_e2_title: {
      en: "2. Reach nearby rural talent",
      kn: "೨. ಹತ್ತಿರದ ಗ್ರಾಮೀಣ ಪ್ರತಿಭೆಗಳಿಗೆ ತಲುಪಿ",
      hi: "2. पास के युवाओं तक पहुंचें"
    },
    step_e2_desc: {
      en: "Your listing becomes instantly visible to youth looking for work in your area.",
      kn: "ನಿಮ್ಮ ಭಾಗದಲ್ಲಿ ಕೆಲಸ ಹುಡುಕುತ್ತಿರುವ ಯುವಕರಿಗೆ ನಿಮ್ಮ ಪ್ರಕಟಣೆ ತಕ್ಷಣ ಕಾಣಿಸುತ್ತದೆ.",
      hi: "आपके आसपास काम तलाश रहे युवाओं को आपका पद तुरंत दिखने लगेगा।"
    },
    step_e3_title: {
      en: "3. Find suitable workers",
      kn: "೩. ಸೂಕ್ತ ಕೆಲಸಗಾರರನ್ನು ನೇಮಿಸಿ",
      hi: "3. सही कामगार पाएं"
    },
    step_e3_desc: {
      en: "Speak with interested applicants directly and hire capable local hands quickly.",
      kn: "ಆಸಕ್ತ ಅಭ್ಯರ್ಥಿಗಳೊಂದಿಗೆ ನೇರವಾಗಿ ಮಾತನಾಡಿ ಶೀಘ್ರವಾಗಿ ವಿಶ್ವಾಸಾರ್ಹ ಕೆಲಸಗಾರರನ್ನು ಪಡೆಯಿರಿ.",
      hi: "सीधे बात कर सक्षम और भरोसेमंद स्थानीय कामगारों को तुरंत काम पर रखें।"
    },

    // About Us Section
    about_tag: {
      en: "Our Purpose",
      kn: "ನಮ್ಮ ಧ್ಯೇಯ",
      hi: "हमारा उद्देश्य"
    },
    about_title: {
      en: "Bridging the Rural Employment Divide",
      kn: "ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಅಂತರವನ್ನು ಕಡಿಮೆ ಮಾಡುವುದು",
      hi: "ग्रामीण रोजगार की खाई को पाटना"
    },
    about_subtitle: {
      en: "Why we created RuralConnect and how it benefits village communities.",
      kn: "ನಾವು ರೂರಲ್‌ಕನೆಕ್ಟ್ ಅನ್ನು ಏಕೆ ರೂಪಿಸಿದ್ದೇವೆ ಮತ್ತು ಇದು ಗ್ರಾಮೀಣ ಭಾಗಕ್ಕೆ ಹೇಗೆ ಸಹಕಾರಿ.",
      hi: "रूरलकनेक्ट क्यों बनाया गया और यह ग्रामीण समुदाय को कैसे लाभ पहुंचाता है।"
    },
    ab_1_title: {
      en: "The Rural Employment Problem",
      kn: "ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಸಮಸ್ಯೆ",
      hi: "ग्रामीण रोजगार की समस्या"
    },
    ab_1_desc: {
      en: "In most rural areas, young people are forced to leave their homes for faraway cities because they don't know who is hiring nearby. At the same time, local workshop owners, farmers, and retailers struggle for weeks to find reliable workers.",
      kn: "ಹಳ್ಳಿಗಳಲ್ಲಿ ಕೆಲಸದ ಮಾಹಿತಿ ಸಿಗದೆ ಯುವಕರು ದೂರದ ನಗರಗಳಿಗೆ ವಲಸೆ ಹೋಗಬೇಕಾಗುತ್ತದೆ. ಅದೇ ವೇಳೆಗೆ ಸ್ಥಳೀಯ ವರ್ಕ್‌ಶಾಪ್, ಅಂಗಡಿ ಮತ್ತು ಕೃಷಿ ಮಾಲೀಕರಿಗೆ ವಿಶ್ವಾಸಾರ್ಹ ಕೆಲಸಗಾರರು ಸುಲಭವಾಗಿ ಸಿಗುವುದಿಲ್ಲ.",
      hi: "गांवों में जानकारी के अभाव में युवाओं को शहरों की ओर पलायन करना पड़ता है। दूसरी ओर, स्थानीय वर्कशॉप, किसानों और दुकानदारों को कामगार ढूंढने में हफ्तों लग जाते हैं।"
    },
    ab_2_title: {
      en: "Why This Platform Exists",
      kn: "ಈ ವೇದಿಕೆಯ ಮಹತ್ವ",
      hi: "यह मंच क्यों बनाया गया"
    },
    ab_2_desc: {
      en: "Traditional job portals are built for urban college graduates with English resumes. RuralConnect was created to be simple, accessible, and practical—valuing hands-on craftsmanship and direct local connections without resumes or fees.",
      kn: "ಇಂಗ್ಲಿಷ್ ರೆಸ್ಯೂಮ್‌ಗಳಿಲ್ಲದೆ, ಪ್ರಾಯೋಗಿಕ ಕೈಕೆಲಸ ಮತ್ತು ಕೌಶಲ್ಯಗಳಿಗೆ ಬೆಲೆ ಕೊಟ್ಟು ಯಾವುದೇ ಶುಲ್ಕವಿಲ್ಲದೆ ನೇರ ಸಂಪರ್ಕ ಕಲ್ಪಿಸುವುದು ನಮ್ಮ ಉದ್ದೇಶ.",
      hi: "पारंपरिक जॉब पोर्टल केवल अंग्रेजी रिज्यूमे वालों के लिए बने हैं। रूरलकनेक्ट को सादगी और बिना किसी रिज्यूमे के सीधे फोन कॉल से काम दिलाने हेतु बनाया गया है।"
    },
    ab_3_title: {
      en: "How It Helps Both Groups",
      kn: "ಎರಡೂ ಕಡೆಯವರಿಗೆ ಹೇಗೆ ಲಾಭ?",
      hi: "दोनों पक्षों को क्या लाभ है?"
    },
    ab_3_desc: {
      en: "Rural youth find dignified livelihood opportunities near their families, reducing distress migration. Small businesses fill urgent vacancies quickly with trustworthy neighbors, strengthening the local rural economy.",
      kn: "ಯುವಕರು ಮನೆಯ ಹತ್ತಿರವೇ ಗೌರವಯುತ ಆದಾಯ ಗಳಿಸುತ್ತಾರೆ ಮತ್ತು ಸಣ್ಣ ವ್ಯಾಪಾರಿಗಳಿಗೆ ನಂಬಿಕಸ್ಥ ಕೆಲಸಗಾರರು ತಕ್ಷಣ ಸಿಗುತ್ತಾರೆ.",
      hi: "युवाओं को अपने घर के पास सम्मानजनक कमाई मिलती है और छोटे व्यापारियों को भरोसेमंद स्थानीय मददगार मिलते हैं।"
    },

    // Contact Section
    contact_tag: {
      en: "Assistance",
      kn: "ಸಹಾಯ",
      hi: "सहायता"
    },
    contact_title: {
      en: "Contact RuralConnect",
      kn: "ರೂರಲ್‌ಕನೆಕ್ಟ್ ಸಂಪರ್ಕ ಕೇಂದ್ರ",
      hi: "रूरलकनेक्ट संपर्क केंद्र"
    },
    contact_subtitle: {
      en: "Need help posting a job or finding work? Reach out to our community support desk.",
      kn: "ಉದ್ಯೋಗ ಪ್ರಕಟಿಸಲು ಅಥವಾ ಕೆಲಸ ಹುಡುಕಲು ಸಹಾಯ ಬೇಕೇ? ನಮ್ಮ ಸಮುದಾಯ ಕೇಂದ್ರವನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      hi: "नौकरी पोस्ट करने या काम ढूंढने में कोई परेशानी हो तो हमारे सहायता केंद्र से संपर्क करें।"
    },
    c_info_title: {
      en: "Community Helpdesk",
      kn: "ಸಮುದಾಯ ಸಹಾಯವಾಣಿ",
      hi: "सामुदायिक हेल्पलाइन"
    },
    c_info_desc: {
      en: "We assist village youth and small business owners with publishing opportunities and answering questions.",
      kn: "ನಾವು ಗ್ರಾಮೀಣ ಯುವಕರು ಮತ್ತು ಸಣ್ಣ ಉದ್ಯಮದಾರರಿಗೆ ಉದ್ಯೋಗ ಮಾಹಿತಿ ಪಡೆಯಲು ಸಹಕರಿಸುತ್ತೇವೆ.",
      hi: "हम ग्रामीण युवाओं और छोटे व्यापारियों को निःशुल्क सहायता प्रदान करते हैं।"
    },
    c_loc_lbl: {
      en: "Community Center",
      kn: "ಕೇಂದ್ರ ವಿಳಾಸ",
      hi: "केंद्र का पता"
    },
    c_loc_val: {
      en: "Gram Panchayat Complex, Bantwal Taluk, Karnataka 574211",
      kn: "ಗ್ರಾಮ ಪಂಚಾಯತಿ ಆವರಣ, ಬಂಟ್ವಾಳ ತಾಲೂಕು, ಕರ್ನಾಟಕ 574211",
      hi: "ग्राम पंचायत परिसर, बंटवाल तालुका, कर्नाटक 574211"
    },
    c_phone_lbl: {
      en: "Helpline Number",
      kn: "ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆ",
      hi: "हेल्पलाइन नंबर"
    },
    c_mail_lbl: {
      en: "Email Address",
      kn: "ಇಮೇಲ್ ವಿಳಾಸ",
      hi: "ईमेल पता"
    },
    c_hours_lbl: {
      en: "Support Hours",
      kn: "ಕೆಲಸದ ಸಮಯ",
      hi: "सहायता समय"
    },
    c_hours_val: {
      en: "Monday to Saturday: 9:00 AM – 5:00 PM",
      kn: "ಸೋಮವಾರದಿಂದ ಶನಿವಾರ: ಬೆಳಗ್ಗೆ 9:00 – ಸಂಜೆ 5:00",
      hi: "सोमवार से शनिवार: प्रातः 9:00 – सायं 5:00"
    },
    free_guarantee: {
      en: "100% Free Service: RuralConnect never charges fees to job seekers or small employers.",
      kn: "೧೦೦% ಉಚಿತ ಸೇವೆ: ರೂರಲ್‌ಕನೆಕ್ಟ್ ಉದ್ಯೋಗಾಕಾಂಕ್ಷಿಗಳಿಂದಾಗಲಿ ಅಥವಾ ಸಣ್ಣ ಉದ್ಯೋಗದಾತರಿಂದಾಗಲಿ ಯಾವುದೇ ಶುಲ್ಕ ಪಡೆಯುವುದಿಲ್ಲ.",
      hi: "100% निःशुल्क सेवा: रूरलकनेक्ट कभी भी किसी कामगार या नियोक्ता से कोई शुल्क नहीं लेता।"
    },
    c_form_title: {
      en: "Send Us a Question",
      kn: "ಪ್ರಶ್ನೆ ಅಥವಾ ಸಲಹೆ ಕಳುಹಿಸಿ",
      hi: "कोई प्रश्न या सुझाव भेजें"
    },
    c_form_name: {
      en: "Your Name *",
      kn: "ನಿಮ್ಮ ಹೆಸರು *",
      hi: "आपका नाम *"
    },
    ph_c_name: {
      en: "e.g. Praveen Kumar",
      kn: "ಉದಾ: ಪ್ರವೀಣ್ ಕುಮಾರ್",
      hi: "उदा. प्रवीण कुमार"
    },
    c_form_phone: {
      en: "Phone Number or Email *",
      kn: "ದೂರವಾಣಿ ಅಥವಾ ಇಮೇಲ್ *",
      hi: "फ़ोन नंबर या ईमेल *"
    },
    ph_c_phone: {
      en: "e.g. 9845012345",
      kn: "ಉದಾ: 9845012345",
      hi: "उदा. 9845012345"
    },
    c_form_msg: {
      en: "Your Question or Inquiry *",
      kn: "ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಅಥವಾ ಸಂದೇಶ *",
      hi: "आपका प्रश्न या संदेश *"
    },
    ph_c_msg: {
      en: "Tell us what help you need...",
      kn: "ನಿಮಗೆ ಯಾವ ಸಹಾಯ ಬೇಕು ಎಂದು ಬರೆಯಿರಿ...",
      hi: "बताएं कि आपको क्या मदद चाहिए..."
    },
    btn_send_inquiry: {
      en: "Send Inquiry",
      kn: "ವಿಚಾರಣೆ ಕಳುಹಿಸಿ",
      hi: "संदेश भेजें"
    },
    err_c_name: {
      en: "Please enter your name.",
      kn: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",
      hi: "कृपया अपना नाम दर्ज करें।"
    },
    err_c_phone: {
      en: "Please enter a valid phone number or email.",
      kn: "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಫೋನ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.",
      hi: "कृपया वैध मोबाइल नंबर दर्ज करें।"
    },
    err_c_msg: {
      en: "Please write your message.",
      kn: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಬರೆಯಿರಿ.",
      hi: "कृपया अपना संदेश लिखें।"
    },
    c_success_msg: {
      en: "Thank you, {name}! Your inquiry has been received. Our community desk will assist you.",
      kn: "ಧನ್ಯವಾದಗಳು {name}! ನಿಮ್ಮ ವಿಚಾರಣೆ ತಲುಪಿದೆ. ನಮ್ಮ ಸಮುದಾಯ ಕೇಂದ್ರವು ನಿಮಗೆ ಶೀಘ್ರದಲ್ಲೇ ನೆರವಾಗಲಿದೆ.",
      hi: "धन्यवाद {name}! आपका प्रश्न प्राप्त हो गया है। हमारा सहायता केंद्र जल्द ही आपसे संपर्क करेगा।"
    },

    // Modal Strings
    modal_badge: {
      en: "Direct Employer Contact",
      kn: "ಉದ್ಯೋಗದಾತರ ನೇರ ಸಂಪರ್ಕ",
      hi: "नियोक्ता का सीधा संपर्क"
    },
    m_loc_lbl: {
      en: "Location:",
      kn: "ಸ್ಥಳ:",
      hi: "स्थान:"
    },
    m_pay_lbl: {
      en: "Payment / Wage:",
      kn: "ವೇತನ / ದಿನಗೂಲಿ:",
      hi: "वेतन / मजदूरी:"
    },
    m_type_lbl: {
      en: "Job Type:",
      kn: "ಪ್ರಕಾರ:",
      hi: "प्रकार:"
    },
    modal_call_prompt: {
      en: "Call or message this employer directly to discuss this opportunity:",
      kn: "ಈ ಕೆಲಸದ ಬಗ್ಗೆ ಮಾತನಾಡಲು ಈ ಉದ್ಯೋಗದಾತರಿಗೆ ನೇರವಾಗಿ ಕರೆ ಮಾಡಿ:",
      hi: "इस काम के बारे में बात करने के लिए नियोक्ता को सीधे कॉल करें:"
    },
    modal_note: {
      en: "No resume needed. Mention your practical skills and availability when calling.",
      kn: "ರೆಸ್ಯೂಮ್ ಅಗತ್ಯವಿಲ್ಲ. ಕರೆ ಮಾಡುವಾಗ ನಿಮ್ಮ ಕೌಶಲ್ಯ ಮತ್ತು ಕೆಲಸಕ್ಕೆ ಬರುವ ಸಮಯ ತಿಳಿಸಿ.",
      hi: "किसी रिज्यूमे की आवश्यकता नहीं है। बात करते समय अपने हुनर और समय की जानकारी दें।"
    },
    btn_close: {
      en: "Close",
      kn: "ಮುಚ್ಚಿ",
      hi: "बंद करें"
    },

    // Footer
    footer_tagline: {
      en: "Connecting rural youth with local employment opportunities and small employers with nearby workers.",
      kn: "ಗ್ರಾಮೀಣ ಯುವಕರಿಗೆ ಸ್ಥಳೀಯ ಕೆಲಸ ಮತ್ತು ಸಣ್ಣ ಉದ್ಯೋಗದಾತರಿಗೆ ಸಮೀಪದ ಕೆಲಸಗಾರರನ್ನು ಜೋಡಿಸುವ ಸರಳ ವೇದಿಕೆ.",
      hi: "ग्रामीण युवाओं को स्थानीय काम और छोटे नियोक्ताओं को आसपास के कामगार दिलाने वाला सरल मंच।"
    },
    footer_copy: {
      en: "© 2026 RuralConnect Platform • Solving rural employment with simplicity and dignity.",
      kn: "© 2026 ರೂರಲ್‌ಕನೆಕ್ಟ್ ವೇದಿಕೆ • ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಸಮಸ್ಯೆಗೆ ಸರಳ ಹಾಗೂ ಗೌರವಾನ್ವಿತ ಪರಿಹಾರ.",
      hi: "© 2026 रूरलकनेक्ट प्लेटफॉर्म • ग्रामीण रोजगार की समस्या का सादगी भरा समाधान।"
    }
  };

  // ================= 2. INITIAL REALISTIC RURAL JOBS SEED =================
  const initialSeedJobs = [
    {
      id: "rc-job-1",
      title: "Solar Pump & Inverter Technician",
      employer: "Venkatesh Prabhu",
      business: "Malnad Green Energy Solutions",
      location: "Shivamogga",
      salary: "₹14,000 – ₹18,000 / month",
      type: "Full-time",
      skills: ["Solar Wiring", "Inverter Basics", "Electrical Maintenance"],
      contact: "+91 98451 23456",
      desc: "Assist with installing rooftop solar lights, troubleshooting agricultural solar water pumps, and domestic inverter wiring in surrounding villages.",
      isNew: false
    },
    {
      id: "rc-job-2",
      title: "Dairy Farm Assistant & Milking Operator",
      employer: "Ramegowda",
      business: "Cauvery Dairy Farmers Collective",
      location: "Mandya",
      salary: "₹450 – ₹550 / day",
      type: "Daily Wage",
      skills: ["Dairy Cattle Care", "Milking Machine", "Fodder Handling"],
      contact: "+91 97410 87654",
      desc: "Daily morning and evening milking, livestock feeding, shed sanitation, and milk delivery coordination at the local cooperative dairy society.",
      isNew: false
    },
    {
      id: "rc-job-3",
      title: "Electrical Workshop Trainee & Assistant",
      employer: "Narayana Acharya",
      business: "Shree Krishna Electrical Works",
      location: "Bantwal",
      salary: "₹11,000 – ₹14,000 / month",
      type: "Full-time",
      skills: ["Household Wiring", "Appliance Repair", "Tool Handling"],
      contact: "+91 94482 11223",
      desc: "Assist senior electrician with domestic house wiring, ceiling fan rewinding, water pump motor starter repairs, and field service visits.",
      isNew: false
    },
    {
      id: "rc-job-4",
      title: "Tractor Driver & Farm Equipment Operator",
      employer: "Shantappa Patil",
      business: "Annapurna Agro Services",
      location: "Belagavi",
      salary: "₹15,000 – ₹19,000 / month",
      type: "Full-time",
      skills: ["Tractor Driving (License)", "Ploughing", "Basic Engine Care"],
      contact: "+91 96112 33445",
      desc: "Operating 45HP tractor for field levelling, rotavator ploughing, and seasonal crop transport across sugarcane and grain farms.",
      isNew: false
    },
    {
      id: "rc-job-5",
      title: "Village Retail Store & Billing Assistant",
      employer: "Suresh Pai",
      business: "Sri Manjunatha General Stores",
      location: "Udupi",
      salary: "₹7,500 – ₹9,500 / month",
      type: "Part-time",
      skills: ["Basic Math", "Customer Service", "Stock Arranging"],
      contact: "+91 98801 44556",
      desc: "Evening shift (3 PM to 9 PM) handling customer billing, grocery inventory shelf stocking, and local delivery orders.",
      isNew: false
    },
    {
      id: "rc-job-6",
      title: "Handloom Weaving & Tailoring Craftsman",
      employer: "Annapoorna Bhat",
      business: "Sahyadri Village Artisans Cooperative",
      location: "Sirsi",
      salary: "₹400 – ₹500 / day",
      type: "Daily Wage",
      skills: ["Handloom Weaving", "Garment Stitching", "Finishing"],
      contact: "+91 94803 55667",
      desc: "Traditional cotton towel and dhoti weaving, yarn spinning, and basic cloth border stitching for cooperative exhibitions.",
      isNew: false
    }
  ];

  // Load jobs from localStorage or seed
  const getStoredJobs = () => {
    try {
      const stored = localStorage.getItem('ruralconnect_jobs');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('LocalStorage read error', e);
    }
    // Save seed initially
    localStorage.setItem('ruralconnect_jobs', JSON.stringify(initialSeedJobs));
    return initialSeedJobs;
  };

  let allJobs = getStoredJobs();

  // ================= 3. LANGUAGE SWITCHER STATE =================
  let currentLang = localStorage.getItem('ruralconnect_lang') || 'en';

  const applyLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem('ruralconnect_lang', lang);
    document.documentElement.lang = lang;

    // Update active button state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Translate all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key] && translations[key][lang]) {
        el.textContent = translations[key][lang];
      }
    });

    // Translate all input placeholders with data-i18n-ph
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (translations[key] && translations[key][lang]) {
        el.placeholder = translations[key][lang];
      }
    });

    // Re-render job cards to update localized badges & buttons
    renderJobs();
  };

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLanguage(btn.dataset.lang);
    });
  });


  // ================= 4. RENDER JOB LISTINGS & FILTERS =================
  const jobsContainer = document.getElementById('jobsContainer');
  const filterLocation = document.getElementById('filterLocation');
  const filterType = document.getElementById('filterType');
  const noJobsMsg = document.getElementById('noJobsMsg');

  const renderJobs = () => {
    if (!jobsContainer) return;

    const locFilter = filterLocation ? filterLocation.value : 'all';
    const typeFilter = filterType ? filterType.value : 'all';

    const filtered = allJobs.filter(job => {
      const matchLoc = (locFilter === 'all') || job.location.toLowerCase().includes(locFilter.toLowerCase());
      const matchType = (typeFilter === 'all') || (job.type.toLowerCase() === typeFilter.toLowerCase());
      return matchLoc && matchType;
    });

    jobsContainer.innerHTML = '';

    if (filtered.length === 0) {
      noJobsMsg.classList.remove('hidden');
      return;
    } else {
      noJobsMsg.classList.add('hidden');
    }

    filtered.forEach(job => {
      const card = document.createElement('article');
      card.className = 'job-card';

      // Badge class
      const badgeClass = job.type === 'Full-time' 
        ? 'badge-fulltime' 
        : job.type === 'Part-time' 
        ? 'badge-parttime' 
        : 'badge-dailywage';

      // Localized type
      let typeLabel = job.type;
      if (job.type === 'Full-time') typeLabel = translations.opt_fulltime[currentLang];
      else if (job.type === 'Part-time') typeLabel = translations.opt_parttime[currentLang];
      else if (job.type === 'Daily Wage') typeLabel = translations.opt_dailywage[currentLang];

      const contactBtnText = translations.btn_contact_emp[currentLang];
      const newBadge = job.isNew 
        ? `<span class="job-badge" style="background:#d4edda; color:#155724; border:1px solid #c3e6cb; margin-bottom:4px; display:inline-block;">★ ${translations.badge_new[currentLang]}</span>` 
        : '';

      const skillsHTML = job.skills.map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('');

      card.innerHTML = `
        <div>
          ${newBadge}
          <div class="job-card-header">
            <h3 class="job-title">${escapeHtml(job.title)}</h3>
            <span class="job-badge ${badgeClass}">${escapeHtml(typeLabel)}</span>
          </div>

          <div class="job-biz-name">${escapeHtml(job.business || job.employer)}</div>
          
          <div class="job-location">
            <span>📍</span>
            <span>${escapeHtml(job.location)}</span>
          </div>

          <div class="job-salary-box">
            <strong>${escapeHtml(job.salary)}</strong>
          </div>

          <p style="font-size: 0.88rem; color: #555e54; margin-bottom: 12px; line-height: 1.5;">
            ${escapeHtml(job.desc || '')}
          </p>

          <div class="job-skills">
            ${skillsHTML}
          </div>
        </div>

        <button type="button" class="btn btn-primary job-action-btn" data-job-id="${job.id}">
          <span>📞</span>
          <span style="margin-left: 6px;">${contactBtnText}</span>
        </button>
      `;

      // Bind contact button
      const contactBtn = card.querySelector('.job-action-btn');
      contactBtn.addEventListener('click', () => {
        openContactModal(job);
      });

      jobsContainer.appendChild(card);
    });
  };

  if (filterLocation) filterLocation.addEventListener('change', renderJobs);
  if (filterType) filterType.addEventListener('change', renderJobs);


  // ================= 5. DIRECT EMPLOYER CONTACT MODAL =================
  const contactModal = document.getElementById('contactModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalDoneBtn = document.getElementById('modalDoneBtn');

  const modalJobTitle = document.getElementById('modalJobTitle');
  const modalBizName = document.getElementById('modalBizName');
  const modalLocation = document.getElementById('modalLocation');
  const modalSalary = document.getElementById('modalSalary');
  const modalType = document.getElementById('modalType');
  const modalPhone = document.getElementById('modalPhone');

  const openContactModal = (job) => {
    if (!contactModal) return;

    let typeLabel = job.type;
    if (job.type === 'Full-time') typeLabel = translations.opt_fulltime[currentLang];
    else if (job.type === 'Part-time') typeLabel = translations.opt_parttime[currentLang];
    else if (job.type === 'Daily Wage') typeLabel = translations.opt_dailywage[currentLang];

    modalJobTitle.textContent = job.title;
    modalBizName.textContent = job.business ? `${job.business} (Owner: ${job.employer})` : job.employer;
    modalLocation.textContent = job.location;
    modalSalary.textContent = job.salary;
    modalType.textContent = typeLabel;
    modalPhone.textContent = job.contact;

    contactModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeContactModal = () => {
    if (contactModal) {
      contactModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeContactModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeContactModal);
  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) closeContactModal();
    });
  }


  // ================= 6. HIRE WORKERS (POST JOB) WITH WORKING STORAGE =================
  const postJobForm = document.getElementById('postJobForm');
  const postFeedback = document.getElementById('postFeedback');

  if (postJobForm) {
    postJobForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const empName = document.getElementById('empName');
      const bizName = document.getElementById('bizName');
      const jobTitle = document.getElementById('jobTitle');
      const jobLocation = document.getElementById('jobLocation');
      const jobType = document.getElementById('jobType');
      const jobSalary = document.getElementById('jobSalary');
      const jobSkills = document.getElementById('jobSkills');
      const jobContact = document.getElementById('jobContact');
      const jobDesc = document.getElementById('jobDesc');

      let isValid = true;

      // Validate required fields
      const validateField = (input) => {
        const group = input.parentElement;
        if (!input.value.trim()) {
          group.classList.add('has-error');
          isValid = false;
        } else {
          group.classList.remove('has-error');
        }
      };

      validateField(empName);
      validateField(jobTitle);
      validateField(jobLocation);
      validateField(jobSalary);
      validateField(jobSkills);
      validateField(jobContact);
      validateField(jobDesc);

      // Validate phone or email format
      const contactVal = jobContact.value.trim();
      const phoneRegex = /^[0-9]{10}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const cleanPhone = contactVal.replace(/[^0-9]/g, '');

      if (!contactVal || (!phoneRegex.test(cleanPhone) && !emailRegex.test(contactVal))) {
        jobContact.parentElement.classList.add('has-error');
        isValid = false;
      }

      if (!isValid) {
        postFeedback.classList.add('hidden');
        return;
      }

      // Parse skills array
      const skillsArray = jobSkills.value.split(',').map(s => s.trim()).filter(s => s.length > 0);

      const newJob = {
        id: 'rc-job-' + Date.now(),
        title: jobTitle.value.trim(),
        employer: empName.value.trim(),
        business: bizName.value.trim() || empName.value.trim(),
        location: jobLocation.value.trim(),
        type: jobType.value,
        salary: jobSalary.value.trim(),
        skills: skillsArray.length > 0 ? skillsArray : ['General Work'],
        contact: jobContact.value.trim(),
        desc: jobDesc.value.trim(),
        isNew: true
      };

      // Truly store in localStorage
      allJobs.unshift(newJob);
      try {
        localStorage.setItem('ruralconnect_jobs', JSON.stringify(allJobs));
      } catch (err) {
        console.error('Storage write error', err);
      }

      // Feedback message
      postFeedback.innerHTML = `
        <strong>✓ ${translations.post_success_msg[currentLang]}</strong>
        <div style="margin-top: 8px;">
          <a href="#jobs" style="text-decoration: underline; font-weight: bold; color: #1b5e20;">
            ${translations.nav_jobs[currentLang]} &rarr;
          </a>
        </div>
      `;
      postFeedback.className = 'form-feedback success';
      postFeedback.classList.remove('hidden');

      // Reset form
      postJobForm.reset();

      // Refresh job listings immediately so it appears live
      renderJobs();
    });
  }


  // ================= 7. HELP & CONTACT FORM =================
  const contactHelpForm = document.getElementById('contactHelpForm');
  const contactFeedback = document.getElementById('contactFeedback');

  if (contactHelpForm) {
    contactHelpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const cName = document.getElementById('cName');
      const cContact = document.getElementById('cContact');
      const cMessage = document.getElementById('cMessage');

      let isValid = true;
      const checkField = (input) => {
        const group = input.parentElement;
        if (!input.value.trim()) {
          group.classList.add('has-error');
          isValid = false;
        } else {
          group.classList.remove('has-error');
        }
      };

      checkField(cName);
      checkField(cContact);
      checkField(cMessage);

      if (!isValid) return;

      const nameVal = cName.value.trim();
      const msg = translations.c_success_msg[currentLang].replace('{name}', escapeHtml(nameVal));

      contactFeedback.innerHTML = `<strong>✓</strong> ${msg}`;
      contactFeedback.className = 'form-feedback success';
      contactFeedback.classList.remove('hidden');

      contactHelpForm.reset();
    });
  }


  // ================= 8. MOBILE MENU TOGGLE =================
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }


  // ================= 9. ACTIVE LINK HIGHLIGHTING ON SCROLL =================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });


  // ================= 10. UTILITIES =================
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // Initial load
  applyLanguage(currentLang);
  renderJobs();

});
