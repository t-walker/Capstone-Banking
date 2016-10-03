FROM ubuntu:16.04

MAINTAINER Tyler Walker "twalkerweb@gmail.com"

RUN apt-get update
RUN apt-get  upgrade -y
RUN apt-get install python3 python3-pip libpq-dev -y

COPY ./ /server

# Build the server
WORKDIR /server
RUN pip3 install -r requirements.txt
RUN pip3 install gunicorn

CMD gunicorn -b 0.0.0.0:5000 server:app
