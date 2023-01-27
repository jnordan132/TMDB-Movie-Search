const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Movie {
    id: String
    overview: String
    posterPath: String
    title: String
    releaseDate: String
    voteAverage: Float
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
      id: String!
      overview: String!
      posterPath: String!
      title: String!
      releaseDate: String!
      voteAverage: Float!
    ): User
    removeMovie(
      id: String!
      overview: String!
      posterPath: String!
      title: String!
      releaseDate: String!
      voteAverage: Float!
    ): User
    removeUser(userId: ID!): User
  }
`;

module.exports = typeDefs;
