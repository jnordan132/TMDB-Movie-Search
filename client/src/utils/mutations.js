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
    $description: String!
    $movieId: String!
    $image: String!
    $title: String!
  ) {
    addMovie(
      userId: $userId
      description: $description
      movieId: $movieId
      image: $image
      title: $title
    ) {
      _id
      username
      email
      savedMovies {
        description
        image
        title
        movieId
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
