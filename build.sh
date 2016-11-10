#!/bin/sh
docker-compose rm
docker-compose build
docker-compose run api python3 seed.py
docker-compose up
