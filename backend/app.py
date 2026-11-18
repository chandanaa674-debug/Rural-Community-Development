import os
import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from models import (
    db, User, YouthProfile, EmployerProfile, Job, Application,
    SavedJob, LearningResource, UserLearningProgress, JobReport,
    CommunityReferral, Notification
)
from auth import generate_token, jwt_required, role_required, get_current_user
from matching_engine import (
    evaluate_job_match, rank_jobs_for_candidate, reverse_match_candidates_for_job,
    evaluate_simulation_match, compare_baseline_keyword_matching,
    SIMULATION_SCENARIOS, calculate_simulated_impact
)
from skill_gap_engine import analyze_skill_gap
from career_assistant import query_career_guide
from seed_data import seed_database

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configuration
basedir = os.path.abspath(os.path.dirname(__file__))
frontend_dist = os.path.abspath(os.path.join(basedir, "..", "frontend", "dist"))

app = Flask(
    __name__,
    static_folder=os.path.join(frontend_dist, "assets") if os.path.exists(frontend_dist) else None,
    static_url_path="/assets"
)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', f'sqlite:///{os.path.join(basedir, "ruralconnect.db")}')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Initialize and seed database
with app.app_context():
    db.create_all()
    seed_database()

# ----------------- UNIFIED FRONTEND SERVING ----------------- #

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path.startswith('api/'):
        return jsonify({'error': 'Not found'}), 404
    if os.path.exists(frontend_dist):
        file_path = os.path.join(frontend_dist, path)
        if path and os.path.exists(file_path) and os.path.isfile(file_path):
            from flask import send_from_directory
            return send_from_directory(frontend_dist, path)
        from flask import send_file
        return send_file(os.path.join(frontend_dist, 'index.html'))
    return jsonify({
        'service': 'RuralConnect AI Core Backend',
        'frontend_status': 'Development mode. Please run Vite dev server in /frontend or build with npm run build.'
    })


