const graphql = require("graphql.js");
const config = require("config").hasura;

const graph = graphql(config.url, {
  method: "POST",
  asJSON: true,
  headers: {
    "X-Hasura-Admin-Secret": config.adminSecret,
  },
  fragments: {},
});

module.exports = { graph };
