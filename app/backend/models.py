from server import db, ma, lm
from flask_login import UserMixin, current_user
from werkzeug.security import generate_password_hash, check_password_hash

# MODELS
string_maximum = 255

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True)
    username = db.Column(db.String(80), unique=True)
    first_name = db.Column(db.String(100), unique=False)
    last_name = db.Column(db.String(100), unique=False)
    password_hash = db.Column(db.String(1000), unique=False)
    role = db.Column(db.String(10), unique=False)
    accounts = db.relationship("Account", backref="user", lazy="dynamic")


    def __init__(self, username= "", email="", role="", first_name="", last_name="", password=""):
        self.email = email
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.role = role
        self.password_hash = self.set_password(password)


    def set_password(self, password):
        return generate_password_hash(password)


    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def is_authenticated(self):
        return True # If it's assigned to here, they are authenticated.

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
    account_type = db.Column(db.String(string_maximum), unique=False)
    transactions = db.relationship("Transaction", backref="account", lazy="dynamic")


    def total(self):
        total = 0
        for tx in self.transactions:
            if tx.tx_type == "D":
                total += tx.amount
            if tx.tx_type == "W":
                total -= tx.amount
        return total


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
        fields = ('id', 'user_id', 'account_type')


class TransactionSchema(ma.Schema):
    class Meta:
        fields = ('account_id', 'tx_type', 'tx_from', 'tx_to', 'amount')
