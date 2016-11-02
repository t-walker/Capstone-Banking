from flask_login import login_manager
from server import db

@login_manager.user_loader
def user_loader(email):
    user = db.session.query(User).filer_by(email=email).first()

    if user is None:
        return

    return user


@login_manager.request_loader
def request_loader(request):
    email = request.data.get('email')

    user = db.session.query(User).filer_by(email=email).first()

    if user is None:
        return

    # DO NOT ever store passwords in plaintext and always compare password
    # hashes using constant-time comparison!
    user.is_authenticated = user.check_password(request.data.get('password'))

    return user
