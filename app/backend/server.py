from time import sleep # Wait for the DB to be ready.
from worker import celery
from flask import Flask, send_file, jsonify, request, url_for
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
@app.route('/api/add/<int:param1>/<int:param2>')
def add(param1,param2):
    task = celery.send_task('add', args=[param1, param2], kwargs={})
    return jsonify({'result': task.get()})

@app.route('/api/')
def index():
  obj = {}
  obj['status'] = "running"
  return jsonify(**obj)


@app.route('/api/register', methods=['POST'])
def create_user():
    # {'username': '', email: '' }
    print (request)

    user = User(**request.json)

    print(user)

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
    transactions_schema = TransactionSchema(many=True)

    account = db.session.query(Account).filter_by(id=account_id).first()
    transactions = account.transactions.all()

    result = transactions_schema.dump(transactions)

    return jsonify({'transactions': result.data})


@app.route('/api/account/<int:account_id>/total', methods=['GET'])
def get_account_total(account_id):
    transactions_schema = TransactionSchema(many=True)

    account = Account.query.filter_by(id=account_id).first()
    result = account.total

    return jsonify({'total': result})


@app.route('/api/user/<int:user_id>/accounts', methods=['GET'])
def get_user_accounts(user_id):
    accounts_schema = AccountSchema(many=True)

    accounts = db.session.query(Account).filter_by(user_id=user_id).all()
    result = accounts_schema.dump(accounts)

    return jsonify({'accounts': result.data})


@app.route('/api/accounts', methods=['GET'])
def get_all_accounts():
    accounts_schema = AccountSchema(many=True)

    accounts = db.session.query(Account).all()
    result = accounts_schema.dump(accounts)

    return jsonify({'accounts': result.data})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
