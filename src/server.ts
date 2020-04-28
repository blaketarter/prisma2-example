import cors from "cors"
import dotenv from 'dotenv'
import express from "express"
import helmet from "helmet"
import { ApolloServer } from 'apollo-server-express'
import { applyMiddleware } from 'graphql-middleware'

import { createContext } from './context'
import { permissions } from "./permissions"
import { schema } from './schema'

dotenv.config()

const APP_PORT = process.env.PORT ?? 4000

const app = express();

app.use(helmet())
app.use(cors())

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: createContext,
})

server.applyMiddleware({ app });

app.listen({ port: APP_PORT }, () =>
  console.log(
    `🚀 Server ready at: http://localhost:${APP_PORT}${server.graphqlPath}\n⭐️ See sample queries: http://pris.ly/e/ts/graphql-apollo-server#using-the-graphql-api`,
  ),
  
);
