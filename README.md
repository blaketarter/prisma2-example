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