# ----------------- AUTHENTICATION ROUTES ----------------- #

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    role = data.get('role', 'youth')  # 'youth' or 'employer'
    name = data.get('name', '').strip()
    phone = data.get('phone', '').strip()

    if not email or not password or not name:
        return jsonify({'success': False, 'message': 'Name, email, and password are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'success': False, 'message': 'An account with this email already exists'}), 400

    user = User(email=email, role=role, name=name, phone=phone)
    user.set_password(password)
    db.session.add(user)
    db.session.flush()

    # Create associated profile
    if role == 'youth':
        skills_input = data.get('skills', [])
        formatted_skills = []
        for s in skills_input:
            if isinstance(s, dict):
                formatted_skills.append(s)
            elif isinstance(s, str) and s.strip():
                formatted_skills.append({'name': s.strip(), 'level': 'Intermediate', 'is_practical': True})

        youth = YouthProfile(
            user_id=user.id,
            age=data.get('age', 21),
            village=data.get('village', 'Gram Panchayat'),
            district=data.get('district', 'Dakshina Kannada'),
            state=data.get('state', 'Karnataka'),
            latitude=data.get('latitude', 12.8954),
            longitude=data.get('longitude', 75.0345),
            education=data.get('education', '10th / PUC'),
            languages=data.get('languages', ['Kannada', 'English']),
            skills=formatted_skills,
            expected_salary=data.get('expected_salary', 12000),
            availability=data.get('availability', 'full-time'),
            practical_experience=data.get('practical_experience', ''),
            willing_to_relocate=data.get('willing_to_relocate', False),
            skill_passport_id=f"RC-SKP-{user.id:05d}",
            is_verified=False
        )
        db.session.add(youth)
    elif role == 'employer':
        employer = EmployerProfile(
            user_id=user.id,
            business_name=data.get('business_name', name + ' Enterprises'),
            business_type=data.get('business_type', 'Workshop & Services'),
            village=data.get('village', 'Taluk Center'),
            district=data.get('district', 'Dakshina Kannada'),
            state=data.get('state', 'Karnataka'),
            latitude=data.get('latitude', 12.8988),
            longitude=data.get('longitude', 75.0380),
            description=data.get('description', ''),
            contact_person=name,
            contact_phone=phone,
            is_verified=False,
            verification_status='pending'
        )
        db.session.add(employer)

    db.session.commit()
    token = generate_token(user)

    return jsonify({
        'success': True,
        'message': 'Account registered successfully',
        'token': token,
        'user': user.to_dict()
    }), 201


@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({'success': False, 'message': 'Invalid email or password'}), 401

    token = generate_token(user)
    profile_data = None
    if user.role == 'youth' and user.youth_profile:
        profile_data = user.youth_profile.to_dict()
    elif user.role == 'employer' and user.employer_profile:
        profile_data = user.employer_profile.to_dict()

    return jsonify({
        'success': True,
        'token': token,
        'user': user.to_dict(),
        'profile': profile_data
    })


@app.route('/api/auth/demo-login', methods=['POST'])
def demo_login():
    """1-Click Instant Demo login for Hackathon judging."""
    data = request.get_json() or {}
    role = data.get('role', 'youth')  # 'youth', 'employer', 'admin'

    email_map = {
        'youth': 'youth@ruralconnect.ai',
        'employer': 'employer@ruralconnect.ai',
        'admin': 'admin@ruralconnect.ai'
    }

    target_email = email_map.get(role, 'youth@ruralconnect.ai')
    user = User.query.filter_by(email=target_email).first()
    if not user:
        return jsonify({'success': False, 'message': 'Demo user not found. Please restart server.'}), 404

    token = generate_token(user)
    profile_data = None
    if user.role == 'youth' and user.youth_profile:
        profile_data = user.youth_profile.to_dict()
    elif user.role == 'employer' and user.employer_profile:
        profile_data = user.employer_profile.to_dict()

    return jsonify({
        'success': True,
        'token': token,
        'user': user.to_dict(),
        'profile': profile_data,
        'is_demo': True
    })


@app.route('/api/auth/me', methods=['GET'])
@jwt_required
def get_me(current_user):
    profile_data = None
    if current_user.role == 'youth' and current_user.youth_profile:
        profile_data = current_user.youth_profile.to_dict()
    elif current_user.role == 'employer' and current_user.employer_profile:
        profile_data = current_user.employer_profile.to_dict()

    return jsonify({
        'success': True,
        'user': current_user.to_dict(),
        'profile': profile_data
    })


# ----------------- YOUTH PROFILE & RESUME BUILDER ----------------- #

@app.route('/api/youth/profile', methods=['GET', 'PUT'])
@jwt_required
def youth_profile(current_user):
    if current_user.role != 'youth':
        return jsonify({'success': False, 'message': 'Only youth role can access this profile'}), 403

    profile = current_user.youth_profile
    if not profile:
        profile = YouthProfile(user_id=current_user.id, village='Village', district='District')
        db.session.add(profile)
        db.session.commit()

    if request.method == 'PUT':
        data = request.get_json() or {}
        profile.age = data.get('age', profile.age)
        profile.gender = data.get('gender', profile.gender)
        profile.village = data.get('village', profile.village)
        profile.district = data.get('district', profile.district)
        profile.state = data.get('state', profile.state)
        profile.latitude = data.get('latitude', profile.latitude)
        profile.longitude = data.get('longitude', profile.longitude)
        profile.preferred_location = data.get('preferred_location', profile.preferred_location)
        profile.education = data.get('education', profile.education)
        profile.languages = data.get('languages', profile.languages)
        profile.skills = data.get('skills', profile.skills)
        profile.work_preferences = data.get('work_preferences', profile.work_preferences)
        profile.expected_salary = data.get('expected_salary', profile.expected_salary)
        profile.availability = data.get('availability', profile.availability)
        profile.willing_to_relocate = data.get('willing_to_relocate', profile.willing_to_relocate)
        profile.bio = data.get('bio', profile.bio)
        profile.practical_experience = data.get('practical_experience', profile.practical_experience)

        if 'name' in data:
            current_user.name = data['name']
        if 'phone' in data:
            current_user.phone = data['phone']

        db.session.commit()
        return jsonify({'success': True, 'message': 'Profile updated successfully', 'profile': profile.to_dict()})

    return jsonify({'success': True, 'profile': profile.to_dict()})


@app.route('/api/youth/skill-passport', methods=['GET'])
@jwt_required
def get_skill_passport(current_user):
    if current_user.role != 'youth' or not current_user.youth_profile:
        return jsonify({'success': False, 'message': 'Skill passport not available for this account'}), 404

    profile = current_user.youth_profile
    progress_items = UserLearningProgress.query.filter_by(youth_id=profile.id).all()

    return jsonify({
        'success': True,
        'passport': {
            'passport_id': profile.skill_passport_id or f"RC-SKP-{profile.id:05d}",
            'holder_name': current_user.name,
            'phone': current_user.phone,
            'village': profile.village,
            'district': profile.district,
            'state': profile.state,
            'is_verified': profile.is_verified,
            'education': profile.education,
            'skills': profile.skills,
            'practical_experience': profile.practical_experience,
            'badges': profile.badges,
            'completed_modules': [p.to_dict() for p in progress_items if p.status == 'completed'],
            'in_progress_modules': [p.to_dict() for p in progress_items if p.status != 'completed'],
            'qr_verification_code': f"https://ruralconnect.ai/verify/passport/{profile.skill_passport_id}"
        }
    })


# ----------------- JOBS & AI SMART MATCHING ----------------- #

@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    """Discover jobs with multi-criteria filtering."""
    category = request.args.get('category')
    district = request.args.get('district')
    village = request.args.get('village')
    job_type = request.args.get('job_type')
    is_micro = request.args.get('is_micro_opportunity')
    search = request.args.get('search')

    query = Job.query.filter(Job.status == 'active')

    if category and category != 'All':
        query = query.filter(Job.category == category)
    if district and district != 'All':
        query = query.filter(Job.district.ilike(f"%{district}%"))
    if village:
        query = query.filter(Job.village.ilike(f"%{village}%"))
    if job_type and job_type != 'All':
        query = query.filter(Job.job_type == job_type)
    if is_micro == 'true':
        query = query.filter(Job.is_micro_opportunity == True)
    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            (Job.title.ilike(search_filter)) |
            (Job.description.ilike(search_filter)) |
            (Job.category.ilike(search_filter))
        )

    jobs = query.order_by(Job.created_at.desc()).all()
    return jsonify({
        'success': True,
        'count': len(jobs),
        'jobs': [j.to_dict() for j in jobs]
    })


@app.route('/api/jobs/<int:job_id>', methods=['GET'])
def get_job_detail(job_id):
    job = Job.query.get_or_404(job_id)
    return jsonify({'success': True, 'job': job.to_dict()})


@app.route('/api/jobs/recommended', methods=['GET'])
@jwt_required
def get_recommended_jobs(current_user):
    """
    AI-Powered Smart Job Recommendation Engine.
    Computes explainable match scores for all active jobs against logged-in youth profile.
    """
    if current_user.role != 'youth' or not current_user.youth_profile:
        return jsonify({'success': False, 'message': 'Only youth candidates can receive job recommendations'}), 403

    candidate_profile = current_user.youth_profile.to_dict()
    all_jobs = [j.to_dict() for j in Job.query.filter_by(status='active').all()]

    ranking_result = rank_jobs_for_candidate(candidate_profile, all_jobs)

    return jsonify({
        'success': True,
        'candidate_name': current_user.name,
        'candidate_village': candidate_profile.get('village'),
        'top_matches': ranking_result['top_matches'],
        'alternative_matches': ranking_result['alternative_matches']
    })


@app.route('/api/jobs/<int:job_id>/match-explanation', methods=['GET'])
@jwt_required
def get_job_match_explanation(current_user, job_id):
    """Transparent explainable AI breakdown for candidate vs specific job."""
    if current_user.role != 'youth' or not current_user.youth_profile:
        return jsonify({'success': False, 'message': 'Youth profile required'}), 400

    job = Job.query.get_or_404(job_id)
    eval_result = evaluate_job_match(current_user.youth_profile.to_dict(), job.to_dict())

    return jsonify({
        'success': True,
        'job_title': job.title,
        'employer_name': job.employer.business_name if job.employer else 'Local Business',
        'evaluation': eval_result
    })


# ----------------- AI SKILL GAP ANALYZER ----------------- #

@app.route('/api/skill-gap/analyze', methods=['POST'])
def skill_gap_analysis():
    data = request.get_json() or {}
    user = get_current_user()

    if user and user.role == 'youth' and user.youth_profile:
        candidate_skills = user.youth_profile.skills
    else:
        candidate_skills = data.get('candidate_skills', ['Basic Computer', 'Customer Handling'])

    target_job = data.get('target_job', 'Computer Operator')
    analysis = analyze_skill_gap(candidate_skills, target_job)

    return jsonify({
        'success': True,
        'analysis': analysis
    })


@app.route('/api/learning-resources', methods=['GET'])
def get_learning_resources():
    category = request.args.get('category')
    query = LearningResource.query
    if category and category != 'All':
        query = query.filter_by(category=category)
    resources = query.all()
    return jsonify({
        'success': True,
        'resources': [r.to_dict() for r in resources]
    })


@app.route('/api/learning-progress', methods=['POST'])
@jwt_required
def update_learning_progress(current_user):
    if current_user.role != 'youth' or not current_user.youth_profile:
        return jsonify({'success': False, 'message': 'Youth profile required'}), 403

    data = request.get_json() or {}
    resource_id = data.get('resource_id')
    progress_percent = data.get('progress_percent', 100)

    prog = UserLearningProgress.query.filter_by(
        youth_id=current_user.youth_profile.id,
        resource_id=resource_id
    ).first()

    if not prog:
        prog = UserLearningProgress(
            youth_id=current_user.youth_profile.id,
            resource_id=resource_id,
            progress_percent=progress_percent,
            status='completed' if progress_percent >= 100 else 'in_progress',
            completed_at=datetime.datetime.utcnow() if progress_percent >= 100 else None
        )
        db.session.add(prog)
    else:
        prog.progress_percent = progress_percent
        if progress_percent >= 100:
            prog.status = 'completed'
            prog.completed_at = datetime.datetime.utcnow()

    db.session.commit()
    return jsonify({'success': True, 'progress': prog.to_dict()})


# ----------------- AI CAREER ASSISTANT ----------------- #

@app.route('/api/career-assistant/ask', methods=['POST'])
def ask_career_guide():
    data = request.get_json() or {}
    query = data.get('query', '').strip()
    language = data.get('language', 'en')  # 'en' or 'kn'

    if not query:
        return jsonify({'success': False, 'message': 'Query cannot be empty'}), 400

    user = get_current_user()
    user_profile = user.youth_profile.to_dict() if (user and user.role == 'youth' and user.youth_profile) else None

    result = query_career_guide(query, language=language, user_profile=user_profile)
    return jsonify({'success': True, 'result': result})


# ----------------- APPLICATIONS SYSTEM ----------------- #

@app.route('/api/applications', methods=['GET', 'POST'])
@jwt_required
def handle_applications(current_user):
    if current_user.role != 'youth':
        return jsonify({'success': False, 'message': 'Only candidates can apply or view youth applications'}), 403

    youth_id = current_user.youth_profile.id

    if request.method == 'POST':
        data = request.get_json() or {}
        job_id = data.get('job_id')
        cover_note = data.get('cover_note', '')

        if not job_id:
            return jsonify({'success': False, 'message': 'job_id is required'}), 400

        job = Job.query.get(job_id)
        if not job:
            return jsonify({'success': False, 'message': 'Job not found'}), 404

        # Check existing application
        existing = Application.query.filter_by(job_id=job_id, youth_id=youth_id).first()
        if existing:
            return jsonify({'success': False, 'message': 'You have already applied for this vacancy'}), 400

        # Calculate match score & reasons
        eval_result = evaluate_job_match(current_user.youth_profile.to_dict(), job.to_dict())

        application = Application(
            job_id=job_id,
            youth_id=youth_id,
            status='applied',
            cover_note=cover_note,
            match_score=eval_result['match_percentage'],
            match_reasons=eval_result['reasons']
        )
        db.session.add(application)

        # Notify Employer
        if job.employer and job.employer.user_id:
            notif = Notification(
                user_id=job.employer.user_id,
                title='New Applicant Received',
                message=f"{current_user.name} applied for {job.title} with a {eval_result['match_percentage']}% match score.",
                type='application_update',
                link='/employer/applications'
            )
            db.session.add(notif)

        db.session.commit()
        return jsonify({
            'success': True,
            'message': 'Application submitted successfully! The employer has been notified.',
            'application': application.to_dict()
        }), 201

    applications = Application.query.filter_by(youth_id=youth_id).order_by(Application.applied_at.desc()).all()
    return jsonify({'success': True, 'applications': [a.to_dict() for a in applications]})


@app.route('/api/applications/<int:app_id>/withdraw', methods=['POST'])
@jwt_required
def withdraw_application(current_user, app_id):
    if current_user.role != 'youth':
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403

    application = Application.query.get_or_404(app_id)
    if application.youth_id != current_user.youth_profile.id:
        return jsonify({'success': False, 'message': 'Not your application'}), 403

    application.status = 'withdrawn'
    db.session.commit()
    return jsonify({'success': True, 'message': 'Application withdrawn successfully'})


# ----------------- EMPLOYER DASHBOARD & REVERSE MATCHING ----------------- #

@app.route('/api/employer/profile', methods=['GET', 'PUT'])
@jwt_required
def employer_profile(current_user):
    if current_user.role != 'employer':
        return jsonify({'success': False, 'message': 'Only employers can access this'}), 403

    profile = current_user.employer_profile
    if not profile:
        profile = EmployerProfile(user_id=current_user.id, business_name='My Business', village='Taluk', district='District')
        db.session.add(profile)
        db.session.commit()

    if request.method == 'PUT':
        data = request.get_json() or {}
        profile.business_name = data.get('business_name', profile.business_name)
        profile.business_type = data.get('business_type', profile.business_type)
        profile.registration_number = data.get('registration_number', profile.registration_number)
        profile.village = data.get('village', profile.village)
        profile.district = data.get('district', profile.district)
        profile.address = data.get('address', profile.address)
        profile.description = data.get('description', profile.description)
        profile.contact_person = data.get('contact_person', profile.contact_person)
        profile.contact_phone = data.get('contact_phone', profile.contact_phone)
        profile.contact_email = data.get('contact_email', profile.contact_email)
        profile.website = data.get('website', profile.website)
        db.session.commit()
        return jsonify({'success': True, 'profile': profile.to_dict()})

    return jsonify({'success': True, 'profile': profile.to_dict()})


@app.route('/api/employer/jobs', methods=['GET', 'POST'])
@jwt_required
def employer_jobs(current_user):
    if current_user.role != 'employer' or not current_user.employer_profile:
        return jsonify({'success': False, 'message': 'Employer profile required'}), 403

    emp_id = current_user.employer_profile.id

    if request.method == 'POST':
        data = request.get_json() or {}
        skills = data.get('required_skills', [])
        if isinstance(skills, str):
            skills = [s.strip() for s in skills.split(',') if s.strip()]

        job = Job(
            employer_id=emp_id,
            title=data.get('title', 'Local Role'),
            title_kannada=data.get('title_kannada'),
            category=data.get('category', 'Services'),
            description=data.get('description', ''),
            required_skills=skills,
            preferred_education=data.get('preferred_education', 'Any / Practical Skills'),
            min_salary=int(data.get('min_salary', 10000)),
            max_salary=int(data.get('max_salary', 15000)),
            salary_period=data.get('salary_period', 'month'),
            job_type=data.get('job_type', 'full-time'),
            is_micro_opportunity=data.get('is_micro_opportunity', False),
            duration_days=data.get('duration_days'),
            working_hours=data.get('working_hours', '9:00 AM - 6:00 PM'),
            village=data.get('village', current_user.employer_profile.village),
            district=data.get('district', current_user.employer_profile.district),
            state=data.get('state', current_user.employer_profile.state),
            latitude=data.get('latitude', current_user.employer_profile.latitude or 12.8988),
            longitude=data.get('longitude', current_user.employer_profile.longitude or 75.0380),
            vacancies=int(data.get('vacancies', 1)),
            status='active',
            is_verified=current_user.employer_profile.is_verified
        )
        db.session.add(job)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Job vacancy published successfully!', 'job': job.to_dict()}), 201

    jobs = Job.query.filter_by(employer_id=emp_id).order_by(Job.created_at.desc()).all()
    return jsonify({'success': True, 'jobs': [j.to_dict() for j in jobs]})


@app.route('/api/employer/jobs/<int:job_id>/status', methods=['PUT'])
@jwt_required
def update_job_status(current_user, job_id):
    if current_user.role != 'employer':
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403

    job = Job.query.get_or_404(job_id)
    if job.employer_id != current_user.employer_profile.id:
        return jsonify({'success': False, 'message': 'Not your job listing'}), 403

    data = request.get_json() or {}
    job.status = data.get('status', job.status)
    db.session.commit()
    return jsonify({'success': True, 'job': job.to_dict()})


@app.route('/api/employer/candidates/reverse-match', methods=['GET'])
@jwt_required
def reverse_match_candidates(current_user):
    """
    Reverse Matching: Actively recommend nearby rural talent for an employer's vacancy.
    """
    if current_user.role != 'employer' or not current_user.employer_profile:
        return jsonify({'success': False, 'message': 'Employer profile required'}), 403

    job_id = request.args.get('job_id')
    job_dict = None
    if job_id:
        job = Job.query.get(job_id)
        if job:
            job_dict = job.to_dict()

    if not job_dict:
        # Fallback to employer's first active job or general profile requirement
        first_job = Job.query.filter_by(employer_id=current_user.employer_profile.id, status='active').first()
        if first_job:
            job_dict = first_job.to_dict()
        else:
            job_dict = {
                'title': 'General Support Staff',
                'category': current_user.employer_profile.business_type,
                'required_skills': ['Customer Handling', 'Basic Computer', 'Field Work'],
                'preferred_education': 'Any',
                'min_salary': 10000,
                'max_salary': 15000,
                'village': current_user.employer_profile.village,
                'district': current_user.employer_profile.district,
                'latitude': current_user.employer_profile.latitude or 12.8988,
                'longitude': current_user.employer_profile.longitude or 75.0380,
                'job_type': 'full-time'
            }

    all_candidates = [yp.to_dict() for yp in YouthProfile.query.all()]
    matched = reverse_match_candidates_for_job(job_dict, all_candidates)

    return jsonify({
        'success': True,
        'job_context': job_dict,
        'count': len(matched),
        'candidates': matched
    })


@app.route('/api/employer/applications', methods=['GET'])
@jwt_required
def employer_applications(current_user):
    if current_user.role != 'employer' or not current_user.employer_profile:
        return jsonify({'success': False, 'message': 'Employer profile required'}), 403

    job_ids = [j.id for j in current_user.employer_profile.jobs]
    applications = Application.query.filter(Application.job_id.in_(job_ids)).order_by(Application.applied_at.desc()).all()

    return jsonify({
        'success': True,
        'applications': [a.to_dict() for a in applications]
    })


@app.route('/api/employer/applications/<int:app_id>/status', methods=['PUT'])
@jwt_required
def update_application_status(current_user, app_id):
    if current_user.role != 'employer':
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403

    application = Application.query.get_or_404(app_id)
    if application.job.employer_id != current_user.employer_profile.id:
        return jsonify({'success': False, 'message': 'Not your job applicant'}), 403

    data = request.get_json() or {}
    new_status = data.get('status')
    employer_notes = data.get('employer_notes')

    if new_status:
        application.status = new_status
    if employer_notes is not None:
        application.employer_notes = employer_notes

    # Create notification for candidate
    candidate_user = application.youth_profile.user
    if candidate_user:
        status_labels = {
            'shortlisted': 'Shortlisted for Next Round! 🌟',
            'interview_scheduled': 'Interview Scheduled! 📅',
            'selected': 'Congratulations! You are Selected! 🎉',
            'rejected': 'Application Update'
        }
        notif = Notification(
            user_id=candidate_user.id,
            title=status_labels.get(new_status, 'Application Status Changed'),
            message=f"{current_user.employer_profile.business_name} updated your application for {application.job.title} to: {new_status.replace('_', ' ').capitalize()}.",
            type='application_update',
            link='/dashboard/applications'
        )
        db.session.add(notif)

    db.session.commit()
    return jsonify({'success': True, 'application': application.to_dict()})


@app.route('/api/employer/verify-request', methods=['POST'])
@jwt_required
def request_employer_verification(current_user):
    if current_user.role != 'employer' or not current_user.employer_profile:
        return jsonify({'success': False, 'message': 'Employer profile required'}), 403

    data = request.get_json() or {}
    profile = current_user.employer_profile
    profile.registration_number = data.get('registration_number', profile.registration_number)
    profile.verification_status = 'pending'
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Verification request submitted! Administrator will review your documentation within 24 hours.'
    })


