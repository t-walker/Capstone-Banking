FROM python:alpine

MAINTAINER Tyler Walker "twalkerweb@gmail.com"


COPY backend /server
WORKDIR /server
RUN pip install -r requirements.txt
RUN pip install gunicorn

CMD gunicorn -b 0.0.0.0:5000 webinterface:app
