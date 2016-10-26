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


class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    account_type = db.Column(db.String(string_maximum), unique=False)
    transactions = db.relationship("Transaction", backref="account", lazy="dynamic")

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    account_id = db.Column(db.Integer, db.ForeignKey('account.id'))
    tx_type = db.Column(db.String(1), unique=False)
    tx_from = db.Column(db.String(string_maximum), unique=False)
    tx_to = db.Column(db.String(string_maximum), unique=False)
    amount = db.Column(db.Float, unique=False)


# Schemas
class UserSchema(ma.Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True, validate=must_not_be_blank)
    first_name = fields.Str(required=True, validate=must_not_be_blank)
    last_name = fields.Str(required=True, validate=must_not_be_blank)
    email = fields.Str(required=True, validate=must_not_be_blank)


class AccountSchema(ma.Schema):
    class Meta:
        model = Account

class TransactionSchema(ma.Schema):
    account_id = fields.Integer(required=True, validate=must_not_be_blank)
    tx_type = fields.Str(required=True, validate=must_not_be_blank)
    tx_from = fields.Str(required=True, validate=must_not_be_blank)
    tx_to = fields.Str(required=True, validate=must_not_be_blank)
    amount = fields.Integer(required=True, validate=must_not_be_blank)
