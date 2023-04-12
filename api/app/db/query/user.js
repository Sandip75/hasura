const { graph } = require("app/util").graphql;

function getUserList(limit = 10, offset = 0) {
  const query = `query($limit:Int, $offset:Int){
        user(limit: $limit, offset: $offset, order_by: {first_name: asc}) {
          first_name
              gender
              last_name
              id
        }
      }`;

  return graph.query(query, { limit, offset }).then((data) => data.user);
}

module.exports = {
  getUserList,
};
