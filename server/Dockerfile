FROM node as base

WORKDIR /home/node/app

COPY package*.json ./

COPY .env.example ./

RUN yarn

COPY . .

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /

RUN ["chmod", "+x", "./entrypoint.sh"]