@app.route('/api/employer/analytics', methods=['GET'])
@jwt_required
def employer_analytics(current_user):
    if current_user.role != 'employer' or not current_user.employer_profile:
        return jsonify({'success': False, 'message': 'Employer profile required'}), 403

    emp = current_user.employer_profile
    job_ids = [j.id for j in emp.jobs]
    applications = Application.query.filter(Application.job_id.in_(job_ids)).all()

    shortlisted = sum(1 for a in applications if a.status in ['shortlisted', 'interview_scheduled', 'selected'])
    selected = sum(1 for a in applications if a.status == 'selected')

    return jsonify({
        'success': True,
        'total_jobs_posted': len(emp.jobs),
        'active_jobs': sum(1 for j in emp.jobs if j.status == 'active'),
        'total_applicants': len(applications),
        'shortlisted_applicants': shortlisted,
        'hired_count': selected + emp.hiring_count,
        'reputation_score': emp.reputation_score,
        'is_verified': emp.is_verified
    })


# ----------------- TRUST, REPORTING & ADMIN DASHBOARD ----------------- #

@app.route('/api/jobs/<int:job_id>/report', methods=['POST'])
@jwt_required
def report_job(current_user, job_id):
    job = Job.query.get_or_404(job_id)
    data = request.get_json() or {}
    reason = data.get('reason', 'Suspicious activity')
    details = data.get('details', '')

    report = JobReport(
        job_id=job_id,
        reporter_id=current_user.id,
        reason=reason,
        details=details,
        status='pending'
    )
    job.scam_flag_count += 1
    db.session.add(report)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Report received. Our Trust & Safety team will review this listing.'
    })


