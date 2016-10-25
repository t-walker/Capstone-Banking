from time import sleep # Wait for the DB to be ready.

from flask import Flask, send_file, jsonify, request
from flask_user import UserMixin
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://pgdbuser:pgdbpassword@db/varda"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['DEBUG'] = True

try:
    db = SQLAlchemy(app)
except:
    sleep(5)
    db = SQLAlchemy(app)

# MODELS
string_maximum = 255

class User(db.Model, UserMixin):
    """This class represents a user on the system"""
    # Primary Information
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(string_maximum), unique=True)
    email = db.Column(db.String(string_maximum), unique=True)
    password = db.Column(db.String(string_maximum), unique=False) # TODO: VERIFY UNIQUENESS

    confirmed_at = db.Column(db.DateTime())
    reset_password_token = db.Column(db.String(string_maximum), nullable=False, server_default='')
    active = db.Column(db.Boolean(), nullable=False, server_default='0')

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, unique=False)
    tx_type = db.Column(db.Boolean(), unique=False)
    tx_from = db.Column(db.String(string_maximum), unique=False)
    tx_to = db.Column(db.String(string_maximum), unique=False)
    amount = db.Column(db.Float, unique=False)

# CREATE DATABASE
db.create_all()

# ROUTES
@app.route('/api/')
def index():
  obj = {}
  obj['status'] = "running"
  return jsonify(**obj)

@app.route('/api/register', methods=['POST'])
def create_user():
    # {'username': '', email: '' }
    user = User(**request.json)
    db.session.add(user)
    db.session.commit()
    return request.data

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
