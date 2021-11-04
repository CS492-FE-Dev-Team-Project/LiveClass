# FE-Dev-Server

# Dependencies

You should install [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/).

# How to use

## Run Development Server

### Prepare

If it is the first time, run `yarn prepare`. It will create `.env` file with given `.env.example` file.

### Run

Running `yarn up` at [server root directory](./) will run server on given port in `.env` file.

If you want to rebuild the container, run `docker-compose up --build`.

Server will run with `nodemon`, watching modifications in [src](./src) directory. The server will be automatically re-run when files in [src](./src) are modified.

### Stop

Running `yarn down` command will stop the running containers and tear them down.
