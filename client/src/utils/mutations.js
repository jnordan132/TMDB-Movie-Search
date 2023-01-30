import gql from "graphql-tag";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($username: String!, $email: String!, $password: String!) {
    removeUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const USER_LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation addMovie(
    $userId: ID!
    $id: Float!
    $overview: String!
    $poster_path: String!
    $title: String!
    $release_date: String!
    $vote_average: Float!
  ) {
    addMovie(
      userId: $userId
      id: $id
      overview: $overview
      poster_path: $poster_path
      title: $title
      release_date: $release_date
      vote_average: $vote_average
    ) {
      _id
      username
      email
      savedMovies {
        id
        overview
        poster_path
        title
        release_date
        vote_average
      }
    }
  }
`;

export const ADD_SHOW = gql`
  mutation addShow(
    $userId: ID!
    $id: Float!
    $overview: String!
    $poster_path: String!
    $name: String!
    $first_air_date: String!
    $vote_average: Float!
  ) {
    addShow(
      userId: $userId
      id: $id
      overview: $overview
      poster_path: $poster_path
      name: $name
      first_air_date: $first_air_date
      vote_average: $vote_average
    ) {
      _id
      username
      email
      savedShows {
        id
        overview
        poster_path
        name
        first_air_date
        vote_average
      }
    }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation removeMovie($userId: ID!, $id: Float!) {
    removeMovie(userId: $userId, id: $id) {
      _id
      savedMovies {
        id
      }
    }
  }
`;

export const REMOVE_SHOW = gql`
  mutation removeShow($userId: ID!, $id: Float!) {
    removeShow(userId: $userId, id: $id) {
      _id
      savedShows {
        id
      }
    }
  }
`;
