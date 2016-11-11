#!/bin/sh
cd ./app/frontend/
gulp build
cd ../../
docker-compose rm
docker-compose build
docker-compose run api python3 seed.py
docker-compose up -d
