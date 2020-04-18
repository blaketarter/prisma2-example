import { ApolloServer } from 'apollo-server'
import dotenv from 'dotenv'
import { schema } from './schema'
import { createContext } from './context'
import { permissions } from "./permissions"
import { applyMiddleware } from 'graphql-middleware'

dotenv.config()

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: createContext,
})

server.listen(
  { port: 4000 },
  () =>
    console.log(
      `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/ts/graphql-apollo-server#using-the-graphql-api`,
    ),
)
