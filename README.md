# webapp-template
Webapp template using docker-compose with nodejs, nginx and mongodb.

## Use case

This docker-compose project can be used as a template for different web applications. The services included are an [nginx][1] webserver, a [mongo][2] database and an [NodeJS][3]/[ExpressJS][4] default generated app, which can be built upon.


## Prerequisites

### Generated ExpressJS webapp is included

Generating Express app using generator with `pug` view engine:

`express --view=pug app`

The webapp also includes some lines of code exemplifying the interaction with the composed mongodb container (`app/routes/index.js`).

### Preparing app for containerization

Install npm packages before building docker image, since modules are added within volume.

```bash
cd ./app
npm install
```

This is a potential drawback and might support copying app files into image rather than mounting a volume. This should be decided on a per app basis. When copying node files into the image directly, the Dockerfile must include the following lines to load all necessary modules:

```Dockerfile
WORKDIR /app
RUN npm install
```

## Creating an app based on this template

An app can be built by using the generated ExpressJS foundation. By using docker-compose with mongodb and nginx, the app will have an integrated database it can call upon as well as a complete webserver proxy to host the app.

The template is fairly flexible and may be adjusted to the needs required by the app.

### App debugging

Keep the mongodb data within the container by commenting out a line within the `docker-compose.yml` that mounts a volume containing the data:

```yml
volumes:
  - ./mongodb/database/data:/data/db
```

This prevents testing data from being written to disk, including configurations such as user permissions that may change and lead to unexpected behaviour while developing.

When run locally the mongodb can be accessed by using [compass][5] and the user information provided within `mongodb/.env` or `mongodb/.init.js`.

Omit `--detach` option when building the containers.

The template is set up as to reach the app at `localhost`.

## nginx configuration

nginx configurations can be done using the `nginx/nginx.conf`-file. SSL certificates are expected per default and can be added into `nginx/ssl`.
Generate self signed RSA certificates for testing purposes using [openSSL][6]:

```bash
sudo mkdir nginx/ssl
cd nginx/ssl

# Generate key pair
sudo openssl req -new -x509 -nodes -newkey rsa:4096 -keyout server.key -out server.crt

# Set correct key permissions
sudo chmod 400 server.key
sudo chmod 444 server.crt
```

## Building the docker container

`docker-compose up --build --detach`

## Stop and remove docker-compose containers

```bash
sudo docker-compose stop app nginx mongodb
sudo docker-compose rm app nginx mongodb
```


[1]: https://nginx.org/en/docs/
[2]: https://docs.mongodb.com/
[3]: https://nodejs.org/api/
[4]: https://expressjs.com/en/4x/api.html
[5]: https://www.mongodb.com/products/compass
[6]: https://www.openssl.org/docs/manmaster/man1/openssl-req.html