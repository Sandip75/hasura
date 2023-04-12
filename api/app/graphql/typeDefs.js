const { gql } = require("apollo-server-express");

export default gql`
  scalar UUID
  scalar Latitude
  scalar Longitude

  type User {
    id: UUID
    first_name: String
    last_name: String
    gender: String
  }

  type Location {
    lat: Latitude
    lng: Longitude
  }

  type FindUser {
    first_name: String
    last_name: String
    gender: String
    location: Location
  }

  type Query {
    getUserList(limit: Int, offset: Int): [User]
    findUsers(radius: Int, lat: Latitude, lng: Longitude): [FindUser]
  }
`;
