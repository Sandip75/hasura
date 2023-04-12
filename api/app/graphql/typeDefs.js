const { gql } = require("apollo-server-express");

export default gql`
  scalar UUID

  type User {
    id: UUID
    first_name: String
    last_name: String
    gender: String
  }

  type Query {
    getUserList(limit: Int, offset: Int): [User]
  }
`;
