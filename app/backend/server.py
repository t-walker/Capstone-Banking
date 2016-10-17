from flask import Flask, send_file, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://pgdbuser:pgdbpassword@db/varda"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['DEBUG'] = True

db = SQLAlchemy(app)

# MODELS
string_maximum = 255

class User(db.Model):
    """This class represents a user on the system"""
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(string_maximum), unique=True)
    email = db.Column(db.String(string_maximum), unique=True)


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
