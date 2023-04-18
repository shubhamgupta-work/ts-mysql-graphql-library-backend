import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import morgan from "morgan";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  status400ForVariableCoercionErrors: true,
});

const app: Application = express();

////BASIC FUNCTIONALITIES
app.use(cors<cors.CorsRequest>());
app.use(json());
app.use(morgan("dev"));

/////THE ONE AND THE ONLY ROUTE
(async () => {
  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        return { req };
      },
    })
  );
})();

export default app;
