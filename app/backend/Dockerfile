FROM python:alpine

MAINTAINER Tyler Walker "twalkerweb@gmail.com"

COPY ./ /server

# Build the server
WORKDIR /server
RUN pip install -r requirements.txt
RUN pip install gunicorn

CMD gunicorn -b 0.0.0.0:5000 server:app
