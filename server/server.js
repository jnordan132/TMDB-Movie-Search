const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const express = require("express");
  const path = require("path");
  const db = require("./config/connection");

  const { ApolloServer } = require("apollo-server-express");
  const { typeDefs, resolvers } = require("./schemas");

  const PORT = process.env.PORT || 3001;
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.start().then(() => {
    server.applyMiddleware({ app });
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(
        `API server running on port ${PORT} in worker ${process.pid}!`
      );
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
}
