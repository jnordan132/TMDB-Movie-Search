const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Movie {
    _id: String
    movieId: String
    title: String
    description: String
    image: String
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
    addMovie(
      movieId: String!
      title: String!
      description: String
      image: String!
    ): User
    removeMovie(
      movieId: String!
      title: String!
      description: String
      image: String!
    ): User
    removeUser(userId: ID!): User
  }
`;

module.exports = typeDefs;
