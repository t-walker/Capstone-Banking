import sys

from time import sleep # Wait for the DB to be ready.

from worker import celery
from flask import Flask, send_file, jsonify, request, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask.ext.seasurf import SeaSurf
from werkzeug.security import generate_password_hash, check_password_hash

from flask.ext.seasurf import SeaSurf
from flask.ext.login import LoginManager, login_user, logout_user, current_user, login_required
from flask.ext.sqlalchemy import SQLAlchemy  # Database management
from flask.ext.marshmallow import Marshmallow  # Data serialization

sleep(5)  # Delay is required for allowing the Database to startup


app = Flask(__name__)
app.secret_key = "ASECRETKEYGOESHERE"
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://pgdbuser:pgdbpassword@db/varda"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['DEBUG'] = True

db = SQLAlchemy(app)
ma = Marshmallow(app)
# csrf = SeaSurf(app)
lm = LoginManager()

from models import *

# CREATE DATABASE
db.create_all()

# INITIALIZE LOGIN MANAGEMENT
lm.init_app(app)

# ROUTES


@app.route('/api/add/<int:param1>/<int:param2>')
def add(param1, param2):
    task = celery.send_task('add', args=[param1, param2], kwargs={})
    return jsonify({'result': task.get()})


@app.route('/api/')
def index():
    obj = {}
    obj['status'] = "running"
    print(obj, file=sys.stdout)
    return jsonify(**obj)


@app.route('/api/current_user', methods=['GET'])
def current():
    user_schema = UserSchema()

    try:
        if current_user.is_authenticated():
            result = user_schema.dump(current_user)
        else:
           return jsonify({'error': "no user logged in ... not authenticated"}), 500
    except:
        return jsonify({'error': "no user logged in"}), 500

    return jsonify({'result': result.data}), 200


@app.route('/api/login', methods=['POST'])
def login():
    body = request.json

    user = db.session.query(User).filter_by(email=body['email']).first()
    user_schema = UserSchema(many=False)

    if user is None:
        return jsonify({'error': 'could not find user'}), 500

    if user.check_password(body['password']):
        login_user(user, remember=False)
        result = user_schema.dump(current_user)
        return jsonify({'result': result})


    return jsonify({'error': 'could not find user'}), 500


@app.route('/api/logout', methods=['GET'])
def logout():
    logout_user()
    return jsonify({'result': 'successful logout'}), 200


@app.route('/api/register', methods=['POST'])
def create_user():
    # {'username': '', email: '' }
    print ("my request: ")
    print (request)

    user = User(**request.json)

    print(user)

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
        transactions = account.transactions.order_by(desc(Transaction.amount)).limit(500).all()
        transactions = transactions[::-1]
        result = transactions_schema.dump(transactions)
    except:
        return "<h1>ERROR</h1>"

    return jsonify({'result': result.data})


@app.route('/api/account/<int:account_id>/total', methods=['GET'])
def get_account_total(account_id):
    transactions_schema = TransactionSchema(many=True)

    account = Account.query.filter_by(id=account_id).first()
    result = account.total

    return jsonify({'total': result})


@app.route('/api/users', methods=['GET'])
def get_users():
    """ THIS SHOULD NOT MAKE IT TO PRODUCTION """
    users_schema = UserSchema(many=True)
    result = {}
    try:
        users = db.session.query(User).all()
        result = users_schema.dump(users)
        #result['data'] = ["one", "two", "three"]
    except Exception as inst:
        s = '<h1>ERROR GET USERS .{0}. .{1}. .{2}.</h1>'.format(type(inst), inst.args, inst)
        return s

    return jsonify({'result': result.data})


@app.route('/api/user/<int:user_id>/accounts', methods=['GET'])
def get_user_accounts_via_id(user_id):
    accounts_schema = AccountSchema(many=True)

    try:
        accounts = db.session.query(Account).filter_by(user_id=user_id).all()
        result = accounts_schema.dump(accounts)
    except:
        return jsonify({'error': "accounts invalid"}), 500

    return jsonify({'result': result.data})


