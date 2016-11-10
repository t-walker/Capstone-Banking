import random

from server import db
from models import *

users = []

users.append({'username': 'twalker',
              'email': 'twalker@email.com',
              'first_name': 'Tyler',
              'last_name': 'Walker',
              'role': 'admin',
              'password': 'password1'})

users.append({'username': 'jswanby',
              'email': 'jswanby@email.com',
              'first_name': 'Jason',
              'last_name': 'Swanby',
              'role': 'user',
              'password': 'password2'})

users.append({'username': 'dmarks',
              'email': 'dmarks@email.com',
              'first_name': 'Des',
              'last_name': 'Marks',
              'role': 'user',
              'password': 'password3'})

users.append({'username': 'tcruz',
              'email': 'tcruz@email.com',
              'first_name': 'Tyler',
              'last_name': 'Cruz',
              'role': 'admin',
              'password': 'password4'})

users.append({'username': 'acrandall',
              'email': 'acrandall@email.com',
              'first_name': 'Aaron',
              'last_name': 'Crandall',
              'role': 'user',
              'password': 'password5'})

users.append({'username': 'gsprint',
              'email': 'gsprint@email.com',
              'first_name': 'Gina',
              'last_name': 'Sprint',
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
            print("LOG: Adding user: " + u.first_name)
            db.session.add(u)
            db.session.commit()
        except:
            print("ERR: Could not add user.")
            db.session.rollback()

transactions = []

for user in db.session.query(User).all():
    account = user.accounts.filter_by(account_type='checking').first()
    print("LOG: Adding user: " + user.first_name + " transactions.")
    for i in range(1000):
        rand_wd = random.randint(0,1)
        if rand_wd == 1:
            wd = 'D'
        else:
            wd = 'W'

        amount = random.randint(1, 500)

        if wd == "W" and (account.total - amount) > 0 or wd == "D":
            if wd == "W":
                account.withdraw(amount, 'bank')
            if wd == "D":
                account.deposit(amount, 'bank')

db.session.commit()
