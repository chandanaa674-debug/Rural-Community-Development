import React, { useState, useEffect } from 'react';

// ================= TRILINGUAL DICTIONARY =================
const translations = {
  en: {
    brand_name: "RuralConnect",
    brand_sub: "Local Employment Bridge",
    nav_home: "Home",
    nav_jobs: "Find Jobs",
    nav_hire: "Hire Workers",
    nav_how: "How It Works",
    nav_about: "About Us",
    nav_contact: "Contact",

    // Hero
    hero_badge: "Local Talent • Right Opportunities",
    hero_title: '"Rural youth cannot find work that fits, and small employers cannot find them."',
    hero_desc: "We connect rural talent with local employment opportunities, helping young people find suitable work and small employers discover the workers they need.",
    hero_btn_find_job: "Find a Job",
    hero_btn_hire: "Hire Workers",
    aud_1_title: "For Rural Youth",
    aud_1_desc: "Discover verified jobs near your village",
    aud_2_title: "For Small Employers",
    aud_2_desc: "Reach skilled local workers in minutes",
    hero_tag: "Livelihoods in Villages",
    hero_caption: "Fostering dignity and fair wages within our home communities.",

    // Jobs
    jobs_tag: "For Rural Youth",
    jobs_title: "Available Local Jobs",
    jobs_subtitle: "Browse verified opportunities from workshops, farms, shops, and small enterprises in nearby taluks.",
    filter_loc_lbl: "Filter by Location:",
    filter_type_lbl: "Filter by Job Type:",
    filter_all_locations: "All Locations",
    filter_all_types: "All Job Types",
    opt_fulltime: "Full-time",
    opt_parttime: "Part-time",
    opt_dailywage: "Daily Wage",
    btn_contact_emp: "Contact Employer",
    no_jobs_found: "No jobs match your selected filters. Try choosing 'All Locations' or 'All Job Types'.",
    badge_new: "Recently Added",

    // Hire
    hire_tag: "For Small Employers",
    hire_title: "Hire Workers From Nearby Villages",
    hire_subtitle: "Post your job opening in 2 minutes. Your vacancy will be immediately visible to local youth.",
    form_emp_name: "Employer Name *",
    ph_emp_name: "e.g. Venkatesh Prabhu",
    form_biz_name: "Business / Farm Name (Optional)",
    ph_biz_name: "e.g. Shree Krishna Electrical Works",
    form_job_title: "Job Title *",
    ph_job_title: "e.g. Electrical Workshop Assistant",
    form_job_loc: "Location (Village / Taluk) *",
    ph_job_loc: "e.g. Bantwal, Dakshina Kannada",
    form_job_type: "Job Type *",
    form_job_salary: "Salary or Payment Details *",
    ph_job_salary: "e.g. ₹12,000 / month or ₹450 / day",
    form_job_skills: "Required Skills (Comma separated) *",
    ph_job_skills: "e.g. Wiring, Household Appliance Repair, Tool Handling",
    form_job_contact: "Contact Phone Number or Email *",
    ph_job_contact: "e.g. 9845012345 or contact@example.com",
    form_job_desc: "Job Description *",
    ph_job_desc: "Briefly describe what the worker will do and working hours...",
    btn_post_job: "Post Job Opportunity",
    err_emp_name: "Please enter your name.",
    err_job_title: "Please enter a job title.",
    err_job_loc: "Please enter the job location.",
    err_job_salary: "Please specify the payment or wage.",
    err_job_skills: "Please enter the required skills.",
    err_job_contact: "Please provide a valid 10-digit phone number or email.",
    err_job_desc: "Please write a brief description of the job.",
    post_success_msg: "Job posted successfully! Your listing has been saved and is now live in the 'Find Jobs' section above.",

    // How it works
    how_tag: "Simple Process",
    how_title: "How RuralConnect Works",
    how_subtitle: "A straightforward process designed for simplicity with no middle-agents and zero application fees.",
    how_youth_title: "For Job Seekers (Rural Youth)",
    step_y1_title: "1. Explore local jobs",
    step_y1_desc: "Browse vacancies near your village or taluk by location and job type.",
    step_y2_title: "2. Find work matching your skills",
    step_y2_desc: "Check the required practical skills like wiring, driving, farming, or store handling.",
    step_y3_title: "3. Contact the employer directly",
    step_y3_desc: "Click 'Contact Employer' to view their phone number and call immediately.",
    how_emp_title: "For Small Employers (Local MSMEs)",
    step_e1_title: "1. Share your job requirement",
    step_e1_desc: "Fill out the simple job posting form with salary, location, and required skills.",
    step_e2_title: "2. Reach nearby rural talent",
    step_e2_desc: "Your listing becomes instantly visible to youth looking for work in your area.",
    step_e3_title: "3. Find suitable workers",
    step_e3_desc: "Speak with interested applicants directly and hire capable local hands quickly.",

    // About
    about_tag: "Our Purpose",
    about_title: "Bridging the Rural Employment Divide",
    about_subtitle: "Why we created RuralConnect and how it benefits village communities.",
    ab_1_title: "The Rural Employment Problem",
    ab_1_desc: "In most rural areas, young people are forced to leave their homes for faraway cities because they don't know who is hiring nearby. At the same time, local workshop owners, farmers, and retailers struggle for weeks to find reliable workers.",
    ab_2_title: "Why This Platform Exists",
    ab_2_desc: "Traditional job portals are built for urban college graduates with English resumes. RuralConnect was created to be simple, accessible, and practical—valuing hands-on craftsmanship and direct local connections without resumes or fees.",
    ab_3_title: "How It Helps Both Groups",
    ab_3_desc: "Rural youth find dignified livelihood opportunities near their families, reducing distress migration. Small businesses fill urgent vacancies quickly with trustworthy neighbors, strengthening the local rural economy.",

    // Contact
    contact_tag: "Assistance",
    contact_title: "Contact RuralConnect",
    contact_subtitle: "Need help posting a job or finding work? Reach out to our community support desk.",
    c_info_title: "Community Helpdesk",
    c_info_desc: "We assist village youth and small business owners with publishing opportunities and answering questions.",
    c_loc_lbl: "Community Center",
    c_loc_val: "Gram Panchayat Complex, Bantwal Taluk, Karnataka 574211",
    c_phone_lbl: "Helpline Number",
    c_mail_lbl: "Email Address",
    c_hours_lbl: "Support Hours",
    c_hours_val: "Monday to Saturday: 9:00 AM – 5:00 PM",
    free_guarantee: "100% Free Service: RuralConnect never charges fees to job seekers or small employers.",
    c_form_title: "Send Us a Question",
    c_form_name: "Your Name *",
    ph_c_name: "e.g. Praveen Kumar",
    c_form_phone: "Phone Number or Email *",
    ph_c_phone: "e.g. 9845012345",
    c_form_msg: "Your Question or Inquiry *",
    ph_c_msg: "Tell us what help you need...",
    btn_send_inquiry: "Send Inquiry",
    err_c_name: "Please enter your name.",
    err_c_phone: "Please enter a valid phone number or email.",
    err_c_msg: "Please write your message.",
    c_success_msg: "Thank you, {name}! Your inquiry has been received. Our community desk will assist you.",

    // Modal
    modal_badge: "Direct Employer Contact",
    m_loc_lbl: "Location:",
    m_pay_lbl: "Payment / Wage:",
    m_type_lbl: "Job Type:",
    modal_call_prompt: "Call or message this employer directly to discuss this opportunity:",
    modal_note: "No resume needed. Mention your practical skills and availability when calling.",
    btn_close: "Close",

    // Footer
    footer_tagline: "Connecting rural youth with local employment opportunities and small employers with nearby workers.",
    footer_copy: "© 2026 RuralConnect Platform • Solving rural employment with simplicity and dignity."
  },

  kn: {
    brand_name: "ರೂರಲ್‌ಕನೆಕ್ಟ್",
    brand_sub: "ಸ್ಥಳೀಯ ಉದ್ಯೋಗ ಸೇತು",
    nav_home: "ಮುಖಪುಟ",
    nav_jobs: "ಉದ್ಯೋಗ ಹುಡುಕಿ",
    nav_hire: "ಕೆಲಸಗಾರರನ್ನು ನೇಮಿಸಿ",
    nav_how: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    nav_about: "ನಮ್ಮ ಬಗ್ಗೆ",
    nav_contact: "ಸಂಪರ್ಕ",

    // Hero
    hero_badge: "ಸ್ಥಳೀಯ ಪ್ರತಿಭೆ • ನೈಜ ಅವಕಾಶ",
    hero_title: '"ಗ್ರಾಮೀಣ ಯುವಕರಿಗೆ ಸೂಕ್ತವಾದ ಕೆಲಸ ಸಿಗುತ್ತಿಲ್ಲ, ಮತ್ತು ಸಣ್ಣ ಉದ್ಯೋಗದಾತರಿಗೆ ಬೇಕಾದ ಕೆಲಸಗಾರರು ಸಿಗುತ್ತಿಲ್ಲ."',
    hero_desc: "ನಾವು ಗ್ರಾಮೀಣ ಪ್ರತಿಭೆಗಳನ್ನು ಸ್ಥಳೀಯ ಉದ್ಯೋಗಾವಕಾಶಗಳೊಂದಿಗೆ ಜೋಡಿಸುತ್ತೇವೆ. ಯುವಕರಿಗೆ ಯೋಗ್ಯ ಕೆಲಸ ಮತ್ತು ಸಣ್ಣ ಉದ್ಯಮಗಳಿಗೆ ಸೂಕ್ತ ಕೆಲಸಗಾರರನ್ನು ಸುಲಭವಾಗಿ ತಲುಪಿಸುತ್ತೇವೆ.",
    hero_btn_find_job: "ಉದ್ಯೋಗ ಹುಡುಕಿ",
    hero_btn_hire: "ಕೆಲಸಗಾರರನ್ನು ನೇಮಿಸಿ",
    aud_1_title: "ಗ್ರಾಮೀಣ ಯುವಕರಿಗಾಗಿ",
    aud_1_desc: "ನಿಮ್ಮ ಊರಿನ ಹತ್ತಿರದ ಕೆಲಸಗಳನ್ನು ಕಂಡುಕೊಳ್ಳಿ",
    aud_2_title: "ಸಣ್ಣ ಉದ್ಯೋಗದಾತರಿಗಾಗಿ",
    aud_2_desc: "ಕೆಲವೇ ನಿಮಿಷಗಳಲ್ಲಿ ಸ್ಥಳೀಯ ಕೆಲಸಗಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ",
    hero_tag: "ಗ್ರಾಮಗಳಲ್ಲೇ ಉದ್ಯೋಗ",
    hero_caption: "ನಮ್ಮ ಊರಿನಲ್ಲೇ ಗೌರವಾನ್ವಿತ ಜೀವನ ಮತ್ತು ಯೋಗ್ಯ ವೇತನ.",

    // Jobs
    jobs_tag: "ಗ್ರಾಮೀಣ ಯುವಕರಿಗಾಗಿ",
    jobs_title: "ಲಭ್ಯವಿರುವ ಸ್ಥಳೀಯ ಉದ್ಯೋಗಗಳು",
    jobs_subtitle: "ಹತ್ತಿರದ ತಾಲೂಕುಗಳ ಕಾರ್ಯಾಗಾರಗಳು, ಕೃಷಿ ಫಾರ್ಮ್‌ಗಳು ಮತ್ತು ಅಂಗಡಿಗಳಿಂದ ಉದ್ಯೋಗಾವಕಾಶಗಳು.",
    filter_loc_lbl: "ಸ್ಥಳದ ಪ್ರಕಾರ ಫಿಲ್ಟರ್ ಮಾಡಿ:",
    filter_type_lbl: "ಕೆಲಸದ ಪ್ರಕಾರ:",
    filter_all_locations: "ಎಲ್ಲಾ ಸ್ಥಳಗಳು",
    filter_all_types: "ಎಲ್ಲಾ ಪ್ರಕಾರಗಳು",
    opt_fulltime: "ಪೂರ್ಣಾವಧಿ",
    opt_parttime: "ಅರೆಕಾಲಿಕ",
    opt_dailywage: "ದಿನಗೂಲಿ",
    btn_contact_emp: "ಉದ್ಯೋಗದಾತರನ್ನು ಸಂಪರ್ಕಿಸಿ",
    no_jobs_found: "ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಫಿಲ್ಟರ್‌ಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುವ ಉದ್ಯೋಗಗಳಿಲ್ಲ. 'ಎಲ್ಲಾ ಸ್ಥಳಗಳು' ಆಯ್ಕೆಮಾಡಿ.",
    badge_new: "ಹೊಸದಾಗಿ ಸೇರಿಸಲಾಗಿದೆ",

    // Hire
    hire_tag: "ಸಣ್ಣ ಉದ್ಯೋಗದಾತರಿಗಾಗಿ",
    hire_title: "ಹತ್ತಿರದ ಹಳ್ಳಿಗಳಿಂದ ಕೆಲಸಗಾರರನ್ನು ನೇಮಿಸಿ",
    hire_subtitle: "ಕೇವಲ 2 ನಿಮಿಷಗಳಲ್ಲಿ ನಿಮ್ಮ ಉದ್ಯೋಗಾವಕಾಶವನ್ನು ಪ್ರಕಟಿಸಿ. ಇದು ತಕ್ಷಣವೇ ಸ್ಥಳೀಯ ಯುವಕರಿಗೆ ಗೋಚರಿಸುತ್ತದೆ.",
    form_emp_name: "ಉದ್ಯೋಗದಾತರ ಹೆಸರು *",
    ph_emp_name: "ಉದಾ: ವೆಂಕಟೇಶ್ ಪ್ರಭು",
    form_biz_name: "ಉದ್ಯಮ / ಫಾರ್ಮ್ ಹೆಸರು (ಐಚ್ಛಿಕ)",
    ph_biz_name: "ಉದಾ: ಶ್ರೀ ಕೃಷ್ಣ ಎಲೆಕ್ಟ್ರಿಕಲ್ಸ್",
    form_job_title: "ಉದ್ಯೋಗದ ಶೀರ್ಷಿಕೆ *",
    ph_job_title: "ಉದಾ: ಎಲೆಕ್ಟ್ರಿಕಲ್ ಸಹಾಯಕರ ಕೆಲಸ",
    form_job_loc: "ಸ್ಥಳ (ಗ್ರಾಮ / ತಾಲೂಕು) *",
    ph_job_loc: "ಉದಾ: ಬಂಟ್ವಾಳ, ದಕ್ಷಿಣ ಕನ್ನಡ",
    form_job_type: "ಉದ್ಯೋಗದ ಪ್ರಕಾರ *",
    form_job_salary: "ವೇತನ ಅಥವಾ ದಿನಗೂಲಿ ವಿವರ *",
    ph_job_salary: "ಉದಾ: ₹12,000 / ತಿಂಗಳಿಗೆ ಅಥವಾ ₹450 / ದಿನಕ್ಕೆ",
    form_job_skills: "ಅಗತ್ಯವಿರುವ ಕೌಶಲ್ಯಗಳು *",
    ph_job_skills: "ಉದಾ: ವೈರಿಂಗ್, ಉಪಕರಣ ರಿಪೇರಿ, ಉಪಕರಣಗಳ ಬಳಕೆ",
    form_job_contact: "ಸಂಪರ್ಕ ದೂರವಾಣಿ ಅಥವಾ ಇಮೇಲ್ *",
    ph_job_contact: "ಉದಾ: 9845012345 ಅಥವಾ contact@example.com",
    form_job_desc: "ಕೆಲಸದ ವಿವರಣೆ *",
    ph_job_desc: "ಕೆಲಸದ ಸ್ವರೂಪ ಮತ್ತು ಸಮಯದ ಬಗ್ಗೆ ಸಂಕ್ಷಿಪ್ತವಾಗಿ ಬರೆಯಿರಿ...",
    btn_post_job: "ಉದ್ಯೋಗಾವಕಾಶ ಪ್ರಕಟಿಸಿ",
    err_emp_name: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",
    err_job_title: "ದಯವಿಟ್ಟು ಉದ್ಯೋಗದ ಶೀರ್ಷಿಕೆಯನ್ನು ನಮೂದಿಸಿ.",
    err_job_loc: "ದಯವಿಟ್ಟು ಕೆಲಸದ ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ.",
    err_job_salary: "ದಯವಿಟ್ಟು ವೇತನ ಅಥವಾ ದಿನಗೂಲಿ ನಮೂದಿಸಿ.",
    err_job_skills: "ದಯವಿಟ್ಟು ಅಗತ್ಯವಿರುವ ಕೌಶಲ್ಯಗಳನ್ನು ನಮೂದಿಸಿ.",
    err_job_contact: "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ 10-ಅಂಕಿಯ ಫೋನ್ ನಂಬರ್ ಅಥವಾ ಇಮೇಲ್ ನೀಡಿ.",
    err_job_desc: "ದಯವಿಟ್ಟು ಕೆಲಸದ ಬಗ್ಗೆ ಸಂಕ್ಷಿಪ್ತ ವಿವರಣೆ ನೀಡಿ.",
    post_success_msg: "ಉದ್ಯೋಗ ಯಶಸ್ವಿಯಾಗಿ ಪ್ರಕಟವಾಗಿದೆ! ನಿಮ್ಮ ಪ್ರಕಟಣೆಯು ಮೇಲಿನ 'ಉದ್ಯೋಗ ಹುಡುಕಿ' ಪಟ್ಟಿಯಲ್ಲಿ ತಕ್ಷಣವೇ ಕಾಣಿಸುತ್ತಿದೆ.",

    // How it works
    how_tag: "ಸರಳ ಹಂತಗಳು",
    how_title: "ರೂರಲ್‌ಕನೆಕ್ಟ್ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    how_subtitle: "ಯಾವುದೇ ದಲ್ಲಾಳಿಗಳಿಲ್ಲದೆ ಮತ್ತು ಉಚಿತವಾಗಿ ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸುವ ಪಾರದರ್ಶಕ ವ್ಯವಸ್ಥೆ.",
    how_youth_title: "ಉದ್ಯೋಗಾಕಾಂಕ್ಷಿಗಳಿಗೆ (ಗ್ರಾಮೀಣ ಯುವಕರು)",
    step_y1_title: "೧. ಸ್ಥಳೀಯ ಉದ್ಯೋಗಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
    step_y1_desc: "ನಿಮ್ಮ ತಾಲೂಕು ಅಥವಾ ಗ್ರಾಮದ ಹತ್ತಿರದ ಉದ್ಯೋಗಾವಕಾಶಗಳನ್ನು ಸುಲಭವಾಗಿ ನೋಡಿ.",
    step_y2_title: "೨. ನಿಮ್ಮ ಕೌಶಲ್ಯಕ್ಕೆ ತಕ್ಕ ಕೆಲಸ ಆರಿಸಿ",
    step_y2_desc: "ವೈರಿಂಗ್, ಡ್ರೈವಿಂಗ್, ಕೃಷಿ ಅಥವಾ ಅಂಗಡಿ ಕೆಲಸಗಳಂತಹ ನಿಮ್ಮ ಪ್ರಾಯೋಗಿಕ ಜ್ಞಾನಕ್ಕೆ ಸರಿಹೊಂದುವ ಕೆಲಸ ನೋಡಿ.",
    step_y3_title: "೩. ಉದ್ಯೋಗದಾತರನ್ನು ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ",
    step_y3_desc: "'ಉದ್ಯೋಗದಾತರನ್ನು ಸಂಪರ್ಕಿಸಿ' ಕ್ಲಿಕ್ ಮಾಡಿ ಫೋನ್ ನಂಬರ್ ಪಡೆದು ನೇರವಾಗಿ ಮಾತನಾಡಿ.",
    how_emp_title: "ಸಣ್ಣ ಉದ್ಯೋಗದಾತರಿಗೆ (ಸ್ಥಳೀಯ ಉದ್ಯಮಗಳು)",
    step_e1_title: "೧. ನಿಮ್ಮ ಉದ್ಯೋಗದ ಅಗತ್ಯವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ",
    step_e1_desc: "ಸ್ಥಳ, ವೇತನ ಮತ್ತು ಅಗತ್ಯವಿರುವ ಕೌಶಲ್ಯಗಳೊಂದಿಗೆ ಸರಳ ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ.",
    step_e2_title: "೨. ಹತ್ತಿರದ ಗ್ರಾಮೀಣ ಪ್ರತಿಭೆಗಳಿಗೆ ತಲುಪಿ",
    step_e2_desc: "ನಿಮ್ಮ ಭಾಗದಲ್ಲಿ ಕೆಲಸ ಹುಡುಕುತ್ತಿರುವ ಯುವಕರಿಗೆ ನಿಮ್ಮ ಪ್ರಕಟಣೆ ತಕ್ಷಣ ಕಾಣಿಸುತ್ತದೆ.",
    step_e3_title: "೩. ಸೂಕ್ತ ಕೆಲಸಗಾರರನ್ನು ನೇಮಿಸಿ",
    step_e3_desc: "ಆಸಕ್ತ ಅಭ್ಯರ್ಥಿಗಳೊಂದಿಗೆ ನೇರವಾಗಿ ಮಾತನಾಡಿ ಶೀಘ್ರವಾಗಿ ವಿಶ್ವಾಸಾರ್ಹ ಕೆಲಸಗಾರರನ್ನು ಪಡೆಯಿರಿ.",

    // About
    about_tag: "ನಮ್ಮ ಧ್ಯೇಯ",
    about_title: "ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಅಂತರವನ್ನು ಕಡಿಮೆ ಮಾಡುವುದು",
    about_subtitle: "ನಾವು ರೂರಲ್‌ಕನೆಕ್ಟ್ ಅನ್ನು ಏಕೆ ರೂಪಿಸಿದ್ದೇವೆ ಮತ್ತು ಇದು ಗ್ರಾಮೀಣ ಭಾಗಕ್ಕೆ ಹೇಗೆ ಸಹಕಾರಿ.",
    ab_1_title: "ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಸಮಸ್ಯೆ",
    ab_1_desc: "ಹಳ್ಳಿಗಳಲ್ಲಿ ಕೆಲಸದ ಮಾಹಿತಿ ಸಿಗದೆ ಯುವಕರು ದೂರದ ನಗರಗಳಿಗೆ ವಲಸೆ ಹೋಗಬೇಕಾಗುತ್ತದೆ. ಅದೇ ವೇಳೆಗೆ ಸ್ಥಳೀಯ ವರ್ಕ್‌ಶಾಪ್, ಅಂಗಡಿ ಮತ್ತು ಕೃಷಿ ಮಾಲೀಕರಿಗೆ ವಿಶ್ವಾಸಾರ್ಹ ಕೆಲಸಗಾರರು ಸುಲಭವಾಗಿ ಸಿಗುವುದಿಲ್ಲ.",
    ab_2_title: "ಈ ವೇದಿಕೆಯ ಮಹತ್ವ",
    ab_2_desc: "ಇಂಗ್ಲಿಷ್ ರೆಸ್ಯೂಮ್‌ಗಳಿಲ್ಲದೆ, ಪ್ರಾಯೋಗಿಕ ಕೈಕೆಲಸ ಮತ್ತು ಕೌಶಲ್ಯಗಳಿಗೆ ಬೆಲೆ ಕೊಟ್ಟು ಯಾವುದೇ ಶುಲ್ಕವಿಲ್ಲದೆ ನೇರ ಸಂಪರ್ಕ ಕಲ್ಪಿಸುವುದು ನಮ್ಮ ಉದ್ದೇಶ.",
    ab_3_title: "ಎರಡೂ ಕಡೆಯವರಿಗೆ ಹೇಗೆ ಲಾಭ?",
    ab_3_desc: "ಯುವಕರು ಮನೆಯ ಹತ್ತಿರವೇ ಗೌರವಯುತ ಆದಾಯ ಗಳಿಸುತ್ತಾರೆ ಮತ್ತು ಸಣ್ಣ ವ್ಯಾಪಾರಿಗಳಿಗೆ ನಂಬಿಕಸ್ಥ ಕೆಲಸಗಾರರು ತಕ್ಷಣ ಸಿಗುತ್ತಾರೆ.",

    // Contact
    contact_tag: "ಸಹಾಯ",
    contact_title: "ರೂರಲ್‌ಕನೆಕ್ಟ್ ಸಂಪರ್ಕ ಕೇಂದ್ರ",
    contact_subtitle: "ಉದ್ಯೋಗ ಪ್ರಕಟಿಸಲು ಅಥವಾ ಕೆಲಸ ಹುಡುಕಲು ಸಹಾಯ ಬೇಕೇ? ನಮ್ಮ ಸಮುದಾಯ ಕೇಂದ್ರವನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    c_info_title: "ಸಮುದಾಯ ಸಹಾಯವಾಣಿ",
    c_info_desc: "ನಾವು ಗ್ರಾಮೀಣ ಯುವಕರು ಮತ್ತು ಸಣ್ಣ ಉದ್ಯಮದಾರರಿಗೆ ಉದ್ಯೋಗ ಮಾಹಿತಿ ಪಡೆಯಲು ಸಹಕರಿಸುತ್ತೇವೆ.",
    c_loc_lbl: "ಕೇಂದ್ರ ವಿಳಾಸ",
    c_loc_val: "ಗ್ರಾಮ ಪಂಚಾಯತಿ ಆವರಣ, ಬಂಟ್ವಾಳ ತಾಲೂಕು, ಕರ್ನಾಟಕ 574211",
    c_phone_lbl: "ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆ",
    c_mail_lbl: "ಇಮೇಲ್ ವಿಳಾಸ",
    c_hours_lbl: "ಕೆಲಸದ ಸಮಯ",
    c_hours_val: "ಸೋಮವಾರದಿಂದ ಶನಿವಾರ: ಬೆಳಗ್ಗೆ 9:00 – ಸಂಜೆ 5:00",
    free_guarantee: "೧೦೦% ಉಚಿತ ಸೇವೆ: ರೂರಲ್‌ಕನೆಕ್ಟ್ ಉದ್ಯೋಗಾಕಾಂಕ್ಷಿಗಳಿಂದಾಗಲಿ ಅಥವಾ ಸಣ್ಣ ಉದ್ಯೋಗದಾತರಿಂದಾಗಲಿ ಯಾವುದೇ ಶುಲ್ಕ ಪಡೆಯುವುದಿಲ್ಲ.",
    c_form_title: "ಪ್ರಶ್ನೆ ಅಥವಾ ಸಲಹೆ ಕಳುಹಿಸಿ",
    c_form_name: "ನಿಮ್ಮ ಹೆಸರು *",
    ph_c_name: "ಉದಾ: ಪ್ರವೀಣ್ ಕುಮಾರ್",
    c_form_phone: "ದೂರವಾಣಿ ಅಥವಾ ಇಮೇಲ್ *",
    ph_c_phone: "ಉದಾ: 9845012345",
    c_form_msg: "ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಅಥವಾ ಸಂದೇಶ *",
    ph_c_msg: "ನಿಮಗೆ ಯಾವ ಸಹಾಯ ಬೇಕು ಎಂದು ಬರೆಯಿರಿ...",
    btn_send_inquiry: "ವಿಚಾರಣೆ ಕಳುಹಿಸಿ",
    err_c_name: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",
    err_c_phone: "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಫೋನ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.",
    err_c_msg: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಬರೆಯಿರಿ.",
    c_success_msg: "ಧನ್ಯವಾದಗಳು {name}! ನಿಮ್ಮ ವಿಚಾರಣೆ ತಲುಪಿದೆ. ನಮ್ಮ ಸಮುದಾಯ ಕೇಂದ್ರವು ನಿಮಗೆ ಶೀಘ್ರದಲ್ಲೇ ನೆರವಾಗಲಿದೆ.",

    // Modal
    modal_badge: "ಉದ್ಯೋಗದಾತರ ನೇರ ಸಂಪರ್ಕ",
    m_loc_lbl: "ಸ್ಥಳ:",
    m_pay_lbl: "ವೇತನ / ದಿನಗೂಲಿ:",
    m_type_lbl: "ಪ್ರಕಾರ:",
    modal_call_prompt: "ಈ ಕೆಲಸದ ಬಗ್ಗೆ ಮಾತನಾಡಲು ಈ ಉದ್ಯೋಗದಾತರಿಗೆ ನೇರವಾಗಿ ಕರೆ ಮಾಡಿ:",
    modal_note: "ರೆಸ್ಯೂಮ್ ಅಗತ್ಯವಿಲ್ಲ. ಕರೆ ಮಾಡುವಾಗ ನಿಮ್ಮ ಕೌಶಲ್ಯ ಮತ್ತು ಕೆಲಸಕ್ಕೆ ಬರುವ ಸಮಯ ತಿಳಿಸಿ.",
    btn_close: "ಮುಚ್ಚಿ",

    // Footer
    footer_tagline: "ಗ್ರಾಮೀಣ ಯುವಕರಿಗೆ ಸ್ಥಳೀಯ ಕೆಲಸ ಮತ್ತು ಸಣ್ಣ ಉದ್ಯೋಗದಾತರಿಗೆ ಸಮೀಪದ ಕೆಲಸಗಾರರನ್ನು ಜೋಡಿಸುವ ಸರಳ ವೇದಿಕೆ.",
    footer_copy: "© 2026 ರೂರಲ್‌ಕನೆಕ್ಟ್ ವೇದಿಕೆ • ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಸಮಸ್ಯೆಗೆ ಸರಳ ಹಾಗೂ ಗೌರವಾನ್ವಿತ ಪರಿಹಾರ."
  },

  hi: {
    brand_name: "रूरलकनेक्ट",
    brand_sub: "स्थानीय रोजगार सेतु",
    nav_home: "मुखपृष्ठ",
    nav_jobs: "नौकरी खोजें",
    nav_hire: "कामगार खोजें",
    nav_how: "यह कैसे काम करता है",
    nav_about: "हमारे बारे में",
    nav_contact: "संपर्क",

    // Hero
    hero_badge: "स्थानीय प्रतिभा • सही अवसर",
    hero_title: '"ग्रामीण युवाओं को मनमुताबिक काम नहीं मिल रहा, और छोटे नियोक्ताओं को जरूरी कामगार नहीं मिल रहे।"',
    hero_desc: "हम ग्रामीण प्रतिभाओं को स्थानीय रोजगार अवसरों से जोड़ते हैं, जिससे युवाओं को उपयुक्त काम और छोटे नियोक्ताओं को कुशल कामगार मिल सकें।",
    hero_btn_find_job: "नौकरी खोजें",
    hero_btn_hire: "कामगार खोजें",
    aud_1_title: "ग्रामीण युवाओं के लिए",
    aud_1_desc: "अपने गांव के पास सत्यापित काम खोजें",
    aud_2_title: "छोटे नियोक्ताओं के लिए",
    aud_2_desc: "मिनटों में स्थानीय कामगारों से संपर्क करें",
    hero_tag: "गांव में ही आजीविका",
    hero_caption: "अपने गांव और परिवार के पास ही सम्मानजनक आजीविका।",

    // Jobs
    jobs_tag: "ग्रामीण युवाओं के लिए",
    jobs_title: "उपलब्ध स्थानीय नौकरियां",
    jobs_subtitle: "आसपास के तालुकों की वर्कशॉप, दुकानों, खेतों और लघु उद्योगों में उपलब्ध काम।",
    filter_loc_lbl: "स्थान अनुसार चुनें:",
    filter_type_lbl: "काम के प्रकार अनुसार:",
    filter_all_locations: "सभी स्थान",
    filter_all_types: "सभी प्रकार",
    opt_fulltime: "पूर्णकालिक",
    opt_parttime: "अंशकालिक",
    opt_dailywage: "दैनिक मजदूरी",
    btn_contact_emp: "नियोक्ता से संपर्क करें",
    no_jobs_found: "आपके चुने हुए फिल्टर के अनुसार कोई नौकरी नहीं मिली। कृपया 'सभी स्थान' चुनें।",
    badge_new: "हाल ही में जोड़ी गई",

    // Hire
    hire_tag: "छोटे नियोक्ताओं के लिए",
    hire_title: "पास के गांवों से कामगार खोजें",
    hire_subtitle: "2 मिनट में अपनी जरूरत पोस्ट करें। आपका पद तुरंत स्थानीय युवाओं को दिखने लगेगा।",
    form_emp_name: "नियोक्ता का नाम *",
    ph_emp_name: "उदा. वेंकटेश प्रभु",
    form_biz_name: "व्यवसाय / फार्म का नाम (वैकल्पिक)",
    ph_biz_name: "उदा. श्री कृष्णा इलेक्ट्रिकल्स",
    form_job_title: "काम का नाम / पद *",
    ph_job_title: "उदा. इलेक्ट्रिकल वर्कशॉप हेल्पर",
    form_job_loc: "स्थान (गांव / तालुका) *",
    ph_job_loc: "उदा. बंटवाल, दक्षिण कन्नड़",
    form_job_type: "काम का प्रकार *",
    form_job_salary: "वेतन या मजदूरी विवरण *",
    ph_job_salary: "उदा. ₹12,000 / माह या ₹450 / दिन",
    form_job_skills: "आवश्यक हुनर / कौशल *",
    ph_job_skills: "उदा. वायरिंग, पंखा-मोटर रिपेयर, औजार चलाना",
    form_job_contact: "संपर्क मोबाइल नंबर या ईमेल *",
    ph_job_contact: "उदा. 9845012345 या contact@example.com",
    form_job_desc: "काम का संक्षिप्त विवरण *",
    ph_job_desc: "काम के प्रकार और समय के बारे में संक्षेप में लिखें...",
    btn_post_job: "नौकरी पोस्ट करें",
    err_emp_name: "कृपया अपना नाम दर्ज करें।",
    err_job_title: "कृपया काम का नाम दर्ज करें।",
    err_job_loc: "कृपया काम का स्थान दर्ज करें।",
    err_job_salary: "कृपया वेतन या मजदूरी दर्ज करें।",
    err_job_skills: "कृपया आवश्यक हुनर दर्ज करें।",
    err_job_contact: "कृपया वैध 10-अंकों का मोबाइल नंबर या ईमेल दर्ज करें।",
    err_job_desc: "कृपया काम का विवरण लिखें।",
    post_success_msg: "नौकरी सफलतापूर्वक पोस्ट हो गई है! आपका पद ऊपर 'नौकरी खोजें' सूची में तुरंत जोड़ दिया गया है।",

    // How it works
    how_tag: "आसान प्रक्रिया",
    how_title: "रूरलकनेक्ट कैसे काम करता है",
    how_subtitle: "बिना किसी बिचौलिए और बिना किसी शुल्क के सीधी और आसान प्रक्रिया।",
    how_youth_title: "काम की तलाश करने वालों के लिए",
    step_y1_title: "1. स्थानीय नौकरियां देखें",
    step_y1_desc: "अपने गांव या पास के कस्बे में उपलब्ध काम स्थान अनुसार देखें।",
    step_y2_title: "2. अपने हुनर अनुसार काम चुनें",
    step_y2_desc: "वायरिंग, ट्रैक्टर ड्राइविंग, खेती या दुकानदारी जैसे अपने हुनर के अनुसार अवसर चुनें।",
    step_y3_title: "3. नियोक्ता से सीधे बात करें",
    step_y3_desc: "'नियोक्ता से संपर्क करें' पर क्लिक कर सीधे फोन नंबर देखकर बात करें।",
    how_emp_title: "छोटे नियोक्ताओं के लिए",
    step_e1_title: "1. अपनी जरूरत साझा करें",
    step_e1_desc: "वेतन, स्थान और जरूरी हुनर के साथ सरल फॉर्म भरें।",
    step_e2_title: "2. पास के युवाओं तक पहुंचें",
    step_e2_desc: "आपके आसपास काम तलाश रहे युवाओं को आपका पद तुरंत दिखने लगेगा।",
    step_e3_title: "3. सही कामगार पाएं",
    step_e3_desc: "सीधे बात कर सक्षम और भरोसेमंद स्थानीय कामगारों को तुरंत काम पर रखें।",

    // About
    about_tag: "हमारा उद्देश्य",
    about_title: "ग्रामीण रोजगार की खाई को पाटना",
    about_subtitle: "रूरलकनेक्ट क्यों बनाया गया और यह ग्रामीण समुदाय को कैसे लाभ पहुंचाता है।",
    ab_1_title: "ग्रामीण रोजगार की समस्या",
    ab_1_desc: "गांवों में जानकारी के अभाव में युवाओं को शहरों की ओर पलायन करना पड़ता है। दूसरी ओर, स्थानीय वर्कशॉप, किसानों और दुकानदारों को कामगार ढूंढने में हफ्तों लग जाते हैं।",
    ab_2_title: "यह मंच क्यों बनाया गया",
    ab_2_desc: "पारंपरिक जॉब पोर्टल केवल अंग्रेजी रिज्यूमे वालों के लिए बने हैं। रूरलकनेक्ट को सादगी और बिना किसी रिज्यूमे के सीधे फोन कॉल से काम दिलाने हेतु बनाया गया है।",
    ab_3_title: "दोनों पक्षों को क्या लाभ है?",
    ab_3_desc: "युवाओं को अपने घर के पास सम्मानजनक कमाई मिलती है और छोटे व्यापारियों को भरोसेमंद स्थानीय मददगार मिलते हैं।",

    // Contact
    contact_tag: "सहायता",
    contact_title: "रूरलकनेक्ट संपर्क केंद्र",
    contact_subtitle: "नौकरी पोस्ट करने या काम ढूंढने में कोई परेशानी हो तो हमारे सहायता केंद्र से संपर्क करें।",
    c_info_title: "सामुदायिक हेल्पलाइन",
    c_info_desc: "हम ग्रामीण युवाओं और छोटे व्यापारियों को निःशुल्क सहायता प्रदान करते हैं।",
    c_loc_lbl: "केंद्र का पता",
    c_loc_val: "ग्राम पंचायत परिसर, बंटवाल तालुका, कर्नाटक 574211",
    c_phone_lbl: "हेल्पलाइन नंबर",
    c_mail_lbl: "ईमेल पता",
    c_hours_lbl: "सहायता समय",
    c_hours_val: "सोमवार से शनिवार: प्रातः 9:00 – सायं 5:00",
    free_guarantee: "100% निःशुल्क सेवा: रूरलकनेक्ट कभी भी किसी कामगार या नियोक्ता से कोई शुल्क नहीं लेता।",
    c_form_title: "कोई प्रश्न या सुझाव भेजें",
    c_form_name: "आपका नाम *",
    ph_c_name: "उदा. प्रवीण कुमार",
    c_form_phone: "फ़ोन नंबर या ईमेल *",
    ph_c_phone: "उदा. 9845012345",
    c_form_msg: "आपका प्रश्न या संदेश *",
    ph_c_msg: "बताएं कि आपको क्या मदद चाहिए...",
    btn_send_inquiry: "संदेश भेजें",
    err_c_name: "कृपया अपना नाम दर्ज करें।",
    err_c_phone: "कृपया वैध मोबाइल नंबर दर्ज करें।",
    err_c_msg: "कृपया अपना संदेश लिखें।",
    c_success_msg: "धन्यवाद {name}! आपका प्रश्न प्राप्त हो गया है। हमारा सहायता केंद्र जल्द ही आपसे संपर्क करेगा।",

    // Modal
    modal_badge: "नियोक्ता का सीधा संपर्क",
    m_loc_lbl: "स्थान:",
    m_pay_lbl: "वेतन / मजदूरी:",
    m_type_lbl: "प्रकार:",
    modal_call_prompt: "इस काम के बारे में बात करने के लिए नियोक्ता को सीधे कॉल करें:",
    modal_note: "किसी रिज्यूमे की आवश्यकता नहीं है। बात करते समय अपने हुनर और समय की जानकारी दें।",
    btn_close: "बंद करें",

    // Footer
    footer_tagline: "ग्रामीण युवाओं को स्थानीय काम और छोटे नियोक्ताओं को आसपास के कामगार दिलाने वाला सरल मंच।",
    footer_copy: "© 2026 रूरलकनेक्ट प्लेटफॉर्म • ग्रामीण रोजगार की समस्या का सादगी भरा समाधान।"
  }
};

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

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('ruralconnect_lang') || 'en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Job storage state (persisted in localStorage)
  const [jobs, setJobs] = useState(() => {
    try {
      const stored = localStorage.getItem('ruralconnect_jobs');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('LocalStorage load error', e);
    }
    return initialSeedJobs;
  });

  // Filter State
  const [locFilter, setLocFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Post Job Form State
  const [postForm, setPostForm] = useState({
    empName: '',
    bizName: '',
    jobTitle: '',
    jobLocation: '',
    jobType: 'Full-time',
    jobSalary: '',
    jobSkills: '',
    jobContact: '',
    jobDesc: ''
  });
  const [postErrors, setPostErrors] = useState({});
  const [postSuccess, setPostSuccess] = useState(false);

  // Active Contact Modal Job
  const [selectedJob, setSelectedJob] = useState(null);

  // Help Contact Form State
  const [helpForm, setHelpForm] = useState({ name: '', contact: '', msg: '' });
  const [helpErrors, setHelpErrors] = useState({});
  const [helpSuccess, setHelpSuccess] = useState(false);

  const t = translations[lang] || translations.en;

  const handleLangChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem('ruralconnect_lang', newLang);
  };

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      const sections = ['home', 'jobs', 'post-job', 'how-it-works', 'about', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Post Job Submission with Working LocalStorage
  const handlePostJob = (e) => {
    e.preventDefault();
    const errs = {};

    if (!postForm.empName.trim()) errs.empName = t.err_emp_name;
    if (!postForm.jobTitle.trim()) errs.jobTitle = t.err_job_title;
    if (!postForm.jobLocation.trim()) errs.jobLocation = t.err_job_loc;
    if (!postForm.jobSalary.trim()) errs.jobSalary = t.err_job_salary;
    if (!postForm.jobSkills.trim()) errs.jobSkills = t.err_job_skills;

    const contactVal = postForm.jobContact.trim();
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactVal || (!phoneRegex.test(contactVal.replace(/[^0-9]/g, '')) && !emailRegex.test(contactVal))) {
      errs.jobContact = t.err_job_contact;
    }

    if (!postForm.jobDesc.trim()) errs.jobDesc = t.err_job_desc;

    if (Object.keys(errs).length > 0) {
      setPostErrors(errs);
      setPostSuccess(false);
      return;
    }

    setPostErrors({});
    const skillsArr = postForm.jobSkills.split(',').map(s => s.trim()).filter(s => s.length > 0);

    const newJobObj = {
      id: 'rc-job-' + Date.now(),
      title: postForm.jobTitle.trim(),
      employer: postForm.empName.trim(),
      business: postForm.bizName.trim() || postForm.empName.trim(),
      location: postForm.jobLocation.trim(),
      type: postForm.jobType,
      salary: postForm.jobSalary.trim(),
      skills: skillsArr.length > 0 ? skillsArr : ['General Work'],
      contact: postForm.jobContact.trim(),
      desc: postForm.jobDesc.trim(),
      isNew: true
    };

    const updatedJobs = [newJobObj, ...jobs];
    setJobs(updatedJobs);
    try {
      localStorage.setItem('ruralconnect_jobs', JSON.stringify(updatedJobs));
    } catch (err) {
      console.warn('Storage save error', err);
    }

    setPostSuccess(true);
    setPostForm({
      empName: '',
      bizName: '',
      jobTitle: '',
      jobLocation: '',
      jobType: 'Full-time',
      jobSalary: '',
      jobSkills: '',
      jobContact: '',
      jobDesc: ''
    });
  };

  // Filter Jobs
  const filteredJobs = jobs.filter(job => {
    const matchLoc = (locFilter === 'all') || job.location.toLowerCase().includes(locFilter.toLowerCase());
    const matchType = (typeFilter === 'all') || (job.type.toLowerCase() === typeFilter.toLowerCase());
    return matchLoc && matchType;
  });

  return (
    <div className="min-h-screen bg-[#fcfbf7] text-[#212529] font-sans antialiased selection:bg-[#2d6a4f] selection:text-white">
      
      {/* ================= HEADER & NAVIGATION ================= */}
      <header className="sticky top-0 z-50 bg-[#fcfbf7]/95 backdrop-blur-md border-b border-[#e4dfd5] transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
          
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-2.5 text-left focus:outline-none"
          >
            <span className="w-10 h-10 rounded-xl bg-[#e8f5e9] border border-[#52b788]/40 flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
              🌾
            </span>
            <div className="flex flex-col">
              <span className="text-xl font-black text-[#1b4332] tracking-tight leading-none">
                {t.brand_name}
              </span>
              <span className="text-[11px] font-semibold text-[#555e54] mt-0.5">
                {t.brand_sub}
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { id: 'home', label: t.nav_home },
              { id: 'jobs', label: t.nav_jobs },
              { id: 'post-job', label: t.nav_hire },
              { id: 'how-it-works', label: t.nav_how },
              { id: 'about', label: t.nav_about },
              { id: 'contact', label: t.nav_contact },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-semibold py-1 transition-colors relative ${
                  activeSection === item.id 
                    ? 'text-[#1b4332] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#2d6a4f] after:rounded'
                    : 'text-[#555e54] hover:text-[#1b4332]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white border border-[#e4dfd5] px-2.5 py-1 rounded-full shadow-sm text-xs font-semibold">
              <button
                onClick={() => handleLangChange('en')}
                className={`px-2 py-0.5 rounded transition-all ${
                  lang === 'en' ? 'bg-[#e8f5e9] text-[#1b4332] font-bold' : 'text-[#555e54] hover:text-[#1b4332]'
                }`}
              >
                EN
              </button>
              <span className="text-[#e4dfd5] select-none">|</span>
              <button
                onClick={() => handleLangChange('kn')}
                className={`px-2 py-0.5 rounded transition-all ${
                  lang === 'kn' ? 'bg-[#e8f5e9] text-[#1b4332] font-bold' : 'text-[#555e54] hover:text-[#1b4332]'
                }`}
              >
                ಕನ್ನಡ
              </button>
              <span className="text-[#e4dfd5] select-none">|</span>
              <button
                onClick={() => handleLangChange('hi')}
                className={`px-2 py-0.5 rounded transition-all ${
                  lang === 'hi' ? 'bg-[#e8f5e9] text-[#1b4332] font-bold' : 'text-[#555e54] hover:text-[#1b4332]'
                }`}
              >
                हिंदी
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#1b4332] hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#e4dfd5] px-6 py-4 space-y-3 shadow-lg">
            {[
              { id: 'home', label: t.nav_home },
              { id: 'jobs', label: t.nav_jobs },
              { id: 'post-job', label: t.nav_hire },
              { id: 'how-it-works', label: t.nav_how },
              { id: 'about', label: t.nav_about },
              { id: 'contact', label: t.nav_contact },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left py-2 text-base font-semibold transition-colors ${
                  activeSection === item.id ? 'text-[#1b4332] font-bold' : 'text-[#555e54]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main>
        
        {/* SECTION A: HOME (HERO) */}
        <section id="home" className="py-16 md:py-20 bg-gradient-to-b from-[#fcfbf7] to-[#f4f0e6] border-b border-[#e4dfd5]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-white border border-[#e4dfd5] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#2d6a4f] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#52b788]"></span>
                <span>{t.hero_badge}</span>
              </div>

              {/* Problem statement prominently */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1b4332] tracking-tight leading-snug">
                {t.hero_title}
              </h1>

              {/* Short explanation */}
              <p className="text-base sm:text-lg text-[#555e54] leading-relaxed max-w-xl">
                {t.hero_desc}
              </p>

              {/* ONLY TWO MAIN BUTTONS */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => handleNavClick('jobs')}
                  className="px-7 py-3.5 rounded-xl bg-[#1b4332] hover:bg-[#143527] text-white font-bold text-sm shadow-sm transition-all"
                >
                  {t.hero_btn_find_job}
                </button>
                <button
                  onClick={() => handleNavClick('post-job')}
                  className="px-7 py-3.5 rounded-xl bg-white hover:bg-[#f7f5ed] text-[#1b4332] border border-[#e4dfd5] font-bold text-sm transition-all shadow-sm"
                >
                  {t.hero_btn_hire}
                </button>
              </div>

              <div className="pt-6 border-t border-[#e4dfd5]/80 flex flex-wrap gap-8">
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-xl bg-white border border-[#e4dfd5] flex items-center justify-center text-xl shadow-sm">
                    🧑‍🌾
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#1b4332]">{t.aud_1_title}</h4>
                    <span className="text-xs text-[#555e54]">{t.aud_1_desc}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-xl bg-white border border-[#e4dfd5] flex items-center justify-center text-xl shadow-sm">
                    🏪
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#1b4332]">{t.aud_2_title}</h4>
                    <span className="text-xs text-[#555e54]">{t.aud_2_desc}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80"
                  alt="Rural technicians and local workers"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#0d261c]/90 via-[#0d261c]/60 to-transparent text-white">
                  <span className="inline-block bg-[#52b788] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-1">
                    {t.hero_tag}
                  </span>
                  <p className="text-xs text-emerald-100 font-medium">
                    {t.hero_caption}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* SECTION B: FIND JOBS – FOR RURAL YOUTH */}
        <section id="jobs" className="py-20 bg-white border-b border-[#e4dfd5]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#2d6a4f] bg-[#e8f5e9] px-3.5 py-1 rounded-full border border-[#52b788]/30">
                {t.jobs_tag}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b4332] tracking-tight">
                {t.jobs_title}
              </h2>
              <p className="text-sm text-[#555e54]">
                {t.jobs_subtitle}
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 bg-[#fcfbf7] p-4 rounded-2xl border border-[#e4dfd5] mb-8 items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-[240px]">
                <label className="text-xs font-bold text-[#1b4332] whitespace-nowrap">{t.filter_loc_lbl}</label>
                <select
                  value={locFilter}
                  onChange={(e) => setLocFilter(e.target.value)}
                  className="w-full max-w-xs px-3 py-2 rounded-xl border border-[#e4dfd5] text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20"
                >
                  <option value="all">{t.filter_all_locations}</option>
                  <option value="Bantwal">Bantwal, Dakshina Kannada</option>
                  <option value="Shivamogga">Shivamogga</option>
                  <option value="Mandya">Mandya</option>
                  <option value="Belagavi">Belagavi</option>
                  <option value="Udupi">Udupi</option>
                  <option value="Sirsi">Sirsi, Uttara Kannada</option>
                </select>
              </div>

              <div className="flex items-center gap-3 flex-1 min-w-[240px]">
                <label className="text-xs font-bold text-[#1b4332] whitespace-nowrap">{t.filter_type_lbl}</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full max-w-xs px-3 py-2 rounded-xl border border-[#e4dfd5] text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20"
                >
                  <option value="all">{t.filter_all_types}</option>
                  <option value="Full-time">{t.opt_fulltime}</option>
                  <option value="Part-time">{t.opt_parttime}</option>
                  <option value="Daily Wage">{t.opt_dailywage}</option>
                </select>
              </div>
            </div>

            {/* Jobs Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => {
                const badgeColor = job.type === 'Full-time'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : job.type === 'Part-time'
                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200';

                let localizedType = job.type;
                if (job.type === 'Full-time') localizedType = t.opt_fulltime;
                else if (job.type === 'Part-time') localizedType = t.opt_parttime;
                else if (job.type === 'Daily Wage') localizedType = t.opt_dailywage;

                return (
                  <article key={job.id} className="bg-[#fcfbf7] border border-[#e4dfd5] rounded-2xl p-6 flex flex-col justify-between hover:border-[#2d6a4f] hover:shadow-md transition-all">
                    <div>
                      {job.isNew && (
                        <span className="inline-block px-2 py-0.5 mb-2 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                          ★ {t.badge_new}
                        </span>
                      )}

                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-bold text-base text-[#1b4332] leading-snug">
                          {job.title}
                        </h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border flex-shrink-0 ${badgeColor}`}>
                          {localizedType}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-[#212529] mb-1">
                        {job.business || job.employer}
                      </p>

                      <p className="text-xs text-[#555e54] flex items-center gap-1 mb-3">
                        <span>📍</span>
                        <span>{job.location}</span>
                      </p>

                      <div className="p-2.5 bg-white border border-[#e4dfd5] rounded-xl text-xs font-bold text-[#1b4332] mb-3">
                        {job.salary}
                      </div>

                      <p className="text-xs text-[#555e54] leading-relaxed mb-4 line-clamp-2">
                        {job.desc}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {job.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="px-2 py-0.5 bg-white border border-[#e4dfd5] text-[11px] font-medium text-[#212529] rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedJob(job)}
                      className="w-full py-2.5 bg-[#1b4332] hover:bg-[#143527] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
                    >
                      <span>📞</span>
                      <span>{t.btn_contact_emp}</span>
                    </button>
                  </article>
                );
              })}
            </div>

            {filteredJobs.length === 0 && (
              <div className="p-8 text-center bg-[#fcfbf7] border border-dashed border-[#e4dfd5] rounded-2xl text-xs text-[#555e54]">
                {t.no_jobs_found}
              </div>
            )}

          </div>
        </section>


        {/* SECTION C: HIRE WORKERS – FOR SMALL EMPLOYERS */}
        <section id="post-job" className="py-20 bg-[#f6f4ee] border-b border-[#e4dfd5]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#2d6a4f] bg-[#e8f5e9] px-3.5 py-1 rounded-full border border-[#52b788]/30">
                {t.hire_tag}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b4332] tracking-tight">
                {t.hire_title}
              </h2>
              <p className="text-sm text-[#555e54]">
                {t.hire_subtitle}
              </p>
            </div>

            <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-[#e4dfd5] shadow-sm">
              <form onSubmit={handlePostJob} className="space-y-4" noValidate>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#212529] mb-1">{t.form_emp_name}</label>
                    <input
                      type="text"
                      value={postForm.empName}
                      onChange={(e) => setPostForm({ ...postForm, empName: e.target.value })}
                      placeholder={t.ph_emp_name}
                      className={`w-full px-3 py-2 rounded-xl border text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 ${
                        postErrors.empName ? 'border-red-500' : 'border-[#e4dfd5]'
                      }`}
                    />
                    {postErrors.empName && <p className="text-[11px] text-red-600 mt-1">{postErrors.empName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#212529] mb-1">{t.form_biz_name}</label>
                    <input
                      type="text"
                      value={postForm.bizName}
                      onChange={(e) => setPostForm({ ...postForm, bizName: e.target.value })}
                      placeholder={t.ph_biz_name}
                      className="w-full px-3 py-2 rounded-xl border border-[#e4dfd5] text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#212529] mb-1">{t.form_job_title}</label>
                    <input
                      type="text"
                      value={postForm.jobTitle}
                      onChange={(e) => setPostForm({ ...postForm, jobTitle: e.target.value })}
                      placeholder={t.ph_job_title}
                      className={`w-full px-3 py-2 rounded-xl border text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 ${
                        postErrors.jobTitle ? 'border-red-500' : 'border-[#e4dfd5]'
                      }`}
                    />
                    {postErrors.jobTitle && <p className="text-[11px] text-red-600 mt-1">{postErrors.jobTitle}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#212529] mb-1">{t.form_job_loc}</label>
                    <input
                      type="text"
                      value={postForm.jobLocation}
                      onChange={(e) => setPostForm({ ...postForm, jobLocation: e.target.value })}
                      placeholder={t.ph_job_loc}
                      className={`w-full px-3 py-2 rounded-xl border text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 ${
                        postErrors.jobLocation ? 'border-red-500' : 'border-[#e4dfd5]'
                      }`}
                    />
                    {postErrors.jobLocation && <p className="text-[11px] text-red-600 mt-1">{postErrors.jobLocation}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#212529] mb-1">{t.form_job_type}</label>
                    <select
                      value={postForm.jobType}
                      onChange={(e) => setPostForm({ ...postForm, jobType: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#e4dfd5] text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 font-semibold"
                    >
                      <option value="Full-time">{t.opt_fulltime}</option>
                      <option value="Part-time">{t.opt_parttime}</option>
                      <option value="Daily Wage">{t.opt_dailywage}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#212529] mb-1">{t.form_job_salary}</label>
                    <input
                      type="text"
                      value={postForm.jobSalary}
                      onChange={(e) => setPostForm({ ...postForm, jobSalary: e.target.value })}
                      placeholder={t.ph_job_salary}
                      className={`w-full px-3 py-2 rounded-xl border text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 ${
                        postErrors.jobSalary ? 'border-red-500' : 'border-[#e4dfd5]'
                      }`}
                    />
                    {postErrors.jobSalary && <p className="text-[11px] text-red-600 mt-1">{postErrors.jobSalary}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#212529] mb-1">{t.form_job_skills}</label>
                  <input
                    type="text"
                    value={postForm.jobSkills}
                    onChange={(e) => setPostForm({ ...postForm, jobSkills: e.target.value })}
                    placeholder={t.ph_job_skills}
                    className={`w-full px-3 py-2 rounded-xl border text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 ${
                      postErrors.jobSkills ? 'border-red-500' : 'border-[#e4dfd5]'
                    }`}
                  />
                  {postErrors.jobSkills && <p className="text-[11px] text-red-600 mt-1">{postErrors.jobSkills}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#212529] mb-1">{t.form_job_contact}</label>
                  <input
                    type="text"
                    value={postForm.jobContact}
                    onChange={(e) => setPostForm({ ...postForm, jobContact: e.target.value })}
                    placeholder={t.ph_job_contact}
                    className={`w-full px-3 py-2 rounded-xl border text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 ${
                      postErrors.jobContact ? 'border-red-500' : 'border-[#e4dfd5]'
                    }`}
                  />
                  {postErrors.jobContact && <p className="text-[11px] text-red-600 mt-1">{postErrors.jobContact}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#212529] mb-1">{t.form_job_desc}</label>
                  <textarea
                    rows={3}
                    value={postForm.jobDesc}
                    onChange={(e) => setPostForm({ ...postForm, jobDesc: e.target.value })}
                    placeholder={t.ph_job_desc}
                    className={`w-full px-3 py-2 rounded-xl border text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 resize-none ${
                      postErrors.jobDesc ? 'border-red-500' : 'border-[#e4dfd5]'
                    }`}
                  />
                  {postErrors.jobDesc && <p className="text-[11px] text-red-600 mt-1">{postErrors.jobDesc}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1b4332] hover:bg-[#143527] text-white font-bold text-sm rounded-xl shadow-sm transition-all"
                >
                  {t.btn_post_job}
                </button>

                {postSuccess && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 leading-relaxed">
                    <strong>✓ {t.post_success_msg}</strong>
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() => handleNavClick('jobs')}
                        className="font-bold underline text-emerald-800"
                      >
                        {t.nav_jobs} &rarr;
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </div>

          </div>
        </section>


        {/* SECTION D: HOW IT WORKS */}
        <section id="how-it-works" className="py-20 bg-white border-b border-[#e4dfd5]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#2d6a4f] bg-[#e8f5e9] px-3.5 py-1 rounded-full border border-[#52b788]/30">
                {t.how_tag}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b4332] tracking-tight">
                {t.how_title}
              </h2>
              <p className="text-sm text-[#555e54]">
                {t.how_subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* For Youth */}
              <div className="p-6 sm:p-8 bg-[#fcfbf7] rounded-3xl border border-[#e4dfd5] space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[#e4dfd5]">
                  <span className="w-11 h-11 rounded-xl bg-white border border-[#e4dfd5] flex items-center justify-center text-2xl shadow-sm">
                    🧑‍🌾
                  </span>
                  <h3 className="font-bold text-lg text-[#1b4332]">{t.how_youth_title}</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { num: '1', title: t.step_y1_title, desc: t.step_y1_desc },
                    { num: '2', title: t.step_y2_title, desc: t.step_y2_desc },
                    { num: '3', title: t.step_y3_title, desc: t.step_y3_desc },
                  ].map((s) => (
                    <div key={s.num} className="flex items-start gap-3.5">
                      <span className="w-7 h-7 rounded-full bg-[#1b4332] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {s.num}
                      </span>
                      <div>
                        <h4 className="font-bold text-sm text-[#1b4332]">{s.title}</h4>
                        <p className="text-xs text-[#555e54] mt-0.5 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* For Employers */}
              <div className="p-6 sm:p-8 bg-[#fcfbf7] rounded-3xl border border-[#e4dfd5] space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[#e4dfd5]">
                  <span className="w-11 h-11 rounded-xl bg-white border border-[#e4dfd5] flex items-center justify-center text-2xl shadow-sm">
                    🏪
                  </span>
                  <h3 className="font-bold text-lg text-[#1b4332]">{t.how_emp_title}</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { num: '1', title: t.step_e1_title, desc: t.step_e1_desc },
                    { num: '2', title: t.step_e2_title, desc: t.step_e2_desc },
                    { num: '3', title: t.step_e3_title, desc: t.step_e3_desc },
                  ].map((s) => (
                    <div key={s.num} className="flex items-start gap-3.5">
                      <span className="w-7 h-7 rounded-full bg-[#1b4332] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {s.num}
                      </span>
                      <div>
                        <h4 className="font-bold text-sm text-[#1b4332]">{s.title}</h4>
                        <p className="text-xs text-[#555e54] mt-0.5 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* SECTION E: ABOUT US */}
        <section id="about" className="py-20 bg-[#f6f4ee] border-b border-[#e4dfd5]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#2d6a4f] bg-[#e8f5e9] px-3.5 py-1 rounded-full border border-[#52b788]/30">
                {t.about_tag}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b4332] tracking-tight">
                {t.about_title}
              </h2>
              <p className="text-sm text-[#555e54]">
                {t.about_subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: "⚠️", title: t.ab_1_title, desc: t.ab_1_desc },
                { icon: "💡", title: t.ab_2_title, desc: t.ab_2_desc },
                { icon: "🤝", title: t.ab_3_title, desc: t.ab_3_desc },
              ].map((card, idx) => (
                <div key={idx} className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e4dfd5] shadow-sm hover:border-[#2d6a4f] transition-all">
                  <span className="text-3xl mb-4 block">{card.icon}</span>
                  <h3 className="font-bold text-base text-[#1b4332] mb-2">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-[#555e54] leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* SECTION F: CONTACT */}
        <section id="contact" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#2d6a4f] bg-[#e8f5e9] px-3.5 py-1 rounded-full border border-[#52b788]/30">
                {t.contact_tag}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b4332] tracking-tight">
                {t.contact_title}
              </h2>
              <p className="text-sm text-[#555e54]">
                {t.contact_subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-5 p-6 sm:p-8 bg-[#fcfbf7] rounded-3xl border border-[#e4dfd5] space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#1b4332]">{t.c_info_title}</h3>
                  <p className="text-xs sm:text-sm text-[#555e54] mt-1 leading-relaxed">
                    {t.c_info_desc}
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-xl bg-white border border-[#e4dfd5] flex items-center justify-center text-lg flex-shrink-0">
                      📍
                    </span>
                    <div>
                      <strong className="block text-[#1b4332]">{t.c_loc_lbl}</strong>
                      <span className="text-[#555e54]">{t.c_loc_val}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-xl bg-white border border-[#e4dfd5] flex items-center justify-center text-lg flex-shrink-0">
                      📞
                    </span>
                    <div>
                      <strong className="block text-[#1b4332]">{t.c_phone_lbl}</strong>
                      <span className="text-[#555e54]">+91 98450 12345</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-xl bg-white border border-[#e4dfd5] flex items-center justify-center text-lg flex-shrink-0">
                      ✉️
                    </span>
                    <div>
                      <strong className="block text-[#1b4332]">{t.c_mail_lbl}</strong>
                      <span className="text-[#555e54]">support@ruralconnect.org</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-xl bg-white border border-[#e4dfd5] flex items-center justify-center text-lg flex-shrink-0">
                      🕒
                    </span>
                    <div>
                      <strong className="block text-[#1b4332]">{t.c_hours_lbl}</strong>
                      <span className="text-[#555e54]">{t.c_hours_val}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#e8f5e9] rounded-xl border border-[#52b788]/40 text-xs text-[#1b4332] flex items-start gap-2.5">
                  <span className="text-base flex-shrink-0">🛡️</span>
                  <p className="leading-relaxed">{t.free_guarantee}</p>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 bg-[#fcfbf7] rounded-3xl border border-[#e4dfd5]">
                <h3 className="text-xl font-bold text-[#1b4332] mb-6">{t.c_form_title}</h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const errs = {};
                    if (!helpForm.name.trim()) errs.name = t.err_c_name;
                    if (!helpForm.contact.trim()) errs.contact = t.err_c_phone;
                    if (!helpForm.msg.trim()) errs.msg = t.err_c_msg;
                    if (Object.keys(errs).length > 0) {
                      setHelpErrors(errs);
                      setHelpSuccess(false);
                      return;
                    }
                    setHelpErrors({});
                    setHelpSuccess(true);
                    setHelpForm({ name: '', contact: '', msg: '' });
                  }}
                  className="space-y-4"
                  noValidate
                >
                  <div>
                    <label className="block text-xs font-bold text-[#212529] mb-1">{t.c_form_name}</label>
                    <input
                      type="text"
                      value={helpForm.name}
                      onChange={(e) => setHelpForm({ ...helpForm, name: e.target.value })}
                      placeholder={t.ph_c_name}
                      className={`w-full px-3 py-2 rounded-xl border text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 ${
                        helpErrors.name ? 'border-red-500' : 'border-[#e4dfd5]'
                      }`}
                    />
                    {helpErrors.name && <p className="text-[11px] text-red-600 mt-1">{helpErrors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#212529] mb-1">{t.c_form_phone}</label>
                    <input
                      type="text"
                      value={helpForm.contact}
                      onChange={(e) => setHelpForm({ ...helpForm, contact: e.target.value })}
                      placeholder={t.ph_c_phone}
                      className={`w-full px-3 py-2 rounded-xl border text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 ${
                        helpErrors.contact ? 'border-red-500' : 'border-[#e4dfd5]'
                      }`}
                    />
                    {helpErrors.contact && <p className="text-[11px] text-red-600 mt-1">{helpErrors.contact}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#212529] mb-1">{t.c_form_msg}</label>
                    <textarea
                      rows={3}
                      value={helpForm.msg}
                      onChange={(e) => setHelpForm({ ...helpForm, msg: e.target.value })}
                      placeholder={t.ph_c_msg}
                      className={`w-full px-3 py-2 rounded-xl border text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 resize-none ${
                        helpErrors.msg ? 'border-red-500' : 'border-[#e4dfd5]'
                      }`}
                    />
                    {helpErrors.msg && <p className="text-[11px] text-red-600 mt-1">{helpErrors.msg}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1b4332] hover:bg-[#143527] text-white font-bold text-sm rounded-xl shadow-sm transition-all"
                  >
                    {t.btn_send_inquiry}
                  </button>

                  {helpSuccess && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 leading-relaxed">
                      ✓ {t.c_success_msg.replace('{name}', 'Friend')}
                    </div>
                  )}

                </form>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* ================= DIRECT CONTACT EMPLOYER MODAL ================= */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-[#153124]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e4dfd5] space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-3 border-b border-[#e4dfd5]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2d6a4f] bg-[#e8f5e9] px-2 py-0.5 rounded">
                  {t.modal_badge}
                </span>
                <h3 className="text-base font-bold text-[#1b4332] mt-1">{selectedJob.title}</h3>
                <p className="text-xs text-[#555e54] font-semibold">{selectedJob.business || selectedJob.employer}</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-stone-400 hover:text-stone-600 text-xl font-bold p-1"
              >
                &times;
              </button>
            </div>

            <div className="space-y-2 text-xs bg-[#fcfbf7] p-3 rounded-xl border border-[#e4dfd5]">
              <div className="flex justify-between">
                <span className="text-[#555e54]">{t.m_loc_lbl}</span>
                <strong className="text-[#1b4332]">{selectedJob.location}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#555e54]">{t.m_pay_lbl}</span>
                <strong className="text-[#2d6a4f]">{selectedJob.salary}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#555e54]">{t.m_type_lbl}</span>
                <span className="font-bold">{selectedJob.type}</span>
              </div>
            </div>

            <div className="text-center p-4 bg-[#f7f9f7] rounded-xl border border-dashed border-[#52b788] space-y-2">
              <p className="text-xs font-semibold text-[#212529]">
                {t.modal_call_prompt}
              </p>
              <div className="inline-flex items-center gap-2 bg-[#1b4332] text-white px-4 py-2.5 rounded-xl font-mono font-bold text-base shadow-sm">
                <span>📞</span>
                <span>{selectedJob.contact}</span>
              </div>
              <p className="text-[11px] text-[#555e54]">
                {t.modal_note}
              </p>
            </div>

            <div className="text-right pt-2 border-t border-[#e4dfd5]">
              <button
                onClick={() => setSelectedJob(null)}
                className="px-5 py-2 bg-[#1b4332] hover:bg-[#143527] text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                {t.btn_close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#1b4332] text-[#e8f5e9] py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-6">
          <div>
            <span className="text-2xl font-black text-white tracking-tight">🌾 {t.brand_name}</span>
            <p className="text-xs sm:text-sm text-[#c8e6c9] max-w-md mx-auto mt-1 leading-relaxed">
              {t.footer_tagline}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-semibold">
            {[
              { id: 'home', label: t.nav_home },
              { id: 'jobs', label: t.nav_jobs },
              { id: 'post-job', label: t.nav_hire },
              { id: 'how-it-works', label: t.nav_how },
              { id: 'about', label: t.nav_about },
              { id: 'contact', label: t.nav_contact },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="hover:text-[#52b788] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 w-full">
            <p className="text-xs text-[#a5d6a7]">
              {t.footer_copy}
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