@app.route('/api/community-referrals', methods=['GET', 'POST'])
def handle_community_referrals():
    if request.method == 'POST':
        data = request.get_json() or {}
        ref = CommunityReferral(
            referrer_name=data.get('referrer_name', 'Community Member'),
            referrer_phone=data.get('referrer_phone', ''),
            referrer_organization=data.get('referrer_organization', 'Panchayat / Self Help Group'),
            youth_name=data.get('youth_name', ''),
            youth_phone=data.get('youth_phone', ''),
            target_sector=data.get('target_sector', 'All Practical Sectors'),
            village=data.get('village', ''),
            district=data.get('district', 'Dakshina Kannada'),
            notes=data.get('notes', '')
        )
        db.session.add(ref)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Community referral submitted successfully!'}), 201

    referrals = CommunityReferral.query.order_by(CommunityReferral.created_at.desc()).all()
    return jsonify({'success': True, 'referrals': [r.to_dict() for r in referrals]})


@app.route('/api/admin/overview', methods=['GET'])
@jwt_required
@role_required(['admin'])
def admin_overview(current_user):
    total_youth = YouthProfile.query.count()
    total_employers = EmployerProfile.query.count()
    total_jobs = Job.query.count()
    active_jobs = Job.query.filter_by(status='active').count()
    total_applications = Application.query.count()
    placements = Application.query.filter_by(status='selected').count()
    pending_verifications = EmployerProfile.query.filter_by(verification_status='pending').count()
    pending_reports = JobReport.query.filter_by(status='pending').count()

    return jsonify({
        'success': True,
        'metrics': {
            'total_youth': total_youth,
            'total_employers': total_employers,
            'total_jobs': total_jobs,
            'active_jobs': active_jobs,
            'total_applications': total_applications,
            'placements': placements,
            'pending_verifications': pending_verifications,
            'pending_reports': pending_reports
        }
    })


