from time import sleep # Wait for the DB to be ready.

from flask import Flask, send_file, jsonify, request # Basic flask functionality
from flask_login import LoginManager # Basic flask authentication
from flask_sqlalchemy import SQLAlchemy # Database management
from flask_marshmallow import Marshmallow # Data serialization

from authentication import user_loader, request_loader

sleep(5) # Delay is required for allowing the Database to startup

app = Flask(__name__)
app.secret_key = "ASECRETKEYGOESHERE"
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://pgdbuser:pgdbpassword@db/varda"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['DEBUG'] = True

db = SQLAlchemy(app)
ma = Marshmallow(app)
lm = LoginManager()

from models import *

# CREATE DATABASE
db.create_all()

# INITIALIZE LOGIN MANAGEMENT
lm.init_app(app)

# ROUTES
@app.route('/api/')
def index():
  obj = {}
  obj['status'] = "running"
  return jsonify(**obj)

@app.route('/api/login', methods=['POST'])
def login():
    email = request.data['email']

    user = db.session.query(User).filter_by(email=email).first()

    if user.check_password(request.data.get('password')):
        flask_login.login_user(user)

    return 'Bad login'

@app.route('/api/register', methods=['POST'])
def create_user():
    # {'username': '', email: '' }
    user = User(**request.json)

    try:
        db.session.add(user)
        db.session.commit()
    except:
        db.session.rollback()
        return "<h1>ERROR</h1>"


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
        return "<h1>ERROR</h1>"

    return request.data


@app.route('/api/account/<int:account_id>/transactions', methods=['GET'])
def get_account_transactions(account_id):
    transactions_schema = TransactionSchema(many=True)

    try:
        account = db.session.query(Account).filter_by(id=account_id).first()
        transactions = account.transactions.all()
        result = transactions_schema.dump(transactions)
    except:
        return "<h1>ERROR</h1>"

    return jsonify({'transactions': result.data})


@app.route('/api/account/<int:account_id>/total', methods=['GET'])
def get_account_total(account_id):
    transactions_schema = TransactionSchema(many=True)

    try:
        account = Account.query.filter_by(id=account_id).first()
        result = account.total()
    except:
        return "<h1>ERROR</h1>"

    return jsonify({'total': result})


@app.route('/api/users', methods=['GET'])
def get_users():
    """ THIS SHOULD NOT MAKE IT TO PRODUCTION """
    users_schema = UserSchema(many=True)

    try:
        users = db.session.query(User).all()
        result = users_schema.dump(users)
    except:
        return "<h1>ERROR</h1>"

    return jsonify({'users': result.data})


@app.route('/api/user/<int:user_id>/accounts', methods=['GET'])
def get_user_accounts_via_id(user_id):
    accounts_schema = AccountSchema(many=True)

    try:
        accounts = db.session.query(Account).filter_by(user_id=user_id).all()
        result = accounts_schema.dump(accounts)
    except:
        return "<h1>ERROR</h1>"

    return jsonify({'accounts': result.data})

@app.route('/api/user/<string:username>/accounts', methods=['GET'])
def get_user_accounts_via_username(username):
    accounts_schema = AccountSchema(many=True)

    try:
        user_id = db.session.query(User.id).filter_by(username=username).first()
        accounts = db.session.query(Account).filter_by(user_id=user_id).all()
        result = accounts_schema.dump(accounts)
    except:
        return "<h1>ERROR</h1>"

    return jsonify({'accounts': result.data})

@app.route('/api/accounts', methods=['GET'])
def get_all_accounts():
    """ THIS SHOULD NOT MAKE IT TO PRODUCTION """
    accounts_schema = AccountSchema(many=True)

    try:
        accounts = db.session.query(Account).all()
        result = accounts_schema.dump(accounts)
    except:
        return "<h1>ERROR</h1>"

    return jsonify({'accounts': result.data})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
