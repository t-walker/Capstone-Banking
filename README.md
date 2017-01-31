# Varda | Development Guide

<<<<<<< HEAD
## Getting Started 
=======
## Getting Started
>>>>>>> 39046f69d621881e74da3d3e631f1b3c39754037

It's recommended to use a Virtual Machine (VM) to run the application. The project uses Docker which allows for some flexibility however running Docker in its own VM might be the best.

## Installing Docker & Docker Compose

<<<<<<< HEAD
`sudo apt install docker.io`

`sudo apt install docker-compose`
=======
`apt install docker.io`

`apt install docker-compose`
>>>>>>> 39046f69d621881e74da3d3e631f1b3c39754037

## Running the application

To start the Docker containers, simply run the command below:

<<<<<<< HEAD
`sudo docker-compose up` 

You will be able to view the root of the application at `127.0.0.1:5000`.
=======
`docker-compose up`

If you have issues running this command, your might not be in the Docker group.

You will be able to view the root of the application at `127.0.0.1:5000`.

## Viewing the Application (without API)

Move into the directory: `cd app/frontend/`

To start the webserver: `gulp dev`

This will only serve the Angular2 project.
>>>>>>> 39046f69d621881e74da3d3e631f1b3c39754037