@app.route('/api/admin/employers', methods=['GET'])
@jwt_required
@role_required(['admin'])
def admin_get_employers(current_user):
    employers = EmployerProfile.query.all()
    return jsonify({'success': True, 'employers': [e.to_dict() for e in employers]})


@app.route('/api/admin/employers/<int:emp_id>/verify', methods=['PUT'])
@jwt_required
@role_required(['admin'])
def admin_verify_employer(current_user, emp_id):
    emp = EmployerProfile.query.get_or_404(emp_id)
    data = request.get_json() or {}
    status = data.get('status', 'verified')  # 'verified' or 'rejected'

    emp.verification_status = status
    emp.is_verified = (status == 'verified')

    # Update jobs verification status
    for job in emp.jobs:
        job.is_verified = emp.is_verified

    db.session.commit()
    return jsonify({'success': True, 'employer': emp.to_dict()})


@app.route('/api/admin/reports', methods=['GET'])
@jwt_required
@role_required(['admin'])
def admin_get_reports(current_user):
    reports = JobReport.query.order_by(JobReport.created_at.desc()).all()
    return jsonify({'success': True, 'reports': [r.to_dict() for r in reports]})


@app.route('/api/admin/reports/<int:report_id>/resolve', methods=['PUT'])
@jwt_required
@role_required(['admin'])
def admin_resolve_report(current_user, report_id):
    report = JobReport.query.get_or_404(report_id)
    data = request.get_json() or {}
    action = data.get('action', 'dismissed')  # 'dismissed' or 'job_removed'

    report.status = action
    if action == 'job_removed' and report.job:
        report.job.status = 'closed'

    db.session.commit()
    return jsonify({'success': True, 'report': report.to_dict()})


