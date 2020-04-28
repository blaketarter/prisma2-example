# GraphQL Backend Example

An example GraphQL Backend using Prisma2, Apollo Server, nexus/schema, and using SQLite.

## ✅ Features

- https://github.com/graphql-nexus/schema - **GraphQL Schema** that's **code-first** with auto generated TypeScript definitions and GraphQL SDL
- https://github.com/apollographql/apollo-server - GraphQL **Engine** and **Server** integrated with Express that includes **GraphQL Playground**
- https://github.com/prisma/prisma - Modern **Database access** using Rust and **TypeScript** that integrates well with GraphQL tools
- https://github.com/maticzav/graphql-shield - **Permissions** system built for use with GraphQL schemas

## 📝 Workflows

### 1. Initial DB Setup
_This will be the first workflow one has to go through to initially setup the repo for further development._

After cloning the repo:

Decide what data source you want to use. If you want to use SQLite leave the `prisma/schema.prisma` file as is. However if you wish to change the data source refer to https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/data-sources

An example data source for `postgresql` would be:
```
datasource db {
  url      = env("DATABASE_URL")
  provider = "postgresql"
}
```
Along with a `.env` file located at `prisma/.env` that includes `DATABASE_URL=some_database_url`.

Once you've set up your data source:

- `npm i` to install deps
- `npm run migration:run` to create database
- create a `.env` in the root of the project and add an `APP_SECRET=app_secret_goes_here` to it
- `npm run prisma:seed` to seed initial data
- Ensure that the `postinstall` script ran, if it didn't run `npm run generate`

### 2. DB Migration
_This is the workflow one would go though to **change** the data model from it's current state._

After changing the `prisma/schema.prisma` file:

- `npm run migration:save` to create the migration file
- `npm run migration:run` to run the migration and alter the DB
- `npm run generate` to generate the new prisma client

### 3. View DB data
_This workflow enables you to locally view and edit the database with a GUI._

After at least workflow 1 is completed successfully and running all migrations:

- `npm run prisma:studio` to open prisma studio and view/edit data

### 4. Run Server
_This is the workflow one uses to start the GraphQL server and connect it to the database._

To start the server for local development after at least workflow 1 is completed successfully:

- `npm run start:dev` to start the server in watch mode
- visit the URL logged to the console to use the playground

To start the dist server after at least workflow 1 is completed successfully:

- `npm run build` to compile the typescript and put it in dist
- `npm run start` to start the server
- visit the URL logged to the console to use the playground

### 5. Change the GraphQL Schema
_This workflow details how to re-generate the TypeScript definitions and GraphQL schema SDL after changing the schema from it's current state._

After at least worflows 1 and 4 are completed successfully:

- Edit `src/schema.ts`
- `npm run generate` to generate new GraphQL types and schema

### 6. Build the App
After at least workflows 1 and 4 are completed successfully:

- `npm run build` to generate the dist code
- `npm run start` to start the dist code

### 7. Authentication
_All GraphQL Queries and Mutations except for `login` and `singup` are protected by authentication._

To **login** after at least workflows 1 and 4 are completed successfully:
- login with the seeded user by sending a `login` mutation with `email` and `password`
- add that token to the headers of following requests with the format `Authorization: Bearer <token_here>`, if you're using the GraphQL playground it expects an object with the format `{ 'Authorization': 'Bearer <token_here>' }`

To **signup** after at least workflows 1 and 4 are completed successfully:
- sign up with a new user by sending a `signup` mutation with at least `email` and `password`
- add that token to the headers of following requests with the format `Authorization: Bearer <token_here>`, if you're using the GraphQL playground it expects an object with the format `{ 'Authorization': 'Bearer <token_here>' }`

## 🏗 Structure

### Prisma/DB

- `prisma/schema.prisma`  - acts as the DB schema that also includes the connection details. Editing this and then creating and running migrations is the primary way to change the DB.
- `prisma/migrations`  - contains the code and documentation for all of the migrations the DB needs to be up to date.
- `prisma/seed.ts`  - contains the code to seed the DB with test data.

### Server/GraphQL

- `src/schema.ts`  - contains the code describing the GraphQL schema, it contains Entity definitions, Query and Mutation definitions, along with the resolvers for all fields. It uses nexus/schema and nexus-plugin-prisma to integrate the types and resolvers that prisma provides.
- `src/context.ts`  - sets up the apollo context object so you can use prisma queries and mutations inside of resolvers.
- `src/server.ts`  - sets up the apollo server and runs it
- `src/generated/nexus.ts`  - contains the auto-generated TypeScript types from nexus/schema
- `schema.graphql`  - contains the auto-generated GraphQL SDL from nexus/schema

### Auth/Permissions

- `src/permissions/index.ts`  - contains the definition of the rules that control permissions, and applies those rules to fields on the GraphQL schema
- `src/utils/auth/password.ts`  - utilities to hash and compare passwords
- `src/utils/auth/token.ts`  - utilities to sign and verify JWT tokens
- `src/utils/auth/getUserId.ts`  - utility to take an incoming auth header and return the verified userId from the JWT

## 🚀 Deployment

### Heroku

_Heroku deployment using Postgres as the database._

- Create a Heroku app
- Set up Heroku to pull from the desired repo
- Add the node buildpack to the app
- Add the Heroku Postgres add-on to the app
- Add all of the necessary environment variables to the `Config Vars` section in the app settings
  - `APP_SECRET` (required)
  - `DATABASE_URL` (required)
  - `GRAPHQL_INTROSPECTION` (optional)
  - `GRAPHQL_PLAYGROUND` (optional)
- Add `NODE_MODULES_CACHE`:`false` to the `Config Vars`, this is because the prisma client should not be cached
- Run a manual deploy of the app
- Turn on the `web` process in the `resources` tab of the app

## 🌐 Links

### Prisma

- https://www.prisma.io/blog/prisma-2-beta-b7bcl0gd8d8e/
- https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-prisma-migrate?lang=typescript&db=postgres
- https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-migrate
- https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-cli/command-reference#studio-experimental
- https://www.prisma.io/docs/understand-prisma/prisma-in-your-stack/graphql
- https://www.youtube.com/watch?v=tw1E9vVYWa8

### GraphQL

- https://www.apollographql.com/docs/apollo-server/
- https://github.com/prisma/prisma-examples/tree/master/typescript/graphql-apollo-server
- https://github.com/graphql-nexus/schema

### Auth

- https://github.com/prisma/prisma-examples/blob/master/typescript/graphql-auth
- https://github.com/maticzav/graphql-shield
- https://github.com/maticzav/graphql-shield/blob/master/examples/with-graphql-nexus
- https://github.com/prisma-labs/graphql-middleware

### Heroku

- https://devcenter.heroku.com/articles/getting-started-with-nodejs
- https://devcenter.heroku.com/articles/nodejs-support