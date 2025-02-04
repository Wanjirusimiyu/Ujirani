# # Standard library imports

# # Remote library imports
# from flask import Flask
# from flask_cors import CORS
# from flask_migrate import Migrate
# from flask_restful import Api
# from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import MetaData
# import os

# # Local imports

# # Get the absolute path to the instance folder
# basedir = os.path.abspath(os.path.dirname(__file__))


# # Specify the database file inside the instance folder
# SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(basedir, 'instance', 'database.db')}"

# # Instantiate app, set attributes
# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instance/app.db'

# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.json.compact = False

# # Define metadata, instantiate db
# metadata = MetaData(naming_convention={
#     "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
# })
# db = SQLAlchemy(metadata=metadata)
# migrate = Migrate(app, db)
# db.init_app(app)

# # Instantiate REST API
# api = Api(app)

# # Instantiate CORS
# CORS(app)

# config.py
from datetime import timedelta
import os
from dotenv import load_dotenv

load_dotenv()
# Get the absolute path to the current file (i.e., the config.py file itself)
basedir = os.path.abspath(os.path.dirname(__file__))

from datetime import timedelta
import os
from dotenv import load_dotenv
# Determine the path to the .env file (assumed to be in the same directory as config.py)
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)


class Config:
      # Load the secret key from the environment or set a fallback value
    SECRET_KEY = os.getenv('SECRET_KEY')
     # Use the SECRET_KEY as your JWT secret key
    JWT_SECRET_KEY = SECRET_KEY
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_COOKIE_SECURE = False # Set to True when in production /deployment
    JWT_COOKIE_CSRF_PROTECT = True
    # Specify the database file inside the instance folder
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(basedir, 'instance', 'database.db')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False



