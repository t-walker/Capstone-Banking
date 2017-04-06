import random

from server import db
from models import *

users = []

users.append({'email': 'twalker@email.com',
              'first_name': 'Tyler',
              'last_name': 'Walker',
              'password': 'password1',
              'role': 'admin'
              })

users.append({'email': 'mjenkins@email.com',
              'first_name': 'Micah',
              'last_name': 'Jenkins',
              'password': 'password2'})

users.append({'email': 'dmarks@email.com',
              'first_name': 'Des',
              'last_name': 'Marks',
              'password': 'password3'})

users.append({'email': 'tcruz@email.com',
              'first_name': 'Tyler',
              'last_name': 'Cruz',
              'password': 'password4'})

users.append({'email': 'acrandall@email.com',
              'first_name': 'Aaron',
              'last_name': 'Crandall',
              'password': 'password5'})

users.append({'email': 'gsprint@email.com',
              'first_name': 'Gina',
              'last_name': 'Sprint',
              'password': 'password3'})


for user in users:
    u = User(**user)

    email_c = len(User.query.filter_by(email=user['email']).all())

    accounts = []

    accounts.append({'account_type': 'checking'})
    accounts.append({'account_type': 'savings'})

    for account in accounts:
        a = Account(**account)
        u.accounts.append(a)

    if not email_c:
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
    for i in range(250):
        rand_wd = random.randint(0, 1)
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

    loans = []

    print("LOG: Adding user: " + user.first_name + " loans.")

    for i in range(50):
        loan = LoanApplication(user_id=user.id, name="loan" + str(i), type="personal", requested_amount=i*50, funding='community')
        db.session.add(loan)

db.session.commit()
