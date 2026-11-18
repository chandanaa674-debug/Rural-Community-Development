from models import (
    db, User, YouthProfile, EmployerProfile, Job, Application,
    LearningResource, UserLearningProgress, JobReport, CommunityReferral, Notification
)

def seed_database():
    """Seed the database with rich, realistic rural employment ecosystem data."""
    # Check if already seeded
    if User.query.filter_by(email='youth@ruralconnect.ai').first():
        print("Database already contains seed data.")
        return

    print("Seeding database with realistic rural ecosystem data...")

    # 1. USERS: Youth, Employer, Admin
    youth_user = User(
        email='youth@ruralconnect.ai',
        role='youth',
        name='Praveen Kumar',
        phone='9845012345'
    )
    youth_user.set_password('demo123')
    db.session.add(youth_user)

    youth_user2 = User(
        email='kavitha@ruralconnect.ai',
        role='youth',
        name='Kavitha Naik',
        phone='9845023456'
    )
    youth_user2.set_password('demo123')
    db.session.add(youth_user2)

    youth_user3 = User(
        email='ramesh@ruralconnect.ai',
        role='youth',
        name='Ramesh Gowda',
        phone='9845034567'
    )
    youth_user3.set_password('demo123')
    db.session.add(youth_user3)

    youth_user4 = User(
        email='anitha@ruralconnect.ai',
        role='youth',
        name='Anitha Hegde',
        phone='9845045678'
    )
    youth_user4.set_password('demo123')
    db.session.add(youth_user4)

    youth_user5 = User(
        email='suresh@ruralconnect.ai',
        role='youth',
        name='Suresh Poojary',
        phone='9845056789'
    )
    youth_user5.set_password('demo123')
    db.session.add(youth_user5)

    employer_user = User(
        email='employer@ruralconnect.ai',
        role='employer',
        name='Venkatesh Rao',
        phone='9845112233'
    )
    employer_user.set_password('demo123')
    db.session.add(employer_user)

    employer_user2 = User(
        email='sahyadri_agro@ruralconnect.ai',
        role='employer',
        name='Dr. Manjunath Patil',
        phone='9845223344'
    )
    employer_user2.set_password('demo123')
    db.session.add(employer_user2)

    employer_user3 = User(
        email='cauvery_retail@ruralconnect.ai',
        role='employer',
        name='Lakshmi Narayan',
        phone='9845334455'
    )
    employer_user3.set_password('demo123')
    db.session.add(employer_user3)

    admin_user = User(
        email='admin@ruralconnect.ai',
        role='admin',
        name='Gram Vikas Officer (Admin)',
        phone='9845999000'
    )
    admin_user.set_password('demo123')
    db.session.add(admin_user)

    db.session.flush()

    # 2. YOUTH PROFILES
    praveen_profile = YouthProfile(
        user_id=youth_user.id,
        age=21,
        gender='Male',
        village='Bantwal Grama',
        district='Dakshina Kannada',
        state='Karnataka',
        latitude=12.8954,
        longitude=75.0345,
        preferred_location='Bantwal, Mangaluru Taluk',
        education='12th / PUC Pass (Science)',
        languages=['Kannada', 'Tulu', 'Basic English'],
        skills=[
            {'name': 'Electrical Repair', 'level': 'Intermediate', 'is_practical': True},
            {'name': 'Wiring', 'level': 'Intermediate', 'is_practical': True},
            {'name': 'Appliance Repair', 'level': 'Basic', 'is_practical': True},
            {'name': 'Motor Winding', 'level': 'Beginner', 'is_practical': True}
        ],
        work_preferences=['Electrical Workshop', 'Solar Maintenance', 'Field Maintenance'],
        expected_salary=14000,
        availability='full-time',
        willing_to_relocate=False,
        bio='Completed PUC in Bantwal. Have 1.5 years practical hands-on experience assisting a local electrician fixing household switchboards, ceiling fans, and single-phase motor pumps. Eager to work in a workshop or solar enterprise.',
        practical_experience='Assisted local senior electrician in Bantwal village on 45+ domestic wiring jobs, inverter installations, and submersible pump starter troubleshooting.',
        has_uploaded_resume=False,
        skill_passport_id='RC-SKP-00101',
        is_verified=True,
        completed_modules=[
            {'title': 'Electrical Safety & Multimeter Diagnostics', 'hours': 5, 'badge': 'Safety First Certified'}
        ],
        badges=['Local Electrician Level 1', 'Quick Responder', 'Verified Rural Talent']
    )
    db.session.add(praveen_profile)

    kavitha_profile = YouthProfile(
        user_id=youth_user2.id,
        age=20,
        gender='Female',
        village='Sirsi Rural',
        district='Uttara Kannada',
        state='Karnataka',
        latitude=14.6195,
        longitude=74.8354,
        preferred_location='Sirsi Taluk & Hubballi',
        education='10th Standard Pass',
        languages=['Kannada', 'Basic English', 'Hindi'],
        skills=[
            {'name': 'Basic Computer Knowledge', 'level': 'Basic', 'is_practical': True},
            {'name': 'Tailoring', 'level': 'Intermediate', 'is_practical': True},
            {'name': 'Customer Handling', 'level': 'Intermediate', 'is_practical': True}
        ],
        work_preferences=['Grama One Center', 'Garment Unit', 'Store Counter'],
        expected_salary=11000,
        availability='full-time',
        willing_to_relocate=False,
        bio='Completed 10th standard in Sirsi. Proficient in garment stitching and Kannada typing. Highly punctual and dependable.',
        practical_experience='Managed home tailoring orders and assisted village panchayat computer operator during electoral card updates.',
        has_uploaded_resume=False,
        skill_passport_id='RC-SKP-00102',
        is_verified=True,
        badges=['Grama Assistant Ready', 'Verified Craftsperson']
    )
    db.session.add(kavitha_profile)

    ramesh_profile = YouthProfile(
        user_id=youth_user3.id,
        age=23,
        gender='Male',
        village='Pandavapura',
        district='Mandya',
        state='Karnataka',
        latitude=12.4988,
        longitude=76.6667,
        preferred_location='Mandya & Mysuru',
        education='10th Pass',
        languages=['Kannada'],
        skills=[
            {'name': 'Tractor Driving', 'level': 'Advanced', 'is_practical': True},
            {'name': 'Farm Equipment', 'level': 'Intermediate', 'is_practical': True},
            {'name': 'Dairy Farming', 'level': 'Intermediate', 'is_practical': True}
        ],
        work_preferences=['Agriculture', 'Tractor Workshop', 'Agro Warehouse'],
        expected_salary=15000,
        availability='seasonal',
        willing_to_relocate=True,
        bio='Experienced tractor operator with valid commercial license. Proficient in rotavator, cultivator, and post-harvest transport.',
        practical_experience='4 years operating Mahindra and John Deere tractors across sugarcane and paddy farms in Mandya.',
        has_uploaded_resume=False,
        skill_passport_id='RC-SKP-00103',
        is_verified=True,
        badges=['Agri Machinery Master', 'Verified Rural Talent']
    )
    db.session.add(ramesh_profile)

    anitha_profile = YouthProfile(
        user_id=youth_user4.id,
        age=22,
        gender='Female',
        village='Karkala',
        district='Udupi',
        state='Karnataka',
        latitude=13.2144,
        longitude=74.9961,
        preferred_location='Karkala, Udupi Town',
        education='B.Com Graduate',
        languages=['Kannada', 'English', 'Tulu', 'Hindi'],
        skills=[
            {'name': 'Data Entry', 'level': 'Intermediate', 'is_practical': True},
            {'name': 'Retail Sales', 'level': 'Intermediate', 'is_practical': True},
            {'name': 'Billing', 'level': 'Intermediate', 'is_practical': True},
            {'name': 'Spreadsheet Basics', 'level': 'Intermediate', 'is_practical': True}
        ],
        work_preferences=['Retail Shop', 'Office Assistant', 'Accounting Clerk'],
        expected_salary=16000,
        availability='full-time',
        willing_to_relocate=False,
        bio='B.Com graduate eager to work in accounting, supermarket billing, or office administration in Udupi district.',
        practical_experience='Handled Tally and GST billing for a family grocery distributor during college vacation.',
        has_uploaded_resume=True,
        resume_url='/uploads/resumes/anitha_bcom.pdf',
        skill_passport_id='RC-SKP-00104',
        is_verified=True,
        badges=['Commerce Specialist', 'Digital Billing Pro']
    )
    db.session.add(anitha_profile)

    suresh_profile = YouthProfile(
        user_id=youth_user5.id,
        age=24,
        gender='Male',
        village='Belthangady',
        district='Dakshina Kannada',
        state='Karnataka',
        latitude=13.0033,
        longitude=75.3025,
        preferred_location='Belthangady, Bantwal, Puttur',
        education='ITI / Diploma (Fitter)',
        languages=['Kannada', 'Tulu'],
        skills=[
            {'name': 'Plumbing', 'level': 'Intermediate', 'is_practical': True},
            {'name': 'Pipe Fitting', 'level': 'Intermediate', 'is_practical': True},
            {'name': 'Water Pump Repair', 'level': 'Intermediate', 'is_practical': True},
            {'name': 'Welding', 'level': 'Beginner', 'is_practical': True}
        ],
        work_preferences=['Plumbing & Sanitary', 'Pump Service', 'Construction Site'],
        expected_salary=15000,
        availability='full-time',
        willing_to_relocate=False,
        bio='ITI trained plumber and pipe technician with strong experience in agricultural drip irrigation, borewell pipelines, and PVC installations.',
        practical_experience='Installed over 60 domestic overhead tanks and 25 drip irrigation systems for areca nut plantations.',
        has_uploaded_resume=False,
        skill_passport_id='RC-SKP-00105',
        is_verified=True,
        badges=['Piping & Pump Certified', 'Verified Rural Talent']
    )
    db.session.add(suresh_profile)

    db.session.flush()

    # 3. EMPLOYER PROFILES
    krishna_works = EmployerProfile(
        user_id=employer_user.id,
        business_name='Shree Krishna Electrical Works & Solar Solutions',
        business_type='Workshop & Services',
        registration_number='KA-DK-MSME-2021-9921',
        village='Bantwal Town',
        district='Dakshina Kannada',
        state='Karnataka',
        latitude=12.8988,
        longitude=75.0380,
        address='Main Market Road, Near Old Bus Stand, Bantwal',
        description='Leading electrical workshop in Bantwal providing commercial wiring, motor winding, agricultural pump repair, and rooftop solar installations across 20+ nearby villages.',
        contact_person='Venkatesh Rao (Proprietor)',
        contact_phone='9845112233',
        contact_email='krishna_electricals@gmail.com',
        website='https://krishnaelectricals.ruralconnect.in',
        is_verified=True,
        verification_status='verified',
        reputation_score=4.9,
        hiring_count=12
    )
    db.session.add(krishna_works)

    sahyadri_agro = EmployerProfile(
        user_id=employer_user2.id,
        business_name='Sahyadri Agro Processing & Cold Storage',
        business_type='Agriculture & Processing',
        registration_number='KA-SH-AGRI-2020-4102',
        village='Thirthahalli Road',
        district='Shivamogga',
        state='Karnataka',
        latitude=13.9299,
        longitude=75.5681,
        address='Plot 14, APMC Yard, Shivamogga Rural',
        description='Specialized post-harvest spice packaging, areca nut grading, and ginger processing facility employing local agricultural youth.',
        contact_person='Dr. Manjunath Patil',
        contact_phone='9845223344',
        contact_email='contact@sahyadriagro.co.in',
        website='https://sahyadriagro.co.in',
        is_verified=True,
        verification_status='verified',
        reputation_score=4.8,
        hiring_count=28
    )
    db.session.add(sahyadri_agro)

    cauvery_mart = EmployerProfile(
        user_id=employer_user3.id,
        business_name='Cauvery Supermarket & Rural Mart',
        business_type='Retail',
        registration_number='KA-MD-RET-2022-7714',
        village='Mandya City',
        district='Mandya',
        state='Karnataka',
        latitude=12.5230,
        longitude=76.8970,
        address='Near Sugar Town Circle, Mandya',
        description='Fast-growing rural supermarket serving daily grocery, dairy products, and agricultural seeds to over 35 surrounding panchayats.',
        contact_person='Lakshmi Narayan',
        contact_phone='9845334455',
        contact_email='cauverymart.mandya@gmail.com',
        website='https://cauverymart.in',
        is_verified=True,
        verification_status='verified',
        reputation_score=4.6,
        hiring_count=8
    )
    db.session.add(cauvery_mart)

    db.session.flush()

    # 4. JOBS (Verified, Pending, Micro-opportunities)
    job1 = Job(
        employer_id=krishna_works.id,
        title='Electrical Workshop Assistant & Wiring Trainee',
        title_kannada='ಎಲೆಕ್ಟ್ರಿಕಲ್ ವರ್ಕ್‌ಶಾಪ್ ಸಹಾಯಕ ಮತ್ತು ವೈರಿಂಗ್ ತರಬೇತಿದಾರ',
        title_hindi='इलेक्ट्रिकल वर्कशॉप सहायक एवं वायरिंग ट्रेनी',
        category='Electrical & Repair',
        description='Urgent opening for a motivated young person to assist in domestic switchboard wiring, fan/cooler repairs, and solar panel inverter setups. We provide on-the-job training with senior technicians. Free lunch provided.',
        required_skills=['Electrical Repair', 'Wiring', 'Appliance Repair'],
        preferred_education='PUC / 10th / ITI or Practical Experience',
        min_salary=12000,
        max_salary=16000,
        salary_period='month',
        job_type='full-time',
        is_micro_opportunity=False,
        working_hours='9:00 AM - 6:30 PM (Sunday Half Day)',
        village='Bantwal Town',
        district='Dakshina Kannada',
        state='Karnataka',
        latitude=12.8988,
        longitude=75.0380,
        vacancies=2,
        status='active',
        is_verified=True,
        scam_flag_count=0
    )
    db.session.add(job1)

    job2 = Job(
        employer_id=krishna_works.id,
        title='Solar Rooftop Installation Helper',
        title_kannada='ಸೌರಶಕ್ತಿ ಸೋಲಾರ್ ಫಲಕ ಅಳವಡಿಕೆ ಸಹಾಯಕ',
        title_hindi='सोलर रूफटॉप इंस्टालेशन सहायक',
        category='Electrical & Repair',
        description='Support our solar installation crew in mounting solar panels, drilling brackets, and DC wiring across agricultural pump stations and residential homes.',
        required_skills=['Wiring', 'Circuit Testing', 'Solar Installation'],
        preferred_education='10th Standard or Practical experience',
        min_salary=13500,
        max_salary=18000,
        salary_period='month',
        job_type='full-time',
        is_micro_opportunity=False,
        working_hours='8:30 AM - 5:30 PM',
        village='Bantwal Town',
        district='Dakshina Kannada',
        state='Karnataka',
        latitude=12.9020,
        longitude=75.0410,
        vacancies=3,
        status='active',
        is_verified=True,
        scam_flag_count=0
    )
    db.session.add(job2)

    job3 = Job(
        employer_id=sahyadri_agro.id,
        title='Seasonal Arecanut & Pepper Harvest Supervisor',
        title_kannada='ಅಡಿಕೆ ಮತ್ತು ಕಾಳುಮೆಣಸು ಕೊಯ್ಲು ಮೇಲ್ವಿಚಾರಕ (ಸೀಸನಲ್)',
        title_hindi='सुपारी एवं काली मिर्च कटाई पर्यवेक्षक (मौसमी)',
        category='Agriculture',
        description='Short-term micro-opportunity for 45 days. Coordinate village harvest workers, record daily harvest yields in kg, and supervise sun-drying yards. High daily wages + overtime bonus.',
        required_skills=['Farm Equipment', 'Data Entry', 'Customer Handling'],
        preferred_education='10th Standard or PUC',
        min_salary=600,
        max_salary=800,
        salary_period='day',
        job_type='seasonal',
        is_micro_opportunity=True,
        duration_days=45,
        working_hours='7:30 AM - 4:30 PM',
        village='Thirthahalli Road',
        district='Shivamogga',
        state='Karnataka',
        latitude=13.9299,
        longitude=75.5681,
        vacancies=5,
        status='active',
        is_verified=True,
        scam_flag_count=0
    )
    db.session.add(job3)

    job4 = Job(
        employer_id=cauvery_mart.id,
        title='Retail Store Billing & Inventory Assistant',
        title_kannada='ಚಿಲ್ಲರೆ ಅಂಗಡಿ ಬಿಲ್ಲಿಂಗ್ ಮತ್ತು ದಾಸ್ತಾನು ಸಹಾಯಕ',
        title_hindi='रिटेल स्टोर बिलिंग एवं इन्वेंट्री सहायक',
        category='Retail',
        description='Looking for an honest, friendly local youth to manage barcode POS billing counter, accept UPI/cash payments, and assist customers in finding items. Basic Kannada reading/writing required.',
        required_skills=['Retail Sales', 'Billing', 'Data Entry', 'Customer Handling'],
        preferred_education='10th Pass or PUC',
        min_salary=11500,
        max_salary=15000,
        salary_period='month',
        job_type='full-time',
        is_micro_opportunity=False,
        working_hours='9:30 AM - 7:30 PM (Weekly Off on Tuesday)',
        village='Mandya City',
        district='Mandya',
        state='Karnataka',
        latitude=12.5230,
        longitude=76.8970,
        vacancies=2,
        status='active',
        is_verified=True,
        scam_flag_count=0
    )
    db.session.add(job4)

    job5 = Job(
        employer_id=cauvery_mart.id,
        title='Weekend Delivery & Stock Support (Micro-Gig)',
        title_kannada='ವಾರಾಂತ್ಯದ ಡೆಲಿವರಿ ಮತ್ತು ಸ್ಟಾಕ್ ಸಹಾಯಕ',
        title_hindi='वीकेंड डिलीवरी एवं स्टॉक सहायक (माइक्रो-गिग)',
        category='Delivery & Logistics',
        description='Weekend part-time role (Saturday & Sunday only). Deliver pre-ordered grocery baskets to local village customers within 8km radius using two-wheeler. Fuel allowance provided.',
        required_skills=['Customer Handling', 'Vehicle Repair'],
        preferred_education='Any / Able to read addresses',
        min_salary=500,
        max_salary=700,
        salary_period='day',
        job_type='part-time',
        is_micro_opportunity=True,
        duration_days=60,
        working_hours='10:00 AM - 6:00 PM (Sat-Sun)',
        village='Mandya City',
        district='Mandya',
        state='Karnataka',
        latitude=12.5230,
        longitude=76.8970,
        vacancies=3,
        status='active',
        is_verified=True,
        scam_flag_count=0
    )
    db.session.add(job5)

    # Job 6: Under review / Pending demo for Admin
    job6 = Job(
        employer_id=krishna_works.id,
        title='Appliance Repair & Field Executive',
        title_kannada='ಗೃಹೋಪಯೋಗಿ ವಸ್ತುಗಳ ದುರಸ್ತಿ ಕಾರ್ಯನಿರ್ವಾಹಕ',
        title_hindi='घरेलू उपकरण मरम्मत एवं फील्ड एग्जीक्यूटिव',
        category='Electrical & Repair',
        description='Field visits across Puttur and Belthangady for washing machine and mixer grinder repairs.',
        required_skills=['Appliance Repair', 'Customer Handling'],
        preferred_education='ITI / Diploma',
        min_salary=14000,
        max_salary=18000,
        salary_period='month',
        job_type='full-time',
        is_micro_opportunity=False,
        working_hours='9:00 AM - 6:00 PM',
        village='Bantwal Town',
        district='Dakshina Kannada',
        state='Karnataka',
        latitude=12.8988,
        longitude=75.0380,
        vacancies=1,
        status='under_review',
        is_verified=False,
        scam_flag_count=0
    )
    db.session.add(job6)

    db.session.flush()

    # 5. APPLICATIONS (Showing realistic workflow)
    # Praveen applied to Krishna Electrical Works
    app1 = Application(
        job_id=job1.id,
        youth_id=praveen_profile.id,
        status='shortlisted',
        cover_note='I have 1.5 years practical hands-on experience in domestic switchboard wiring and live just 3.5 km away in Bantwal Grama.',
        match_score=94.5,
        match_reasons=[
            'Strong skill match: Electrical Repair, Wiring, Appliance Repair verified.',
            'Zero commute barrier: Only 3.8 km from your village.',
            'Salary expectations (₹14,000) well within budget (₹12,000 - ₹16,000).'
        ],
        employer_notes='Good practical hands-on experience. Called candidate for trial workshop visit this Friday.'
    )
    db.session.add(app1)

    # Anitha applied to Cauvery Supermarket
    app2 = Application(
        job_id=job4.id,
        youth_id=anitha_profile.id,
        status='interview_scheduled',
        cover_note='B.Com graduate with 1 year experience managing computerized invoices and retail inventory.',
        match_score=91.0,
        match_reasons=[
            'Strong qualification match: B.Com with Retail Sales and Data Entry.',
            'Immediate availability for full-time counter position.'
        ],
        employer_notes='Interview scheduled for 10:30 AM via WhatsApp video call.'
    )
    db.session.add(app2)

    # Ramesh applied to Sahyadri Agro
    app3 = Application(
        job_id=job3.id,
        youth_id=ramesh_profile.id,
        status='applied',
        cover_note='Expert in farm equipment operation, tractor hauling, and post-harvest transport.',
        match_score=82.0,
        match_reasons=[
            'Matches Farm Equipment and physical supervision requirements.',
            'Seasonal availability perfectly fits 45-day harvest schedule.'
        ]
    )
    db.session.add(app3)

    # 6. LEARNING RESOURCES (Practical & Free)
    res1 = LearningResource(
        title='Domestic Single-Phase Wiring & Distribution Board Assembly',
        title_kannada='ಮನೆ ಸಿಂಗಲ್-ಫೇಸ್ ವೈರಿಂಗ್ ಮತ್ತು ಸ್ವಿಚ್‌ಬೋರ್ಡ್ ಜೋಡಣೆ',
        title_hindi='घरेलू सिंगल-फेज वायरिंग एवं वितरण बोर्ड असेंबली',
        category='Electrical & Repair',
        skill_target='Wiring',
        description='Learn color coding of wires (Phase, Neutral, Ground), MCB ratings, switchboard socket connections, and inverter hookup guidelines.',
        description_kannada='ವೈರಿಂಗ್ ಬಣ್ಣಗಳು, ಎಂಸಿಬಿ ರೇಟಿಂಗ್, ಸ್ವಿಚ್‌ಬೋರ್ಡ್ ಕನೆಕ್ಷನ್ ಮತ್ತು ಇನ್ವರ್ಟರ್ ಜೋಡಣೆ ಕುರಿತು ಸುಲಭ ಪ್ರಾತ್ಯಕ್ಷಿಕೆ.',
        description_hindi='तारों की कलर कोडिंग (फेज, न्यूट्रल, अर्थ), एमसीबी रेटिंग और इन्वर्टर कनेक्शन सीखें।',
        url='https://www.youtube.com/watch?v=demo_electrical_kannada',
        estimated_hours=8,
        difficulty='Beginner',
        format='Video',
        is_free=True,
        unlocks_job_types=['Electrical Assistant', 'Maintenance Helper', 'Workshop Electrician']
    )
    db.session.add(res1)

    res2 = LearningResource(
        title='Computer Spreadsheets for Village Retail & Inventory',
        title_kannada='ಗ್ರಾಮೀಣ ಅಂಗಡಿಗಳಿಗೆ ಎಕ್ಸೆಲ್ ಸ್ಪ್ರೆಡ್‌ಶೀಟ್ ಮತ್ತು ಬಿಲ್ಲಿಂಗ್ ಲೆಡ್ಜರ್',
        title_hindi='ग्रामीण खुदरा एवं इन्वेंट्री हेतु कंप्यूटर स्प्रेडशीट',
        category='Office & Computer',
        skill_target='Spreadsheet Basics',
        description='Step-by-step tutorial on recording stock in/out, customer credit (Udhaar) ledgers, and auto-calculating monthly sales.',
        description_kannada='ಅಂಗಡಿಯ ಸರಕು ಲೆಕ್ಕ, ಗ್ರಾಹಕರ ಬಾಕಿ ವಹಿ ಮತ್ತು ಮಾಸಿಕ ಮಾರಾಟ ಲೆಕ್ಕಾಚಾರವನ್ನು ಕಂಪ್ಯೂಟರ್‌ನಲ್ಲಿ ನಿರ್ವಹಿಸುವುದು ಹೇಗೆ.',
        description_hindi='स्टॉक आवक/जावक, ग्राहक उधारी खाता और मासिक बिक्री गणना पर चरण-दर-चरण ट्यूटोरियल।',
        url='https://www.youtube.com/watch?v=demo_excel_kannada',
        estimated_hours=6,
        difficulty='Beginner',
        format='Hands-on',
        is_free=True,
        unlocks_job_types=['Data Entry Executive', 'Grama One Staff', 'Retail Cashier']
    )
    db.session.add(res2)

    res3 = LearningResource(
        title='Rooftop Solar PV Installation & Safety Basics',
        title_kannada='ರೂಫ್‌ಟಾಪ್ ಸೋಲಾರ್ ಪ್ಯಾನಲ್ ಅಳವಡಿಕೆ ಮತ್ತು ಸುರಕ್ಷತಾ ನಿಯಮಗಳು',
        title_hindi='रूफटॉप सोलर पीवी इंस्टालेशन एवं सुरक्षा मूल बातें',
        category='Electrical & Repair',
        skill_target='Solar Installation',
        description='Practical module on structure mounting, MC4 crimping, solar inverter wiring, and earth resistance testing for PM Surya Ghar.',
        description_kannada='ಸೋಲಾರ್ ಪ್ಯಾನಲ್ ಜೋಡಣೆ, ಇನ್ವರ್ಟರ್ ವೈರಿಂಗ್ ಮತ್ತು ಅರ್ಥಿಂಗ್ ಮಾಡುವ ಸುಲಭ ವಿಧಾನಗಳು.',
        description_hindi='सोलर पैनल माउंटिंग, एमसी4 क्रिम्पिंग और इन्वर्टर वायरिंग पर व्यावहारिक प्रशिक्षण।',
        url='https://www.youtube.com/watch?v=demo_solar_kannada',
        estimated_hours=10,
        difficulty='Beginner',
        format='Practical Guide',
        is_free=True,
        unlocks_job_types=['Solar Technician', 'Green Energy Assistant']
    )
    db.session.add(res3)

    db.session.flush()

    # 7. USER LEARNING PROGRESS
    prog1 = UserLearningProgress(
        youth_id=praveen_profile.id,
        resource_id=res1.id,
        status='completed',
        progress_percent=100
    )
    db.session.add(prog1)

    prog2 = UserLearningProgress(
        youth_id=praveen_profile.id,
        resource_id=res3.id,
        status='in_progress',
        progress_percent=45
    )
    db.session.add(prog2)

    # 8. COMMUNITY REFERRALS (From Gram Panchayat / SHG)
    ref1 = CommunityReferral(
        referrer_name='Shobha Gowda',
        referrer_phone='9845887766',
        referrer_organization='Sanjeevini Grama Panchayat SHG',
        youth_name='Mahesh Kumar',
        youth_phone='9845119988',
        target_sector='Electrical & Solar',
        village='Bantwal Grama',
        district='Dakshina Kannada',
        notes='Hardworking youth with basic ITI background seeking local workshop placement.',
        status='submitted'
    )
    db.session.add(ref1)

    # 9. JOB REPORT (Demonstrating Trust & Verification System for Admin)
    rep1 = JobReport(
        job_id=job6.id,
        reporter_id=youth_user2.id,
        reason='Registration fee inquiry',
        details='Listing asked for a ₹100 registration fee before workshop visit. Need admin check for authenticity.',
        status='pending'
    )
    db.session.add(rep1)

    # 10. NOTIFICATIONS
    notif1 = Notification(
        user_id=youth_user.id,
        title='Application Shortlisted! 🎉',
        message='Shree Krishna Electrical Works shortlisted your application for Electrical Workshop Assistant.',
        type='application_update',
        link='/dashboard/applications'
    )
    db.session.add(notif1)

    notif2 = Notification(
        user_id=employer_user.id,
        title='New Local Candidate Match Found',
        message='Praveen Kumar (3.8 km away) has a 94.5% match for your Electrical Workshop Assistant opening.',
        type='job_match',
        link='/employer/candidates'
    )
    db.session.add(notif2)

    db.session.commit()
    print("Database seeding completed successfully!")
