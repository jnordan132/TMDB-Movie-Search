import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { GET_USER } from "../../utils/queries";
import { REMOVE_MOVIE } from "../../utils/mutations";
import { removeMovieId } from "../../utils/localStorage";
import Auth from "../../utils/auth";
import { useQuery, useMutation } from "@apollo/client";

const SavedMovies = (
  id,
  title,
  poster_path,
  vote_average,
  release_date,
  overview
) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId: Auth.getProfile().data._id },
  });
  const [removeMovie] = useMutation(REMOVE_MOVIE);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
          return false;
        }
        setUserData(data?.user || []);
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  });

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteMovie = async () => {
    const movieToDelete = {
      id,
      title,
      poster_path,
      vote_average,
      release_date,
      overview,
    };
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await removeMovie({
        variables: {
          userId: Auth.getProfile().data._id,
          id,
          title,
          poster_path,
          vote_average,
          release_date,
          overview,
        },
      });
      if (!response) {
        throw new Error("Something went wrong.");
      }
      removeMovieId(movieToDelete.id);
    } catch (err) {
      console.error(err);
    }
  };
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }
  return (
    <div>
      <h2>
        {userData.savedMovies.length
          ? `Viewing ${userData.savedMovies.length} saved ${
              userData.savedMovies.length === 1 ? "movie" : "movies"
            }:`
          : "You have no saved movies!"}
      </h2>
      {userData.savedMovies.map((movie) => {
        return (
          <div key={movie.id} className="card text-center mb-3 beforeCard">
            <div className="card-body">
              <img
                onClick={handleShow}
                className="card-img-top"
                src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
              />
              <Modal className="modalCard" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <h6>Release Date: {movie.release_date}</h6>
                </Modal.Header>
                <Modal.Body>
                  <div className="movieModal">
                    <img
                      className="card"
                      src={
                        "https://image.tmdb.org/t/p/w500/" + movie.poster_path
                      }
                    />
                    <h3>{movie.title}</h3>
                    <br />
                    <p>{movie.overview}</p>
                    <br />
                    <h6>IMDb Rating: {movie.vote_average} / 10</h6>
                  </div>
                  <div>
                    <div>
                      <button className="saveBtn" onClick={handleDeleteMovie}>
                        Remove
                      </button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SavedMovies;
