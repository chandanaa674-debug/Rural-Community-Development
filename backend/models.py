import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'youth', 'employer', 'admin'
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # Relationships
    youth_profile = db.relationship('YouthProfile', backref='user', uselist=False, cascade="all, delete-orphan")
    employer_profile = db.relationship('EmployerProfile', backref='user', uselist=False, cascade="all, delete-orphan")
    notifications = db.relationship('Notification', backref='user', lazy=True, cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'role': self.role,
            'name': self.name,
            'phone': self.phone,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class YouthProfile(db.Model):
    __tablename__ = 'youth_profiles'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
    age = db.Column(db.Integer, nullable=True)
    gender = db.Column(db.String(20), nullable=True)
    village = db.Column(db.String(100), nullable=False)
    district = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), default='Karnataka')
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    preferred_location = db.Column(db.String(150), nullable=True)
    education = db.Column(db.String(100), nullable=True)  # '10th Standard', '12th/PUC', 'ITI / Diploma', 'Graduate', 'Self-Taught / Practical'
    languages = db.Column(db.JSON, default=list)  # ['Kannada', 'English', 'Hindi']
    skills = db.Column(db.JSON, default=list)  # [{'name': 'Electrical Repair', 'level': 'Intermediate', 'is_practical': True}]
    work_preferences = db.Column(db.JSON, default=list)  # ['Workshop', 'Agriculture', 'Field Work', 'Office']
    expected_salary = db.Column(db.Integer, default=12000)
    availability = db.Column(db.String(30), default='full-time')  # 'full-time', 'part-time', 'temporary', 'apprenticeship', 'any'
    willing_to_relocate = db.Column(db.Boolean, default=False)
    bio = db.Column(db.Text, nullable=True)
    practical_experience = db.Column(db.Text, nullable=True)
    resume_url = db.Column(db.String(255), nullable=True)
    has_uploaded_resume = db.Column(db.Boolean, default=False)
    completed_modules = db.Column(db.JSON, default=list)
    badges = db.Column(db.JSON, default=list)
    skill_passport_id = db.Column(db.String(50), nullable=True)
    is_verified = db.Column(db.Boolean, default=False)

    # Relationships
    applications = db.relationship('Application', backref='youth_profile', lazy=True)
    learning_progress = db.relationship('UserLearningProgress', backref='youth_profile', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.user.name if self.user else None,
            'phone': self.user.phone if self.user else None,
            'email': self.user.email if self.user else None,
            'age': self.age,
            'gender': self.gender,
            'village': self.village,
            'district': self.district,
            'state': self.state,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'preferred_location': self.preferred_location,
            'education': self.education,
            'languages': self.languages or [],
            'skills': self.skills or [],
            'work_preferences': self.work_preferences or [],
            'expected_salary': self.expected_salary,
            'availability': self.availability,
            'willing_to_relocate': self.willing_to_relocate,
            'bio': self.bio,
            'practical_experience': self.practical_experience,
            'resume_url': self.resume_url,
            'has_uploaded_resume': self.has_uploaded_resume,
            'completed_modules': self.completed_modules or [],
            'badges': self.badges or [],
            'skill_passport_id': self.skill_passport_id or f"RC-SKP-{self.id:05d}",
            'is_verified': self.is_verified
        }


class EmployerProfile(db.Model):
    __tablename__ = 'employer_profiles'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
    business_name = db.Column(db.String(150), nullable=False)
    business_type = db.Column(db.String(100), nullable=False)  # 'Agriculture', 'Retail', 'Workshop', 'Manufacturing', 'Services'
    registration_number = db.Column(db.String(100), nullable=True)
    village = db.Column(db.String(100), nullable=False)
    district = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), default='Karnataka')
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    address = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)
    contact_person = db.Column(db.String(100), nullable=True)
    contact_phone = db.Column(db.String(20), nullable=True)
    contact_email = db.Column(db.String(120), nullable=True)
    website = db.Column(db.String(150), nullable=True)
    is_verified = db.Column(db.Boolean, default=False)
    verification_status = db.Column(db.String(30), default='unverified')  # 'unverified', 'pending', 'verified', 'rejected'
    verification_documents = db.Column(db.JSON, default=list)
    reputation_score = db.Column(db.Float, default=4.5)
    hiring_count = db.Column(db.Integer, default=0)

    # Relationships
    jobs = db.relationship('Job', backref='employer', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'business_name': self.business_name,
            'business_type': self.business_type,
            'registration_number': self.registration_number,
            'village': self.village,
            'district': self.district,
            'state': self.state,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'address': self.address,
            'description': self.description,
            'contact_person': self.contact_person,
            'contact_phone': self.contact_phone or (self.user.phone if self.user else None),
            'contact_email': self.contact_email or (self.user.email if self.user else None),
            'website': self.website,
            'is_verified': self.is_verified,
            'verification_status': self.verification_status,
            'reputation_score': self.reputation_score,
            'hiring_count': self.hiring_count
        }


