const { graph } = require("app/util").graphql;

function getUserList() {
  const query = `query{
        user {
          first_name
              gender
              last_name
              id
        }
      }`;

  return graph.query(query, {}).then((data) => data);
}

module.exports = {
  getUserList,
};
