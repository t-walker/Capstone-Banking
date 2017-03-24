import datetime
import hashlib

from server import db, ma, lm
from flask_login import UserMixin, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from marshmallow import fields
from marshmallow_sqlalchemy import ModelSchema
from sqlalchemy import events

# MODELS
string_maximum = 255


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True)
    first_name = db.Column(db.String(100), unique=False)
    last_name = db.Column(db.String(100), unique=False)
    password_hash = db.Column(db.String(1000), unique=False)
    accounts = db.relationship("Account", backref="user", lazy="dynamic")
    role = db.Column(db.String(120), default="user")
    default_account = db.Column(db.Integer, unique=True)

    def __init__(self, email="", first_name="", last_name="", password="", role=""):
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.password_hash = self.set_password(password)

        if role:
            self.role = role


    def set_password(self, password):
        return generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def is_authenticated(self):
        return True  # If it's assigned to here, they are authenticated.

    def is_anonymous(self):
        return False


@lm.user_loader
def user_loader(id):
    user = db.session.query(User).filter_by(id=id).first()

    if user is None:
        return

    return user


@lm.unauthorized_handler
def unauthorized_handler():
    return '<h1>UNAUTHORIZED</h1>'


class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    total = db.Column(db.Float, default=0.0, unique=False)
    account_type = db.Column(db.String(string_maximum), unique=False)
    transactions = db.relationship(
        "Transaction", backref="account", lazy="dynamic")

    def deposit(self, amount, tx_from):
        user = User.query.filter_by(id=self.user_id).first()

        if user:
            user = user.email
        else:
            user = self.user_id

        tx = {'account_id': self.id, 'tx_type': 'D', 'tx_from': str(tx_from), 'tx_to': user, 'amount': amount}
        tx = Transaction(**tx)
        db.session.add(tx)
        db.session.commit()
        self.total += amount

    def withdraw(self, amount, tx_to):
        user = User.query.filter_by(id=self.user_id).first()

        if user:
            user = user.email
        else:
            user = self.user_id

        tx = {'account_id': self.id, 'tx_type': 'W', 'tx_from': user, 'tx_to': str(tx_to), 'amount': amount}
        tx = Transaction(**tx)
        db.session.add(tx)
        db.session.commit()
        self.total -= amount


class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    account_id = db.Column(db.Integer, db.ForeignKey('account.id'))
    tx_type = db.Column(db.String(1), unique=False)
    tx_from = db.Column(db.String(string_maximum), unique=False)
    tx_to = db.Column(db.String(string_maximum), unique=False)
    amount = db.Column(db.Float, unique=False)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.now)

class LoanTag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(200), unique=False)

loan_loantag = db.Table('loan_loantag',
    db.Column('loan_id', db.Integer, db.ForeignKey('initial_loan_application.id')),
    db.Column('tag_id', db.Integer, db.ForeignKey('loan_tag.id'))
)

class InitialLoanApplication(db.Model):
    __tablename__ = "initial_loan_application"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(200), unique=False)
    status = db.Column(db.String(200), unique=False, default="Pending")
    type = db.Column(db.String(50), unique=False)
    requested_amount = db.Column(db.Integer, unique=False)
    term = db.Column(db.String(50), unique=False)
    description = db.Column(db.String(2000), unique=False)
    funding = db.Column(db.String(50), unique=False)
    payment = db.Column(db.String(50), unique=False)
    submitted = db.Column(db.DateTime, default=datetime.datetime.now)
    tags = db.relationship(
        "LoanTag", secondary=loan_loantag)


# Schemas
class UserSchema(ModelSchema):

    class Meta:
        fields = ('email', 'first_name', 'last_name')

class InitialLoanApplicationSchema(ModelSchema):

    class Meta:
        fields = ('id', 'name', 'status', 'requested_amount', 'term', 'description')

class TransactionSchema(ModelSchema):
    account_id = fields.Integer()
    tx_type = fields.String()
    tx_from = fields.String()
    tx_to = fields.String()
    amount = fields.Float()

    class Meta:
        fields = ('account_id', 'tx_type', 'tx_from', 'tx_to', 'amount', 'timestamp')


class AccountSchema(ModelSchema):
    class Meta:
        fields = ('id', 'user_id', 'account_type', 'total')