class Job(db.Model):
    __tablename__ = 'jobs'
    id = db.Column(db.Integer, primary_key=True)
    employer_id = db.Column(db.Integer, db.ForeignKey('employer_profiles.id'), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    title_kannada = db.Column(db.String(150), nullable=True)
    title_hindi = db.Column(db.String(150), nullable=True)
    category = db.Column(db.String(100), nullable=False)  # 'Electrical & Repair', 'Agriculture', 'Retail', 'Office & Computer', 'Hospitality', 'Manufacturing'
    description = db.Column(db.Text, nullable=False)
    required_skills = db.Column(db.JSON, default=list)  # ['Electrical Repair', 'Wiring', 'Customer Handling']
    preferred_education = db.Column(db.String(100), default='Any / Practical Skills')
    min_salary = db.Column(db.Integer, nullable=False)
    max_salary = db.Column(db.Integer, nullable=False)
    salary_period = db.Column(db.String(20), default='month')  # 'month', 'day', 'hour'
    job_type = db.Column(db.String(30), default='full-time')  # 'full-time', 'part-time', 'temporary', 'apprenticeship', 'seasonal'
    is_micro_opportunity = db.Column(db.Boolean, default=False)
    duration_days = db.Column(db.Integer, nullable=True)  # for seasonal/micro
    working_hours = db.Column(db.String(100), default='9:00 AM - 6:00 PM')
    village = db.Column(db.String(100), nullable=False)
    district = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), default='Karnataka')
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    vacancies = db.Column(db.Integer, default=1)
    status = db.Column(db.String(30), default='active')  # 'active', 'paused', 'closed', 'under_review'
    is_verified = db.Column(db.Boolean, default=False)
    scam_flag_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # Relationships
    applications = db.relationship('Application', backref='job', lazy=True, cascade="all, delete-orphan")
    reports = db.relationship('JobReport', backref='job', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'employer_id': self.employer_id,
            'employer_name': self.employer.business_name if self.employer else 'Local Business',
            'employer_is_verified': self.employer.is_verified if self.employer else False,
            'employer_reputation': self.employer.reputation_score if self.employer else 4.5,
            'title': self.title,
            'title_kannada': self.title_kannada or self.title,
            'title_hindi': self.title_hindi or self.title,
            'category': self.category,
            'description': self.description,
            'required_skills': self.required_skills or [],
            'preferred_education': self.preferred_education,
            'min_salary': self.min_salary,
            'max_salary': self.max_salary,
            'salary_period': self.salary_period,
            'job_type': self.job_type,
            'is_micro_opportunity': self.is_micro_opportunity,
            'duration_days': self.duration_days,
            'working_hours': self.working_hours,
            'village': self.village,
            'district': self.district,
            'state': self.state,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'vacancies': self.vacancies,
            'status': self.status,
            'is_verified': self.is_verified,
            'scam_flag_count': self.scam_flag_count,
            'application_count': len(self.applications) if self.applications else 0,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Application(db.Model):
    __tablename__ = 'applications'
    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)
    youth_id = db.Column(db.Integer, db.ForeignKey('youth_profiles.id'), nullable=False)
    status = db.Column(db.String(30), default='applied')
    # status choices: 'applied', 'received', 'under_review', 'shortlisted', 'interview_scheduled', 'selected', 'rejected', 'withdrawn'
    cover_note = db.Column(db.Text, nullable=True)
    match_score = db.Column(db.Float, default=0.0)
    match_reasons = db.Column(db.JSON, default=list)
    employer_notes = db.Column(db.Text, nullable=True)
    applied_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'job_id': self.job_id,
            'youth_id': self.youth_id,
            'job': self.job.to_dict() if self.job else None,
            'candidate': self.youth_profile.to_dict() if self.youth_profile else None,
            'status': self.status,
            'cover_note': self.cover_note,
            'match_score': self.match_score,
            'match_reasons': self.match_reasons or [],
            'employer_notes': self.employer_notes,
            'applied_at': self.applied_at.isoformat() if self.applied_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class SavedJob(db.Model):
    __tablename__ = 'saved_jobs'
    id = db.Column(db.Integer, primary_key=True)
    youth_id = db.Column(db.Integer, db.ForeignKey('youth_profiles.id'), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)
    saved_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)


