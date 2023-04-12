//#region module
const express = require("express");
const bodyParser = require("body-parser");
const errorhandler = require("errorhandler");
const { ApolloServer } = require("apollo-server-express");

const config = require("config").server;
const routes = require("../app/routes");
const log = require("app/util").logger;

const typeDefs = require("./graphql/typeDefs").default;
const resolvers = require("./graphql/resolvers");
//#endregion

function run() {
  const app = express();
  app.set("root", `${__dirname}/..`);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ limit: "50mb" }));

  // app.use(routes);

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  apolloServer.applyMiddleware({
    app,
    path: "/graphql",
  });

  // if (process.env.NODE_ENV === "production") {
  //   app.set("trust proxy", "loopback");
  // } else {
  //   app.use(errorhandler());
  // }

  app.listen(config.port, config.host, () => {
    log.info(`App running on http://${config.host}:${config.port}`);
  });
}

if (require.main === module) {
  run();
}

module.exports = run;
