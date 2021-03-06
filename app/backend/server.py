import sys

from time import sleep  # Wait for the DB to be ready.

from flask import Flask, send_file, jsonify, request, url_for
from flask.ext.seasurf import SeaSurf
from flask.ext.login import LoginManager, login_user, logout_user, current_user, login_required
from flask.ext.sqlalchemy import SQLAlchemy # Database management
from flask.ext.marshmallow import Marshmallow  # Data serialization
from sqlalchemy import func, and_

from werkzeug.security import generate_password_hash, check_password_hash

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
    account = Account()
    account.account_type = "Investment"

    user.accounts.append(account)

    print(user)

    try:
        db.session.add(user)
        db.session.commit()
        user.default_account = Account.query.filter_by(user_id=user.id).first()
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
        transactions = account.transactions.order_by(
            desc(Transaction.amount)).limit(500).all()
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
        s = '<h1>ERROR GET USERS .{0}. .{1}. .{2}.</h1>'.format(
            type(inst), inst.args, inst)
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


@app.route('/api/my/profile', methods=['POST'])
@login_required
def my_edit():
    user = current_user

    body = request.json

    if "first_name" in body:
        if body['first_name'] != user.first_name:
            user.first_name = body['first_name']

    if "last_name" in body:
        if body['last_name'] != user.last_name:
            user.last_name = body['last_name']

    if "email" in body:
        if body['email'] != user.email:
            user.email = body['email']

    if "new_password" in body and "old_password" in body:
        if user.check_password(body['old_password']):
            user.set_password(body['new_password'])
        else:
            return jsonify({'result': 'wrong password'}), 500


    if "default_account" in body:
        if body['default_account'] != user.default_account:
            user.default_account = body['default_account']

    db.session.add(user)
    db.session.commit()

    return jsonify({'result': 'success'}), 200


@app.route('/api/my/loans', methods=['GET'])
@login_required
def my_loan_applications():
    loanapplication_schema = LoanApplicationSchema(many=True)

    applications = db.session.query(LoanApplication).filter(and_(LoanApplication.updated != None, LoanApplication.user_id == current_user.id)).order_by(LoanApplication.updated).all()

    result = loanapplication_schema.dump(applications)

    return jsonify({'result': result.data}), 200


@app.route('/api/review/loans', methods=['GET'])
@login_required
def loans_to_review():
    loanapplication_schema = LoanApplicationSchema(many=True)

    applications = db.session.query(
        LoanApplication).filter_by(status='Pending').all()

    result = loanapplication_schema.dump(applications)

    return jsonify({'result': result.data}), 200


@app.route('/api/loans/marketplace', methods=['GET'])
@login_required
def loans_for_marketplace():
    loanapplication_schema = LoanApplicationSchema(many=True)

    applications = db.session.query(
        LoanApplication).filter_by(status='Approved', funding='community').all()

    result = loanapplication_schema.dump(applications)

    return jsonify({'result': result.data}), 200


@app.route('/api/loans/contribute', methods=['POST'])
@login_required
def contribute_to_loan():
    body = request.json

    loan = db.session.query(LoanApplication).filter_by(id=body['loan_id']).first()

    total = db.session.query(func.sum(LoanContribution.amount)).filter_by(loan_id=body['loan_id']).all()

    if total >= loan.amount:
        return jsonify({'result': "loan is funded"}), 500
    elif total + float(body['amount']) >= loan.amount:
        return jsonify({'result': "donation is too much"}), 500

    contribution = LoanContribution()
    contribution.lender_id = current_user.id
    contribution.loan_id = loan.id
    contribuion.amount = body['amount']

    db.session.add(contribuion)
    db.session.commit()

    return jsonify({'result': 'successful'}), 200


@app.route('/api/my/accounts/<int:account_id>/transactions', methods=['GET'])
def my_account_transactions(account_id):
    transaction_schema = TransactionSchema(many=True)

    try:
        transactions = db.session.query(Transaction).filter_by(
            account_id=account_id).order_by(Transaction.timestamp.desc()).limit(500).all()
        result = transaction_schema.dump(transactions)
    except:
        return jsonify({'error': "accounts invalid"}), 500

    return jsonify({'result': result.data})


@app.route('/api/transfer', methods=['POST'])
@login_required
def transfer():
    user = current_user
    body = request.json

    if body['amount'] < 0:
        return jsonify({'result': "Transfer value must be positive."}), 500

    if body['type'] == 'user':
        try:
            origin = db.session.query(Account).filter_by(
                id=body['accountF']).first()
        except:
            return jsonify({'result': "Origin account does not exist."}), 500

        try:
            destination = db.session.query(Account).filter_by(
                id=body['accountT']).first()
        except:
            return jsonify({'result': "Destination account does not exist."}), 500

        if origin.total < float(body['amount']):
            return jsonify({'result': "You do not have sufficent funds."}), 500
        else:
            origin.withdraw(body['amount'], destination.account_type)
            destination.deposit(body['amount'], origin.account_type)
    elif body['type'] == 'internal':
        try:
            destination = db.session.query(User).filter_by(
                email=body['destination']).first()
        except:
            return jsonify({result: "The user you are sending to does not exist."})

        try:
            amount = abs(float(body['amount']))
        except:
            return jsonify({'result': "You did not provide a valid account."}), 500

        try:
            from_account = current_user.accounts.filter_by(
                id=int(body['account'])).first()
        except:
            return jsonify({'result': "Your account choice is invalid."}), 500

        try:
            to_account = destination.accounts.all()[0]
        except:
            return jsonify({'result': "The destination account is invalid."}), 500

        if from_account.total < amount:
            return jsonify({'result': "You have insufficent funds."}), 500
        else:
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
    loan = LoanApplication(**request.json)
    loan.user_id = current_user.id

    try:
        db.session.add(loan)
        db.session.commit()
    except:
        db.session.rollback()
        return jsonify({'error': "accounts invalid"}), 500

    return request.data


@app.route('/api/loan/<int:loan_id>', methods=['GET'])
def loan_view(loan_id):
    loan_schema = LoanApplicationSchema(many=False)

    loans = db.session.query(LoanApplication).filter_by(
        id=int(loan_id)).first()

    amount = db.session.query(func.sum(LoanContribution.amount)).filter_by(loan_id=loan_id).first()

    result = loan_schema.dump(loans)

    return jsonify({'result': result.data})


@app.route('/api/loan/<int:loan_id>/review', methods=['POST'])
def loan_review(loan_id):
    body = request.json

    loan = db.session.query(LoanApplication).filter_by(
        id=int(loan_id)).first()

    if body['action'] == 'approve':
        if current_user.can_review():
            loan.approve()
            if loan.funding == "bank":
                user = db.session.query(User).filter_by(
                    id=loan.user_id).first()
                user.accounts[0].deposit(loan.amount)
                db.session.add(user)

            db.session.add(loan)
            db.session.commit()
            return jsonify({'result': ""}), 200
        else:
            return jsonify({'result': "user cannot review"}), 500


    if body['action'] == 'deny':
        if current_user.can_review():
            loan.deny()
            db.session.add(loan)
            db.session.commit()
            return jsonify({'result': ""}), 200
        else:
            return jsonify({'result': "user cannot review"}), 200



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
