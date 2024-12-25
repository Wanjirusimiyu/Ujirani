from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
import config  # Import configuration settings from config.py
from models import db, User  # Import db from models

# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app, supports_credentials=True)

# Load configuration from config.py
app.config.from_object(config)

# Initialize db with the app
db.init_app(app)

# Initialize other extensions
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)

# Define routes
@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        fullname = data.get('fullname')
        email = data.get('email')
        password = data.get('password')

        # Validate required fields
        if not email or not password:
            return jsonify({'message': 'Missing required fields'}), 400

        # Check for existing user
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'message': 'Email already exists'}), 400

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Create and save the new user
        new_user = User(fullname=fullname, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': "User created successfully"}), 201
    except Exception as e:
        print(f"Error during signup: {e}")
        return jsonify({'message': 'An error occurred'}), 500
    

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Validate required fields
        if not email or not password:
            return jsonify({'message': 'Missing required fields'}), 400

        # Find user by email
        user = User.query.filter_by(email=email).first()
        
        # Check if user exists and password matches
        if user and bcrypt.check_password_hash(user.password, password):
            return jsonify({
                'message': 'Login successful',
                'user': {
                    'id': user.id,
                    'fullname': user.fullname,
                    'email': user.email
                }
            }), 200
        
        return jsonify({'message': 'Invalid email or password'}), 401

    except Exception as e:
        print(f"Error during login: {e}")
        return jsonify({'message': 'An error occurred'}), 500


# Run the application
if __name__ == '__main__':
    app.run(port=5555, debug=True)
