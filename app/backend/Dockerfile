FROM ubuntu:16.04

MAINTAINER Tyler Walker "twalkerweb@gmail.com"
WORKDIR /server

RUN apt-get update
RUN apt-get  upgrade -y
RUN apt-get install python3 python3-pip libpq-dev -y

COPY ./requirements.txt /server
RUN pip3 install -r requirements.txt

COPY ./ /server

WORKDIR /server

CMD python3 seed.py

# CMD gunicorn -c gunicorn.conf.py server:app
CMD python3 server.py