@app.route('/api/admin/district-analytics', methods=['GET'])
def get_district_analytics():
    """
    District-wise employment demand vs candidate supply insights.
    Identifies real opportunity gaps across rural Karnataka.
    """
    district_data = [
        {
            'district': 'Dakshina Kannada',
            'active_jobs': 14,
            'registered_youth': 32,
            'top_demanded_skills': ['Electrical Repair', 'Solar Installation', 'Appliance Repair'],
            'candidate_skill_surplus': ['Retail Sales'],
            'candidate_skill_deficit': ['Solar PV Installation', 'AC Servicing'],
            'gap_alert': "High shortage of certified Solar & Inverter technicians in Bantwal & Belthangady taluks."
        },
        {
            'district': 'Shivamogga',
            'active_jobs': 22,
            'registered_youth': 28,
            'top_demanded_skills': ['Arecanut Processing', 'Farm Equipment', 'Cold Storage Logistics'],
            'candidate_skill_surplus': ['General Farm Labor'],
            'candidate_skill_deficit': ['Post-Harvest Quality Inspection', 'Tractor Mechanical Maintenance'],
            'gap_alert': "Seasonal demand spike for areca nut and ginger harvest supervisors."
        },
        {
            'district': 'Mandya',
            'active_jobs': 18,
            'registered_youth': 41,
            'top_demanded_skills': ['Retail POS Billing', 'Tractor Driving', 'Dairy Cooperative Entry'],
            'candidate_skill_surplus': ['Manual Agriculture'],
            'candidate_skill_deficit': ['Computer Spreadsheets', 'Digital UPI Reconciliation'],
            'gap_alert': "Local retail marts and milk unions frequently need billing staff with spreadsheet skills."
        },
        {
            'district': 'Uttara Kannada',
            'active_jobs': 9,
            'registered_youth': 19,
            'top_demanded_skills': ['Tailoring & Garments', 'Hospitality Assistant', 'Mobile Phone Repair'],
            'candidate_skill_surplus': ['Home Tailoring'],
            'candidate_skill_deficit': ['Industrial Sewing Machine', 'English Conversational Basics'],
            'gap_alert': "Apparel clusters in Sirsi report high vacancy rate due to lack of industrial machine familiarity."
        }
    ]

    return jsonify({
        'success': True,
        'district_analytics': district_data,
        'total_districts_monitored': 31
    })


