import express from 'express';

import http from 'http';
import {ApolloServer} from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { json } from 'body-parser';
import {expressMiddleware} from "@apollo/server/express4";
import cors from 'cors';
import {typeDefs} from "./schema/typeDef";
import {resolvers} from "./schema/resolvers";
import serverless from 'serverless-http';


// async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });


  // @ts-ignore
await server.start();

  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server),
  );
  app.use(express.static('dist'))

  const handler = serverless(app);
  // @ts-ignore
  // new Promise((resolve) => httpServer.listen({ port: 4001 }, resolve)).then(() => {
  //   console.log(`🚀 Server ready at http://localhost:4001/graphql`)
  // })

