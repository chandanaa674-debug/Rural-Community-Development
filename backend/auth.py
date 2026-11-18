import datetime
import os
import jwt
from functools import wraps
from flask import request, jsonify
from models import User, db

JWT_SECRET = os.getenv('JWT_SECRET', 'ruralconnect_secret_key_hackculture_2026')
JWT_ALGORITHM = 'HS256'
JWT_EXPIRATION_HOURS = 72

def generate_token(user: User) -> str:
    payload = {
        'sub': str(user.id),
        'email': user.email,
        'role': user.role,
        'name': user.name,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=JWT_EXPIRATION_HOURS),
        'iat': datetime.datetime.now(datetime.timezone.utc)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except Exception:
        return None


def get_current_user():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return None
    token = auth_header.split(' ')[1]
    payload = decode_token(token)
    if not payload:
        return None
    user_id = payload.get('sub')
    if not user_id:
        return None
    try:
        return db.session.get(User, int(user_id))
    except Exception:
        return None


def jwt_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
      user = get_current_user()
      if not user:
        return jsonify({
            'success': False,
            'message': 'Authentication required or token expired',
        }), 401
      if 'current_user' not in kwargs:
        kwargs['current_user'] = user
      return f(*args, **kwargs)

    return decorated_function


def role_required(allowed_roles):

  def decorator(f):

    @wraps(f)
    def decorated_function(*args, **kwargs):
      user = kwargs.get('current_user') or get_current_user()
      if not user:
        return jsonify(
            {'success': False, 'message': 'Authentication required'}
        ), 401
      if user.role not in allowed_roles:
        return jsonify({
            'success': False,
            'message': f'Access forbidden for role: {user.role}',
        }), 403
      if 'current_user' not in kwargs:
        kwargs['current_user'] = user
      return f(*args, **kwargs)

    return decorated_function

  return decorator
