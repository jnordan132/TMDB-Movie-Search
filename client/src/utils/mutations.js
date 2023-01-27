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
    $id: String!
    $overview: String!
    $posterPath: String!
    $title: String!
    $releaseDate: String!
    $voteAverage: Number!
  ) {
    addMovie(
      userId: $userId
      id: $id
      overview: $overview
      posterPath: $posterPath
      title: $title
      releaseDate: $releaseDate
      voteAverage: $voteAverage
    ) {
      _id
      username
      email
      savedMovies {
        id
        overview
        posterPath
        title
        releaseDate
        voteAverage
      }
    }
  }
`;

// export const REMOVE_BOOK = gql`
//     mutation removeBook($userId: String!, $bookId: String!) {
//         removeBook(userId: $userId, bookId: $bookId) {
//             _id
//             username
//             email
//             savedBooks {
//                 authors
//                 description
//                 image
//                 link
//                 title
//                 bookId
//             }
//         }
//     }
// `;
