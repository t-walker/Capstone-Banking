from time import sleep # Wait for the DB to be ready.

from flask import Flask, send_file, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from werkzeug.security import generate_password_hash, check_password_hash

sleep(5)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://pgdbuser:pgdbpassword@db/varda"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['DEBUG'] = True

db = SQLAlchemy(app)
ma = Marshmallow(app)

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

@app.route('/api/transaction', methods=['POST'])
def create_transaction():
    # {'account_id': '', 'tx_type': '', 'tx_from': '', tx_to: '', amount: ''}
    tx = Transaction(**request.json)

    try:
        db.session.add(tx)
        db.session.commit()
    except:
        db.session.rollback()
    return request.data

@app.route('/api/account/<int:account_id>/transactions', methods=['GET'])
def get_account_transactions(account_id):
    transaction_schema = TransactionSchema()

    account = db.session.query(Account).filter_by(id=account_id).first()
    transactions = account.transactions.all()
    print(transactions)

    values = []

    print(values)

    for tx in transactions:
        values.append(transaction_schema.dump(tx).data)

    return jsonify(values)



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
