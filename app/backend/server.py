from flask import Flask, send_file, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://pgdbuser:pgdbpassword@db/varda"

db = SQLAlchemy(app)
db.create_all()

@app.route('/api/')
def index():
  obj = {} 
  obj['status'] = "working"
  return jsonify(**obj)
