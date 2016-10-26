from server import db
from models import *

users = []

users.append({'username': 'twalker',
              'email': 'twalker@email.com',
              'first_name': 'Tyler',
              'last_name': 'Walker',
              'password': 'password1'})

users.append({'username': 'jswanby',
              'email': 'jswanby@email.com',
              'first_name': 'Jason',
              'last_name': 'Swanby',
              'password': 'password2'})

users.append({'username': 'dmarks',
              'email': 'dmarks@email.com',
              'first_name': 'Des',
              'last_name': 'Marks',
              'password': 'password3'})

for user in users:
    u = User(**user)

    username_c = len(User.query.filter_by(username=user['username']).all())
    email_c = len(User.query.filter_by(email=user['email']).all())

    accounts = []

    accounts.append({'account_type': 'checking'})
    accounts.append({'account_type': 'savings'})

    for account in accounts:
        a = Account(**account)
        u.accounts.append(a)

    if not username_c and not email_c:
        try:
            print("LOG: Trying to add user.")
            db.session.add(u)
            db.session.commit()
        except:
            print("ERR: Could not add user.")
            db.session.rollback()

transactions = []
transactions.append({'account_id': 2, 'tx_type': 'D', 'tx_from': 'BANK', 'tx_to': 'twalker', 'amount': 500})
transactions.append({'account_id': 4, 'tx_type': 'D', 'tx_from': 'BANK', 'tx_to': 'twalker', 'amount': 500})
transactions.append({'account_id': 6, 'tx_type': 'D', 'tx_from': 'BANK', 'tx_to': 'twalker', 'amount': 500})

for transaction in transactions:
    t = Transaction(**transaction)
    db.session.add(t)
    db.session.commit()
