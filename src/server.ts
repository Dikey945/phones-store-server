import express from 'express';

import https from 'https';
import {ApolloServer} from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { json } from 'body-parser';
import {expressMiddleware} from "@apollo/server/express4";
import cors from 'cors';
import {typeDefs} from "./schema/typeDef";
import {resolvers} from "./schema/resolvers";
import * as process from "process";


async function startServer() {
  const app = express();
  const httpServer = https.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server),
  );
  app.use(express.static('dist'))

  // @ts-ignore
  new Promise((resolve) => httpServer.listen({ port: process.env.PORT || 5050 }, resolve)).then(() => {
    console.log(`🚀 Server ready at http://localhost:5050/graphql`)
  })
  // app.listen(process.env.PORT || 5050, () => {
  //   console.log(`🚀 Server ready at http://localhost:4001/graphql`)
  // })
}

startServer();

