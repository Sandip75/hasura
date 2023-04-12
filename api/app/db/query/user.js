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

  return graph
    .query(query, { limit, offset })
    .then((data) => data.user)
    .catch((err) => console.log("Error came :::", err));
}

function getUserListWithLocation() {
  const query = `{
        user(order_by: {first_name: asc}) {
          first_name
              gender
              last_name
              location: user_trackings {
                lat
                lng
              }
        }
      }`;

  return graph
    .query(query, {})
    .then((data) => data.user)
    .catch((err) => console.log("Error came :::", err));
}

module.exports = {
  getUserList,
  getUserListWithLocation,
};