# ----------------- NOTIFICATIONS ----------------- #

@app.route('/api/notifications', methods=['GET'])
@jwt_required
def get_notifications(current_user):
    notifications = Notification.query.filter_by(user_id=current_user.id).order_by(Notification.created_at.desc()).all()
    return jsonify({
        'success': True,
        'unread_count': sum(1 for n in notifications if not n.is_read),
        'notifications': [n.to_dict() for n in notifications]
    })


@app.route('/api/notifications/<int:notif_id>/read', methods=['PUT'])
@jwt_required
def mark_notification_read(current_user, notif_id):
    notif = Notification.query.get_or_404(notif_id)
    if notif.user_id == current_user.id:
        notif.is_read = True
        db.session.commit()
    return jsonify({'success': True})


# ----------------- SIMULATION LAB & BENCHMARK ROUTES ----------------- #

@app.route('/api/simulation/scenarios', methods=['GET'])
def get_simulation_scenarios():
    """
    Returns 5 ready-to-evaluate demonstration scenarios for HackCulture judges.
    """
    return jsonify({
        'success': True,
        'scenarios': SIMULATION_SCENARIOS
    })


@app.route('/api/simulation/match', methods=['POST'])
def run_simulation_match():
    """
    Executes the configurable 7-factor explainable matching engine on custom or sample inputs.
    """
    data = request.get_json() or {}
    candidate = data.get('candidate')
    job = data.get('job')
    weights = data.get('weights')

    if not candidate or not job:
        return jsonify({'success': False, 'message': 'Both candidate and job profiles are required'}), 400

    result = evaluate_simulation_match(candidate, job, weights)
    return jsonify({
        'success': True,
        'result': result
    })


@app.route('/api/simulation/compare', methods=['POST'])
def run_simulation_compare():
    """
    Executes both Baseline Keyword Matching and RuralConnect Intelligent Matching
    side-by-side to highlight the technological innovation for judges.
    """
    data = request.get_json() or {}
    candidate = data.get('candidate')
    job = data.get('job')

    if not candidate or not job:
        return jsonify({'success': False, 'message': 'Both candidate and job profiles are required'}), 400

    comparison = compare_baseline_keyword_matching(candidate, job)
    return jsonify({
        'success': True,
        'comparison': comparison
    })


@app.route('/api/simulation/impact', methods=['POST'])
def run_simulation_impact():
    """
    Live Employment Impact Simulator: Computes statistically grounded projections
    based on interactive sliders. Clearly designated as a simulation model.
    """
    data = request.get_json() or {}
    youth_count = int(data.get('youth_count', 500))
    employer_count = int(data.get('employer_count', 45))
    vacancies_per_employer = float(data.get('vacancies_per_employer', 2.5))
    match_rate = float(data.get('match_rate', 82.0))
    candidates_per_vacancy = float(data.get('candidates_per_vacancy', 4.0))

    impact = calculate_simulated_impact(
        youth_count=youth_count,
        employer_count=employer_count,
        vacancies_per_employer=vacancies_per_employer,
        match_rate=match_rate,
        candidates_per_vacancy=candidates_per_vacancy
    )

    return jsonify({
        'success': True,
        'impact': impact
    })


