# README

A Prisma2 with Apollo Server and nexus/schema example using SQLite.

## Workflows

### 1. Initial DB Setup

After cloning repo:

- `npm i` to install deps
- `npm run migration:run` to create database
- `npm run prisma:seed` to seed initial data
- Ensure that the `postinstall` script ran, if it didn't run `npm run generate`

### 2. DB Migration

After changing the `prisma/schema.prisma` file:

- `npm run migration:save` to create the migration file
- `npm run migration:run` to run the migration and alter the DB
- `npm run generate` to generate the new prisma client

### 3. View DB data

After the initial setup and running all migrations:

- `npm run prisma:studio` to open prisma studio and view/edit data

### 4. Run Server
After at least 1 and 2 are completed successfully:

- `npm run start:dev` to start the server in watch mode
- visit the URL logged to the console to use the playground

### 5. Change the GraphQL Schema
After at least 1, 2, and 4 are completed successfully:

- Edit `src/schema.ts`
- `npm run generate` to generate new GraphQL types and schema

### 6. Build the App
After at least 1, 2, and 4 are completed successfully:

- `npm run build` to generate the dist code
- `npm run start` to start the dist code

## Structure

### Prisma/DB

- `prisma/schema.prisma` acts as the DB schema that also includes the connection details. Editing this and then creating and running migrations is the primary way to change the DB.
- `prisma/migrations` contains the code and documentation for all of the migrations the DB needs to be up to date.
- `prisma/seed.ts` contains the code to seed the DB with test data.

### Server/GraphQL

- `src/schema.ts` contains the code describing the GraphQL schema, it contains Entity definitions, Query and Mutation definitions, along with the resolvers for all fields. It uses nexus/schema and nexus-plugin-prisma to integrate the types and resolvers that prisma provides.
- `src/context.ts` sets up the apollo context object so you can use prisma queries and mutations inside of resolvers.
- `src/server.ts` sets up the apollo server and runs it
- `src/generated/nexus.ts` contains the auto-generated TypeScript types from nexus/schema
- `schema.graphql` contains the auto-generated GraphQL SDL from nexus/schema

## Links

### Prisma

https://www.prisma.io/blog/prisma-2-beta-b7bcl0gd8d8e/

https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-prisma-migrate?lang=typescript&db=postgres

https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-migrate

https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-cli/command-reference#studio-experimental

https://www.prisma.io/docs/understand-prisma/prisma-in-your-stack/graphql

### GraphQL

https://www.apollographql.com/docs/apollo-server/

https://github.com/prisma/prisma-examples/tree/master/typescript/graphql-apollo-server

https://github.com/graphql-nexus/schema

### Auth

https://github.com/prisma/prisma-examples/blob/master/typescript/graphql-auth

https://github.com/maticzav/graphql-shield