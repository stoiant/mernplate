# MERN Boilerplate

Boilerplate for MERN stack development, *NOT* ready for production or even *DEV* as its currently undergoing testing

**Highlights**

+ [Docker](https://www.docker.com/) containers
+ Using [HTTP/2](https://http2.github.io/)
+ Folder by Feature structure
+ Minimal [Material UI v4](https://material-ui.com/) design
+ Built-in React routing, [Redux](https://redux.js.org/)
+ [EJS](https://ejs.co/) for rendering
+ Handling database with [Mongoose](https://mongoosejs.com/)
+ [Winston](https://github.com/winstonjs/winston) for logging
+ Testing with [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/)
+ Clean code with [ESLint](https://eslint.org/), [JavaScript Standard Style](https://standardjs.com/)
+ [Webpack](https://webpack.js.org/) built production server
+ Log tailing in the browser using [log.io](http://logio.org/)
+ [MongoDB](https://docs.mongodb.com/) for database
+ Express monitoring using [exress-status](https://www.npmjs.com/package/express-status-monitor)
+ Server monitoring using [node-dash](https://www.npmjs.com/package/node-dash)

## Roadmap

These are the planned updates of the project.

- Documentation
- Production ready
- Add instructions for certbot and production deployment details
- Split mernplate by component
- GraphQL
- Role based authentication (currently dashboards and logs are public)
- Monitoring using ELK
- [K3S](https://k3s.io/) and [Rancher](https://rancher.com/docs/k3s/latest/en/) for production
- Cleanup

## Support

*NONE WHATSOEVER, NO WARRANTY OF ANY KIND, ETC.*

## Components


### Frontend

**Requirements:**
In order to be able to build and run the dependencies you will have to install a compatible version of node `Node v11.15.0` was tested to work with this project.

#### Development

Project is bootstrapped with [react-create-app](https://create-react-app.dev/docs/getting-started/). There is `Docker` image created for the client that uses `nginx` to serve the static content. For development is not necessary to build the image and it is easier to just run it locally.

Run <code>npm install</code> at client folder
Run <code>npm run start</code> at client folder

`react-create-app` will auto refresh as your code is updated. The server can be found under `localhost:3000` and it should be automatically launched with the `run` command.

**Configuration**

The configuration file is based on the `NODE_ENV` variable, which defaults to `development`. Here is the default configuration file:

```
REACT_APP_HOST=localhost
REACT_APP_LOG_PORT=6688
REACT_APP_API_PORT=3001
REACT_APP_DASH_PORT=3003
REACT_APP_SCHEME=http
```

`REACT_APP_` prefix is required by `react-create-app`. If you are running only the frontend the remaining settings will not be required.

**Docker**

If you want to build the docker image it comes bundled with `nginx`. You have to build the app before building the docker image using:

Run <code>npm run build</code> at client folder

The [Docker Compose](https://docs.docker.com/compose/compose-file/) is used to build the image with the corresponding configuration. If you prefer you can use the local build.

Since `nginx` is configured to use `SSL` you will have to generate your `localhost` certificates and replaced the ones found under `client/certs`. You can use the following command to generate your `localhost` certificates:

```
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

Move to the root directory and edit the `.env` file and change the `PROJECT` path to where you have cloned the repository. `PROJECT` path is used to mount the build directory so that your changes are reflected. The `client/build` directory is mounted so that `nginx` can serve the updated content.

Run <code>npm run client:dev -- build</code> at main project folder to build the image

Run <code>npm run client:dev -- up</code> at main project folder to start the image with ports published and build directory mounted.



#### Production

For production you will need a valid `SSL` certificate. You can use [Lets Encrypt](https://letsencrypt.org/) or [SSL For Free](https://www.sslforfree.com/) to obtain a valid certificate. 

If using `Lets Encrypt`, you ca utilize the `certbot`. For secured domains such as `.app` or `.dev` the setup with `certbot` will not work as `SSL` redirection is enforced.

When deploying for production you will have to copy the certificates to the mount directory.

Change the `localhost` to your `domain.*` inside `client/config/nginx.conf`. Change the `.env` file as well in the main directory to correspond to your settings.

**_TODO:_**  Add more details.

### Backend

**_TODO:_**  Currently `nginx` has a setup for `reverse-proxy` as there is no `SSL` configured for the `APP`, `Database` and `Log.io`. The client accesses the `express-status` dashboard, tailed logs, and `node-dash` using an `iframe`, it is not ideal but works for easy access when developing.

#### APP/API Server

**Configuration**

The default port for the `API` server is `3001` and the server dashboard runs under port `3003`. Express monitoring url is `:3001/status` and the server dashboard can be found at `:3003/node-dash`.

The environment confuguration files are found under `.env` and nodeEnv is used to source the configurations for development and production.

Sample configuration file:

```
IP=0.0.0.0
HOST=localhost
PORT=3001
CLIENT_HOST=localhost
# currently this is not used, idea is to be used for DEV and testing
CLIENT_PORT=3002
DB_HOST=database
DB_USER=
DB_PASS=
```

`Node v11.15.0` was used for the testing and is required to be install for things to work.

#### Development

First install the dependencies then run the server.

Run <code>npm install</code> at server folder
Run <code>npm run dev</code> at server folder

**Docker**

`.env` `DATA` is used for central mounting point.

Run <code>npm run server:dev -- build</code> at main project folder to build the image

Run <code>npm run client:server -- up</code> at main project folder to start the image with ports published and build directory mounted.


#### Production

Currently the same instructions as for Dev.

**_TODO:_**  Add `SSL` support for the API server, currently `nginx` reversed-proxy is used to access the API via SSL.


#### Database

The database is ran in a docker container only. The following is used for the docker image:

+ [pusion](https://github.com/phusion/baseimage-docker) Ubuntu 18.04 LTS
+ [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) v4.2
+ [MongoDB BI](https://docs.mongodb.com/bi-connector/master/) v2.13.1
+ configuration are located under `database/mongod` and `database/mongosqld`
+ [runit](http://smarden.org/runit/) is used to run both the mongodb and mongodb-bi

Ports:

+ 27017: process
+ 28017: http
+ 3307: mongod-bi

Mounts:

`.env` `DATA` is used for central mounting point, where database and logs are located.

**_TODO:_**  Add user setup and authentication for both MongoDB and the MongoDB BI connector.

#### Development

You have to build the image then run it using the following:

Run <code>npm run database -- build</code> at main project folder to build the image

Run <code>npm run database -- up</code> at main project folder to start the image with ports published and build directory mounted.

#### Production

Currently the same as developemnt.

#### Log.io

`.env` `DATA` is used for central mounting point, where logs from all services are located. The log.io runs the server at port `6688` and the data shipper is just ran locally.

To build and run the image use:

Run <code>npm run weblog -- build</code> at main project folder to build the image

Run <code>npm run weblog -- up</code> at main project folder to start the image with ports published and data directory mounted.

Development and production configurations are the same.


## Usage


## Docker commands

**_TODO:_** Add helpful commands when only the docker image is build and ran withot using composer.

Note: you may need to install nodemon: <code>npm install nodemon -g</code>

## NPM Scripts

In the main folder run `npm install` and then you can take advantage of the following scripts:

    
**npm run dev:client**

Starts the client using the `react-create-app` defaults:

```
npm start --prefix client
```


**npm run dev:server**

Starts the node server locally on port `3001`:

```
npm run dev --prefix server/
```

**npm run dev:run**

Starts both the client and server in DEV mode:

```
export NODE_ENV=development && concurrently \"npm run dev:client\" \"npm run dev:server\
```

**npm run dev:build**

Build the client and server for development:

```
export NODE_ENV=development && concurrently \"npm run dev:client\" \"npm run dev:server\
```

**npm run docker:dev**

Wrapper to build and run *ALL DEV* images. Pass the `docker-composer` parameter using `-- build` for example or `-- up -d` to run the image in deamon mode.

The underlying command being executed is:

```
docker-compose -f docker-compose-dev.yml -f docker-compose-server.yml -f docker-compose-database.yml -f docker-compose-weblog.yml
```

**npm run docker:prod**

Wrapper to build and run *ALL PROD* images. Pass the `docker-composer` parameter using `-- build` for example or `-- up -d` to run the image in deamon mode.

The underlying command being executed is:

```
docker-compose -f docker-compose-prod.yml -f docker-compose-server.yml -f docker-compose-database.yml -f docker-compose-weblog.yml
```

**npm run weblog**

Wrapper to build and run the weblog image. Pass the `docker-composer` parameter using `-- build` for example or `-- up -d` to run the image in deamon mode.

The underlying command being executed is:

```
docker-compose -f docker-compose-weblog.yml
```

**npm run database**

Wrapper to build and run the database image. Pass the `docker-composer` parameter using `-- build` for example or `-- up -d` to run the image in deamon mode.

The underlying command being executed is:

```
database": "docker-compose -f docker-compose-database.yml
```

**npm run server**

Wrapper to build and run the server image. Pass the `docker-composer` parameter using `-- build` for example or `-- up -d` to run the image in deamon mode.

The underlying command being executed is:

```
docker-compose -f docker-compose-server.yml
```

## PREREQUESITES

**_TODO:_** Add required setup to be able to start running the project.

## REFERENCES AND CREDITS

This template was largly inspired by [tamasszoke](https://github.com/tamasszoke/mern-boilerplate), but has gone large restructuring and additions.

## License

**The MIT License (MIT)**<br/>
Copyright (c) 2019 Stoian Topouzov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)
