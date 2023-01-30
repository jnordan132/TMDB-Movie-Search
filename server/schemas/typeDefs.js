const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Movie {
    id: Float
    overview: String
    poster_path: String
    title: String
    release_date: String
    vote_average: Float
  }

  type Show {
    id: Float
    overview: String
    poster_path: String
    name: String
    first_air_date: String
    vote_average: Float
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedMovies: [Movie]
    savedShows: [Show]
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
    removeUser(userId: ID!): User
    login(email: String!, password: String!): Auth
    addMovie(
      userId: ID!
      id: Float!
      overview: String!
      poster_path: String!
      title: String!
      release_date: String!
      vote_average: Float!
    ): User
    addShow(
      userId: ID!
      id: Float!
      overview: String!
      poster_path: String!
      name: String!
      first_air_date: String!
      vote_average: Float!
    ): User
    removeMovie(userId: ID!, id: Float!): User
    removeShow(userId: ID!, id: Float!): User
  }
`;

module.exports = typeDefs;
