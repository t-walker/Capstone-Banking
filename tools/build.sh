#!/bin/sh
cd ./app/frontend/
gulp build
cd ../../
docker-compose build
docker-compose up -d
