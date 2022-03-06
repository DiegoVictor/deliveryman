# Deliveryman
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/DiegoVictor/deliveryman/main?logo=github&style=flat-square)](https://github.com/DiegoVictor/deliveryman/actions)
[![typescript](https://img.shields.io/badge/typescript-4.5.5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![prisma](https://img.shields.io/badge/prisma-3.10.0-326690?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![eslint](https://img.shields.io/badge/eslint-8.9.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![airbnb-style](https://flat.badgen.net/badge/style-guide/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![jest](https://img.shields.io/badge/jest-27.5.1-brightgreen?style=flat-square&logo=jest)](https://jestjs.io/)
[![coverage](https://img.shields.io/codecov/c/gh/DiegoVictor/deliveryman?logo=codecov&style=flat-square)](https://codecov.io/gh/DiegoVictor/deliveryman)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://github.com/DiegoVictor/deliveryman/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)<br>
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Deliveryman&uri=https%3A%2F%2Fraw.githubusercontent.com%2FDiegoVictor%2Fdeliveryman%2Fmaster%2FInsomnia_2022-03-02.json)

Permit to register clients, deliverymen, deliveries and manage deliveries status (in progress, done, etc). The app has friendly errors, use JWT to logins, validation, also a simple versioning was made.

## Table of Contents
* [Installing](#installing)
  * [Configuring](#configuring)
    * [Postgres](#postgres)
      * [Migrations](#migrations)
    * [.env](#env)
* [Usage](#usage)
  * [Error Handling](#error-handling)
    * [Errors Reference](#errors-reference)
  * [Bearer Token](#bearer-token)
  * [Versioning](#versioning)
  * [Routes](#routes)
    * [Requests](#requests)
* [Running the tests](#running-the-tests)
  * [Coverage report](#coverage-report)

# Installing
Easy peasy lemon squeezy:
```
$ yarn
```
Or:
```
$ npm install
```
> Was installed and configured the [`eslint`](https://eslint.org/) and [`prettier`](https://prettier.io/) to keep the code clean and patterned.

## Configuring
The application use just one database: [Postgres](https://www.postgresql.org/). For the fastest setup is recommended to use [docker-compose](https://docs.docker.com/compose/), you just need to up all services:
```
$ docker-compose up -d
```

### Postgres
Responsible to store all application data. If for any reason you would like to create a Postgres container instead of use `docker-compose`, you can do it by running the following command:
```
$ docker run --name deliveryman-postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

#### Migrations
Remember to run the Postgres database migrations:
```
$ npx prisma migrate deploy
```
Or:
```
$ yarn prisma migrate deploy
```
> See more information on [migrate deploy](https://www.prisma.io/docs/reference/api-reference/command-reference#migrate-deploy).

### .env
In this file you may configure your JWT settings, database connection, app's port and a url to documentation (this will be returned with error responses, see [error section](#error-handling)). Rename the `.env.example` in the root directory to `.env` then just update with your settings.

|key|description|default
|---|---|---
|PORT|Port number where the app will run.|`3333`
|JWT_CLIENTS_SECRET|A alphanumeric random string. Used to create signed tokens for clients logins.| -
|JWT_DELIVERYMAN_SECRET|A alphanumeric random string. Used to create signed tokens for deliverymen logins.| -
|JWT_EXPIRATION|How long time will be the token valid. See [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#usage) repo for more information.|`1d`
|DATABASE_URL|Database url.|`postgresql://postgres:docker@localhost:5432/deliveryman?schema=public`
|DOCS_URL|An url to docs where users can find more information about the app's internal code errors.|`https://github.com/DiegoVictor/deliveryman#errors-reference`

# Usage
To start up the app run:
```
$ yarn dev:server
```
Or:
```
npm run dev:server
```

## Error Handling
Instead of only throw a simple message and HTTP Status Code this API return friendly errors:
```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Username or password incorrect",
  "code": 140,
  "docs": "https://github.com/DiegoVictor/deliveryman#errors-reference"
}
```
> Errors are implemented with [@hapi/boom](https://github.com/hapijs/boom).
> As you can see a url to error docs are returned too. To configure this url update the `DOCS_URL` key from `.env` file.
> In the next sub section ([Errors Reference](#errors-reference)) you can see the errors `code` description.

### Errors Reference
|code|message|description
|---|---|---
|140|Username or password incorrect|User and/or password is incorrect.
|240|Client already exists|The provided client's username is already in use.
|340|Deliveryman already exists|The provided deliveryman's username is already in use.
|440|Missing authentication token|The authentication token was not sent.
|441|Invalid authentication token|The authentication token provided is invalid or expired.

## Bearer Token
A few routes expect a Bearer Token in an `Authorization` header.
> You can see these routes in the [routes](#routes) section.
```
GET http://localhost:3333/v1/deliveryman/deliveries Authorization: Bearer <token>
```
> To achieve this token you just need authenticate through the `/sessions` route and it will return the `token` key with a valid Bearer Token.

## Versioning
A simple versioning was made. Just remember to set after the `host` the `/v1/` string to your requests.
```
GET http://localhost:3333/v1/deliveryman/deliveries
```

## Routes
|route|HTTP Method|params|description|auth method
|:---|:---:|:---:|:---:|:---:
|`/clients`|POST|Body with client's `username` and `password`.|Create a new client|:x:
|`/clients/auth`|POST|Body with client's `username` and `password`.|Authenticates clients, return a Bearer Token.|:x:
|`/clients/deliveries`|GET| - |Retrieve client's deliveries.|Bearer (Client)
|`/clients/deliveries`|POST|Body with delivery's `product_name`.|Create a new delivery.|Bearer (Client)
|`/deliveryman`|POST|Body with deliveryman's `username` and `password`.|Create a new deliveryman.|:x:
|`/deliveryman/auth`|POST|Body with deliveryman's `username` and `password`.|Authenticates deliveryman, return a Bearer Token.|:x:
|`/deliveryman/deliveries`|GET| - |Retrieve deliveryman's deliveries.|Bearer (Deliveryman)
|`/deliveries/not_delivered`|GET| - |Retrieve pending deliveries.|Bearer (Deliveryman)
|`/deliveries/:id/set_deliveryman`|PATCH| - |Set deliveryman from the token as the responsible for the delivery.|Bearer (Deliveryman)
|`/deliveries/:id/set_as_delivered`|PATCH| - |Set delivery as delivered.|Bearer (Deliveryman)

### Requests
* `POST /clients`

Request body:
```json
{
  "username": "johndoe",
  "password": "123456"
}
```

* `POST /clients/auth`

Request body:
```json
{
  "username": "johndoe",
  "password": "123456"
}
```

* `POST /clients/deliveries`

Request body:
```json
{
  "product_name": "Lemon Ice Cream"
}
```

* `POST /deliveryman`

Request body:
```json
{
  "username": "janedoe",
  "password": "123456"
}
```

* `POST /deliveryman/auth`

Request body:
```json
{
  "username": "janedoe",
  "password": "123456"
}
```

# Running the tests
[Jest](https://jestjs.io/) was the choice to test the app, to run:
```
$ yarn test
```
Or:
```
$ npm run test
```

## Coverage report
You can see the coverage report inside `tests/coverage`. They are automatically created after the tests run.
