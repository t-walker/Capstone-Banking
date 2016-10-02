FROM Ubuntu

MAINTAINER Tyler Walker "twalkerweb@gmail.com"

RUN apt-get install npm

COPY ./frontend /web
COPY ./backend /server

# Build the web
WORKDIR /web
RUN npm install -g
RUN npm install gulp -g
RUN gulp
RUN cp /web/build/ /server/templates/

# Build the server
WORKDIR /server
RUN pip install -r requirements.txt
RUN pip install gunicorn

CMD gunicorn -b 0.0.0.0:5000 server:app
