FROM nginx:alpine

MAINTAINER Tyler Walker "twalkerweb@gmail.com"

COPY nginx.conf /etc/nginx/

COPY ./build/css /usr/share/nginx/html/css
COPY ./build/lib /usr/share/nginx/html/lib
COPY ./build/systemjs.config.js /usr/share/nginx/html/systemjs.config.js
COPY ./build/index.html /usr/share/nginx/html/index.html
COPY ./build/images /usr/share/nginx/html/images
COPY ./build/index.js /usr/share/nginx/html/index.js
COPY ./build/app usr/share/nginx/html/app
