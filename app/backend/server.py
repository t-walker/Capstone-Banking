from time import sleep # Wait for the DB to be ready.

from flask import Flask, send_file, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://pgdbuser:pgdbpassword@db/varda"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['DEBUG'] = True

sleep(5)

db = SQLAlchemy(app)

from models import *

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

    try:
        db.session.add(user)
        db.session.commit()
    except:
        db.session.rollback()
    return request.data

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
