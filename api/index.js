const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { resolvers, typeDefs } = require("./schema");
const jwt = require("express-jwt");
const { InMemoryLRUCache } = require("@apollo/utils.keyvaluecache");

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
async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    cache: new InMemoryLRUCache(),
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
  app.use((req, res) => {
    res.status(200);
    res.send("Hello!");
    res.end();
  });
  app.use(cors(), auth);
  const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    const { status } = err;
    res.status(status).json(err);
  };
  app.use(errorHandler);

  app.get("/categories", function (req, res) {
    res.json(categories);
  });
  app.get("/photos", function (req, res) {
    res.json(photos);
  });

  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}${server}`);
  return { server, app };
}
startApolloServer();
