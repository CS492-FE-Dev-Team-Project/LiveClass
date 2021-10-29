# FE-Dev-Server

# Dependencies

You should install [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/).

# How to use

## Run Server

This will run server on given port in `.env` file.

```sh
cp .env.example .env
docker-compose up
```

If you want to rebuild the container, run `docker-compose up --build`.

Server will run with `nodemon`, watching modifications in [src](./src) directory. The server will be automatically re-run when files in [src](./src) are modified.

## Stop Server

This command will stop the running containers

```sh
docker-compose stop
```
