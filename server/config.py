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

import os

# Get the absolute path to the current file (i.e., the config.py file itself)
basedir = os.path.abspath(os.path.dirname(__file__))

# Specify the database file inside the instance folder
SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(basedir, 'instance', 'database.db')}"
SQLALCHEMY_TRACK_MODIFICATIONS = False
