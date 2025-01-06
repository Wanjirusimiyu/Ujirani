from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager, create_access_token, create_refresh_token, 
    set_access_cookies, set_refresh_cookies, jwt_required,
    get_jwt_identity, get_jwt, unset_jwt_cookies
)
from werkzeug.security import check_password_hash
from flask_cors import CORS
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from config import Config  
from models import db, User  

# Initialize Flask app
app = Flask(__name__)

# Initialize JWT
jwt = JWTManager(app)

# Token blacklist storage (In production, move this to database)
blacklisted_tokens = set()

# Enable CORS
CORS(app, supports_credentials=True)

# Load configuration from config.py
app.config.from_object(Config)

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
    
@jwt.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    return jti in blacklisted_tokens    


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
            # Create access and refresh tokens
            access_token = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(identity=user.id)
            
            response = jsonify({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "email": user.email,
                "fullname": user.fullname
            }
        })
            
            set_access_cookies(response, access_token)
            set_refresh_cookies(response, refresh_token)
            return response, 200
          
        return jsonify({"message": "Invalid email or password"}), 401


    except Exception as e:
        print(f"Error during login: {e}")
        return jsonify({'message': 'An error occurred'}), 500

@app.route("/api/protected")
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({
        "message": "Access granted",
        "user": {
            "id": user.id,
            "email": user.email,
            "fullname": user.fullname
        }
    })


# Error handlers
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    response = jsonify({
        "message": "Token has expired",
        "error": "token_expired"
    })
    unset_jwt_cookies(response)
    return response, 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    response = jsonify({
        "message": "Invalid token",
        "error": "invalid_token"
    })
    unset_jwt_cookies(response)
    return response, 401

# Add route to handle token refresh
@app.route("/api/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    # Get current refresh token data
    current_token = get_jwt()
    jti = current_token["jti"]
    
    # Blacklist current refresh token
    blacklisted_tokens.add(jti)
    
    # Create new tokens
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    refresh_token = create_refresh_token(identity=identity)
    
    response = jsonify({"message": "Tokens refreshed successfully"})
    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)
    return response

# Add route to handle logout
@app.route("/api/logout", methods=["POST"])
@jwt_required()
def logout():
    # Blacklist current tokens
    jti = get_jwt()["jti"]
    blacklisted_tokens.add(jti)
    
    response = jsonify({"message": "Logout successful"})
    unset_jwt_cookies(response)
    return response


# Run the application
if __name__ == '__main__':
    app.run(port=5555, debug=True)
