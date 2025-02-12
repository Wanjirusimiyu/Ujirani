from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=True)
    is_verified = db.Column(db.Boolean, default=False)

    def __init__(self, fullname, email, password, is_verified=False):
        self.fullname = fullname
        self.email = email
        self.password = password
        self.is_verified = is_verified

    def __repr__(self):
        return f'<User {self.fullname}>'