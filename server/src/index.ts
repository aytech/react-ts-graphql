import express, { Application } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { connectDatabase } from './database'
import { typeDefs, resolvers } from './graphql'
import cookieParser from 'cookie-parser'

const mount = async (app: Application) => {
  const db = await connectDatabase()

  app.use(cookieParser(process.env.SECRET))

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res })
  })
  server.applyMiddleware({ app, path: '/api' })

  app.listen(process.env.APP_PORT)

  console.log(`[app]: http://localhost:${ process.env.APP_PORT }`);
}

mount(express())