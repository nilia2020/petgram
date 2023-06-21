const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { resolvers, typeDefs } = require("./schema");
const jwt = require("express-jwt");

// this is not secure! this is for dev purposes
process.env.JWT_SECRET = process.env.JWT_SECRET || "somereallylongsecretkey";

const PORT = process.env.PORT || 3500;

const { categories } = require("./db.json");
const { photos } = require("./db.json");

// auth middleware
const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
});
require("./adapter");
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const { status } = err;
  res.status(status).json(err);
};
app.use(errorHandler);

async function startApolloServer() {
  const app = express();
  app.use(cors(), auth);
  app.use((req, res) => {
    res.status(200);
    res.send("Hello!");
    res.end();
  });
  const server = new ApolloServer({
    introspection: true, // do this only for dev purposes
    playground: true, // do this only for dev purposes
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const { id, email } = req.user || {};
      return { id, email };
    },
  });
  await server.start();
  server.applyMiddleware({ app });

  app.get("/categories", function (req, res) {
    res.send(categories);
  });
  app.get("/photos", function (req, res) {
    res.send(photos);
  });

  await new Promise((resolve) => {
    if (!process.env.NOW_REGION) {
      app.listen({ port: PORT }, resolve);
    }
  });
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  return { server, app };
}
startApolloServer();
