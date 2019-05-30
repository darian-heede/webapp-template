FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y nodejs npm

WORKDIR /app
#ADD package.json . 
#RUN npm install