@app.route('/api/user/<string:username>/accounts', methods=['GET'])
def get_user_accounts_via_username(username):
    accounts_schema = AccountSchema(many=True)

    try:
        user_id = db.session.query(User.id).filter_by(
            username=username).first()
        accounts = db.session.query(Account).filter_by(user_id=user_id).all()
        result = accounts_schema.dump(accounts)
    except:
        return jsonify({'error': "accounts invalid"}), 500

    return jsonify({'result': result.data}), 200


@app.route('/api/my/accounts', methods=['GET'])
@login_required
def my_accounts():
    user = current_user

    accounts_schema = AccountSchema(many=True)

    result = accounts_schema.dump(user.accounts)

    return jsonify({'result': result.data}), 200


@app.route('/api/my/loans', methods=['GET'])
@login_required
def my_loan_applications():
    loanapplication_schema = InitialLoanApplicationSchema(many=True)

    applications = db.session.query(InitialLoanApplication).filter_by(user_id=current_user.id).all()

    result = loanapplication_schema.dump(applications)

    return jsonify({'result': result.data}), 200


@app.route('/api/my/accounts/<int:account_id>/transactions', methods=['GET'])
def my_account_transactions(account_id):
    transaction_schema = TransactionSchema(many=True)

    try:
        transactions = db.session.query(Transaction).filter_by(account_id=account_id).order_by(Transaction.timestamp.desc()).limit(500).all()
        result = transaction_schema.dump(transactions)
    except:
        return jsonify({'error': "accounts invalid"}), 500

    return jsonify({'result': result.data})


@app.route('/api/transfer', methods=['POST'])
@login_required
def transfer():
    user = current_user
    body = request.json

    if body['type'] == 'user':
        # try:
        #     origin = db.session.query(Account).filter_by(id=body['accountF']).first()
        # except:
        #     return jsonify({'result': "Origin account does not exist"}), 500

        origin = db.session.query(Account).filter_by(id=body['accountF']).first()

        try:
            destination = db.session.query(Account).filter_by(id=body['accountT']).first()
        except:
            return jsonify({'result': "Destination does not exist"}), 500

        origin.withdraw(body['amount'], destination.account_type)
        destination.deposit(body['amount'], origin.account_type)
    elif body['type'] == 'internal':
        try:
            destination = db.session.query(User).filter_by(email=body['destination']).first()
        except:
            return jsonify({result: "User does not exist"})

        try:
            amount = abs(float(body['amount']))
        except:
            return jsonify({'result': "Amount invalid"}), 500

        try:
            from_account = current_user.accounts.filter_by(id=int(body['account'])).first()
        except:
            return jsonify({'result': "From account invalid"}), 500

        try:
            to_account = destination.accounts.all()[0]
        except:
            return jsonify({'result': "To account invalid"}), 500

        from_account.withdraw(amount, destination.email)
        to_account.deposit(amount, current_user.email)
    elif body['type'] == 'external':
        pass
    else:
        return jsonify({result: "Bad transfer type"}), 500

    db.session.commit()

    return jsonify({'result': "Transaction successful"}), 200

@app.route('/api/loan/apply', methods=['POST'])
def create_loan_application():
    loan = InitialLoanApplication(**request.json)
    loan.user_id = current_user.id

    try:
        db.session.add(loan)
        db.session.commit()
    except:
        db.session.rollback()
        return jsonify({'error': "accounts invalid"}), 500

    return request.data


@app.route('/api/loan/<int:loan_id>', methods=['GET'])
def loan_approval(loan_id):
    loan_schema = InitialLoanApplicationSchema(many=False)

    loans = db.session.query(InitialLoanApplication).filter_by(id=int(loan_id)).first()
    result = loan_schema.dump(loans)


    return jsonify({'result': result.data})


@app.route('/api/accounts', methods=['GET'])
def get_all_accounts():
    """ THIS SHOULD NOT MAKE IT TO PRODUCTION """
    accounts_schema = AccountSchema(many=True)

    try:
        accounts = db.session.query(Account).all()
        result = accounts_schema.dump(accounts)
    except:
        return jsonify({'error': "accounts invalid"}), 500

    return jsonify({'result': result.data}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