class LearningResource(db.Model):
    __tablename__ = 'learning_resources'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    title_kannada = db.Column(db.String(200), nullable=True)
    title_hindi = db.Column(db.String(200), nullable=True)
    category = db.Column(db.String(100), nullable=False)
    skill_target = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    description_kannada = db.Column(db.Text, nullable=True)
    description_hindi = db.Column(db.Text, nullable=True)
    url = db.Column(db.String(255), nullable=True)
    estimated_hours = db.Column(db.Integer, default=5)
    difficulty = db.Column(db.String(30), default='Beginner')  # 'Beginner', 'Intermediate'
    format = db.Column(db.String(30), default='Hands-on')  # 'Video', 'Hands-on', 'Practical Guide'
    is_free = db.Column(db.Boolean, default=True)
    unlocks_job_types = db.Column(db.JSON, default=list)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'title_kannada': self.title_kannada or self.title,
            'title_hindi': self.title_hindi or self.title,
            'category': self.category,
            'skill_target': self.skill_target,
            'description': self.description,
            'description_kannada': self.description_kannada or self.description,
            'description_hindi': self.description_hindi or self.description,
            'url': self.url,
            'estimated_hours': self.estimated_hours,
            'difficulty': self.difficulty,
            'format': self.format,
            'is_free': self.is_free,
            'unlocks_job_types': self.unlocks_job_types or []
        }


class UserLearningProgress(db.Model):
    __tablename__ = 'user_learning_progress'
    id = db.Column(db.Integer, primary_key=True)
    youth_id = db.Column(db.Integer, db.ForeignKey('youth_profiles.id'), nullable=False)
    resource_id = db.Column(db.Integer, db.ForeignKey('learning_resources.id'), nullable=False)
    status = db.Column(db.String(30), default='in_progress')  # 'in_progress', 'completed'
    progress_percent = db.Column(db.Integer, default=0)
    started_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    completed_at = db.Column(db.DateTime, nullable=True)

    resource = db.relationship('LearningResource')

    def to_dict(self):
        return {
            'id': self.id,
            'youth_id': self.youth_id,
            'resource_id': self.resource_id,
            'resource': self.resource.to_dict() if self.resource else None,
            'status': self.status,
            'progress_percent': self.progress_percent,
            'started_at': self.started_at.isoformat() if self.started_at else None,
            'completed_at': self.completed_at.isoformat() if self.completed_at else None
        }


class JobReport(db.Model):
    __tablename__ = 'job_reports'
    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)
    reporter_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    reason = db.Column(db.String(100), nullable=False)  # 'Suspicious fee requested', 'Fake business', 'Misleading salary', 'Abusive employer'
    details = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(30), default='pending')  # 'pending', 'reviewed', 'dismissed', 'job_removed'
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    reporter = db.relationship('User', foreign_keys=[reporter_id])

    def to_dict(self):
        return {
            'id': self.id,
            'job_id': self.job_id,
            'job_title': self.job.title if self.job else 'Unknown Job',
            'employer_name': self.job.employer.business_name if (self.job and self.job.employer) else 'Unknown',
            'reporter_name': self.reporter.name if self.reporter else 'Anonymous',
            'reason': self.reason,
            'details': self.details,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class CommunityReferral(db.Model):
    __tablename__ = 'community_referrals'
    id = db.Column(db.Integer, primary_key=True)
    referrer_name = db.Column(db.String(100), nullable=False)
    referrer_phone = db.Column(db.String(20), nullable=False)
    referrer_organization = db.Column(db.String(150), nullable=True)  # Gram Panchayat, Youth Club, Self Help Group, NGO
    youth_name = db.Column(db.String(100), nullable=False)
    youth_phone = db.Column(db.String(20), nullable=False)
    target_sector = db.Column(db.String(100), nullable=False)
    village = db.Column(db.String(100), nullable=False)
    district = db.Column(db.String(100), nullable=False)
    notes = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(30), default='submitted')  # 'submitted', 'contacted', 'onboarded'
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'referrer_name': self.referrer_name,
            'referrer_phone': self.referrer_phone,
            'referrer_organization': self.referrer_organization,
            'youth_name': self.youth_name,
            'youth_phone': self.youth_phone,
            'target_sector': self.target_sector,
            'village': self.village,
            'district': self.district,
            'notes': self.notes,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Notification(db.Model):
    __tablename__ = 'notifications'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    message = db.Column(db.Text, nullable=False)
    type = db.Column(db.String(50), default='info')  # 'application_update', 'job_match', 'verification', 'alert'
    link = db.Column(db.String(255), nullable=True)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'message': self.message,
            'type': self.type,
            'link': self.link,
            'is_read': self.is_read,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
