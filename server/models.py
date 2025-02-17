from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=True)
    is_verified = db.Column(db.Boolean, default=False)
    posts = db.relationship('Post', backref='user', lazy=True)

    def __init__(self, fullname, email, password=None, is_verified=False):
        self.fullname = fullname
        self.email = email
        self.password = password
        self.is_verified = is_verified
        self.posts = []

    def __repr__(self):
        return f'<User {self.fullname}>'
    

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