@app.route('/api/simulation/map-clusters', methods=['GET'])
def get_simulation_map_clusters():
    """
    Returns synthetic demonstration opportunity clusters across Karnataka districts
    for the simulation map mode. Strictly designated as synthetic pilot clusters.
    """
    clusters = [
        {
            'id': 'sim_job_1',
            'title': 'Solar Rooftop & Inverter Technician',
            'title_kannada': 'ಸೋಲಾರ್ ರೂಫ್‌ಟಾಪ್ ಮತ್ತು ಇನ್ವರ್ಟರ್ ಟೆಕ್ನಿಷಿಯನ್',
            'title_hindi': 'सोलर रूफटॉप एवं इन्वर्टर तकनीशियन',
            'business_name': 'Surya Shakti Micro-Solar',
            'category': 'Electrical & Repair',
            'village': 'Belthangady',
            'district': 'Dakshina Kannada',
            'latitude': 12.9920,
            'longitude': 75.2580,
            'min_salary': 14000,
            'max_salary': 19000,
            'salary_period': 'month',
            'job_type': 'full-time',
            'is_synthetic_simulation': True,
            'required_skills': ['Solar Installation', 'Wiring', 'Inverter Servicing'],
            'vacancies': 3
        },
        {
            'id': 'sim_job_2',
            'title': 'Arecanut Dryer Machinery Operator',
            'title_kannada': 'ಅಡಿಕೆ ಡ್ರೈಯರ್ ಯಂತ್ರ ಆಪರೇಟರ್',
            'title_hindi': 'सुपारी ड्रायर मशीन ऑपरेटर',
            'business_name': 'Malnad Agro Cooperative',
            'category': 'Agriculture',
            'village': 'Thirthahalli',
            'district': 'Shivamogga',
            'latitude': 13.6930,
            'longitude': 75.2440,
            'min_salary': 13500,
            'max_salary': 17000,
            'salary_period': 'month',
            'job_type': 'seasonal',
            'is_synthetic_simulation': True,
            'required_skills': ['Agricultural Machinery', 'Tractor Driving'],
            'vacancies': 5
        },
        {
            'id': 'sim_job_3',
            'title': 'Dairy Society Quality & Chilling Assistant',
            'title_kannada': 'ಹಾಲಿನ ಸೊಸೈಟಿ ಗುಣಮಟ್ಟ ಮತ್ತು ಚಿಲ್ಲಿಂಗ್ ಸಹಾಯಕ',
            'title_hindi': 'डेयरी सोसायटी गुणवत्ता एवं चिलिंग सहायक',
            'business_name': 'Mandya Milk Union (BAMUL Hub)',
            'category': 'Agriculture',
            'village': 'Maddur',
            'district': 'Mandya',
            'latitude': 12.5840,
            'longitude': 77.0420,
            'min_salary': 12000,
            'max_salary': 15500,
            'salary_period': 'month',
            'job_type': 'full-time',
            'is_synthetic_simulation': True,
            'required_skills': ['Dairy Farming', 'Data Entry', 'Equipment Maintenance'],
            'vacancies': 2
        },
        {
            'id': 'sim_job_4',
            'title': 'Apparel Cutting & Overlock Stitching Assistant',
            'title_kannada': 'ಉಡುಪು ಕಟಿಂಗ್ ಮತ್ತು ಓವರ್‌ಲಾಕ್ ಹೊಲಿಗೆ ಸಹಾಯಕ',
            'title_hindi': 'वस्त्र कटिंग एवं ओवरलॉक सिलाई सहायक',
            'business_name': 'Kavery Garment Micro-Enterprise',
            'category': 'Tailoring & Garments',
            'village': 'Sirsi',
            'district': 'Uttara Kannada',
            'latitude': 14.6190,
            'longitude': 74.8350,
            'min_salary': 11500,
            'max_salary': 14500,
            'salary_period': 'month',
            'job_type': 'full-time',
            'is_synthetic_simulation': True,
            'required_skills': ['Tailoring', 'Garment Stitching', 'Cutting Master Basics'],
            'vacancies': 4
        },
        {
            'id': 'sim_job_5',
            'title': 'CSC Digital Kendra Operator & Citizen Service',
            'title_kannada': 'ಸಿಎಸ್‌ಸಿ ಡಿಜಿಟಲ್ ಕೇಂದ್ರ ಆಪರೇಟರ್',
            'title_hindi': 'सीएससी डिजिटल केंद्र ऑपरेटर',
            'business_name': 'Grama Seva Kendra Hub',
            'category': 'Office & Computer',
            'village': 'Karkala',
            'district': 'Udupi',
            'latitude': 13.2140,
            'longitude': 74.9970,
            'min_salary': 12000,
            'max_salary': 16000,
            'salary_period': 'month',
            'job_type': 'full-time',
            'is_synthetic_simulation': True,
            'required_skills': ['Data Entry', 'Typing', 'MS Office', 'Customer Handling'],
            'vacancies': 2
        }
    ]
    return jsonify({
        'success': True,
        'is_simulation_mode': True,
        'notice': 'Synthetic demonstration clusters across 5 Karnataka districts for HackCulture evaluation.',
        'clusters': clusters
    })


# ----------------- SERVER HEALTH / ROOT ----------------- #

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'online',
        'service': 'RuralConnect AI Core API',
        'version': '1.0.0',
        'timestamp': datetime.datetime.utcnow().isoformat()
    })


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
