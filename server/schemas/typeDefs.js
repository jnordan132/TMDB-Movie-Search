const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Movie {
    _id: String
    authors: [String]
    description: String
    movieId: String
    image: String
    link: String
    title: String
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedMovies: [Movie]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser(userId: ID!): User
  }
`;

module.exports = typeDefs;
