from server import db, ma
from werkzeug.security import generate_password_hash, check_password_hash

# MODELS
string_maximum = 255

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    first_name = db.Column(db.String(100), unique=False)
    last_name = db.Column(db.String(100), unique=False)
    email = db.Column(db.String(120), unique=True)
    password_hash = db.Column(db.String(1000), unique=False)

    accounts = db.relationship("Account", backref="user", lazy="dynamic")


    def __init__(self, username, email, first_name, last_name, password):
        self.username = username
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.password_hash = self.set_password(password)


    def set_password(self, password):
        return generate_password_hash(password)


    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return "<User {0}>".format(username)


class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    total = db.Column(db.Float, default=0.0, unique=False)
    account_type = db.Column(db.String(string_maximum), unique=False)
    transactions = db.relationship("Transaction", backref="account", lazy="dynamic")

    def deposit(self, amount, tx_from):
        tx = {'account_id': self.id, 'tx_type': 'D', 'tx_from': str(tx_from), 'tx_to': str(self.user_id), 'amount': amount}
        tx = Transaction(**tx)
        db.session.add(tx)
        db.session.commit()
        self.total += amount

    def withdraw(self, amount, tx_to):
        tx = {'account_id': self.id, 'tx_type': 'W', 'tx_from': str(self.user_id), 'tx_to': str(tx_to), 'amount': amount}
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


# Schemas
class UserSchema(ma.Schema):
    class Meta:
        fields = ('username', 'email', 'first_name', 'last_name')


class AccountSchema(ma.Schema):
    class Meta:
        fields = ('user_id', 'account_type')


class TransactionSchema(ma.Schema):
    class Meta:
        fields = ('account_id', 'tx_type', 'tx_from', 'tx_to', 'amount')
