# webapp-template
Webapp template using docker-compose with nodejs, nginx and mongodb.

## This projects use case

This docker-compoase project will be used as a template for different web applications. The services included are an nginx webserver, a mongo database and an ExpressJS default generated app, which will be built upon.

## Prerequisites

### Generating ExpressJS webapp

Generating Express app using generator with `pug` view engine:

`express --view=pug app`

### Preparing app for containerization

Install npm packages before building docker image, since modules are added within module.

```bash
cd ./app
npm install
```

This is a potential downfall and might support copying app files into image rather than mounting a volume.

## Building the docker container

Omit option `--detach` for debugging:

`docker-compose up --build --detach`

## Stop and remove docker-compose images

```bash
sudo docker-compose stop app nginx mongodb
sudo docker-compose rm app nginx mongodb
```