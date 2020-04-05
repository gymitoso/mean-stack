# Mean Stack

A full-stack JavaScript solution, which provides a starting point for MongoDB, Node.js, Express, and Angular based applications.

## Before You Begin

Before you begin I recommend you read about the basic building blocks that assemble a MEAN.JS application:

- MongoDB - Go through [MongoDB Official Website](https://mongodb.org/) and proceed to their [Official Manual](https://docs.mongodb.com/manual/), which should help you understand NoSQL and MongoDB better.
- Node.js - Start by going through [Node.js Official Website](http://nodejs.org/).
- Express - The best way to understand express is through its [Official Website](http://expressjs.com/), which has a [Getting Started](http://expressjs.com/starter/installing.html) guide, as well as an [ExpressJS](http://expressjs.com/en/guide/routing.html) guide for general express topics.
- Angular - Angular's [Official Website](https://angular.io/) is a great starting point.
- Angular CLI - Go through [Angular CLI Official Website](https://cli.angular.io/) and check their [Overview Page](https://angular.io/cli)

## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

- Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - You're going to use the [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) to install MongoDB and setup the production environment.
- Angular CLI - [Install Angular CLI](https://cli.angular.io/)

## Cloning The GitHub Repository

Use git to directly clone this repository:

```bash
git clone https://github.com/gymitoso/mean-stack.git
```

## Quick Install

To install the dependencies, run this in the application folder from the command-line:

```bash
npm install
```

And then install MongoDB with docker compose and execute the database migration:

```bash
docker-compose -f ./docker/mongo.yml up -d
npm run migrate-db
```

The first command will setup the MongoDB on port 27018 and the second will create a user (sys-admin@mean.com - admin) in MongoDB.

## Running Your Application

Run your application using npm:

```bash
npm start
```

Your Angular application runs on port 4200 with the _development_ environment configuration, so in your browser just go to [http://localhost:4200](http://localhost:4200). The Node.js API runs on port 4000, so in your browser just go to [http://localhost:4000/api/health](http://localhost:4000/api/health) and the browser should display 'OK'.

### Running in Production mode with Docker

To run your application with _production_ environment configuration:

```bash
docker-compose up -d --build
```

This will setup your Angular and Node.js application in port 4000. This application uses [Nginx](https://www.nginx.com/) to proxy requests in production.

## Linting

This app includes a static code analysis setup with [ESLint](https://eslint.org/). I recommend that you install the relevant IDE extensions for ESLint. Once you do, every time you press save, all your code will be formatted and reviewed for quality automatically. I also set up a git hook to automatically analyze your code before it is committed.

## Credits

[Linnovate](https://github.com/linnovate/mean)

[Mean.js](https://github.com/meanjs/mean)

## License

[The MIT License](LICENSE.md)
