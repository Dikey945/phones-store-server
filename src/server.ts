import express from 'express';

import http from 'http';
import {ApolloServer} from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { json } from 'body-parser';
import {expressMiddleware} from "@apollo/server/express4";
import cors from 'cors';
import {typeDefs} from "./schema/typeDef";
import {resolvers} from "./schema/resolvers";
import * as process from "process";
import {startStandaloneServer} from "@apollo/server/standalone";


async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // const port = Number.parseInt(process.env.PORT!) || 4000;
  //
  // const { url } = await startStandaloneServer(server, { listen: { port } });
  //
  // console.log(`🚀 Server listening at: ${url}`);

  await server.start();

  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server),
  );
  app.use(express.static('dist'))

  // @ts-ignore
  // new Promise((resolve) => httpServer.listen({ port: process.env.PORT || 5050 }, resolve)).then(() => {
  //   console.log(`🚀 Server ready at http://localhost:5050/graphql`)
  // })
  app.listen(process.env.PORT || 5001, () => {
    console.log(`🚀 Server ready at http://localhost:5001/graphql`)
  })
}

startServer();

