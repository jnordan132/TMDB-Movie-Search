import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { REMOVE_MOVIE } from "../../utils/mutations";
import { GET_USER } from "../../utils/queries";
import { removeMovieId } from "../../utils/localStorage";

const SavedMovies = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [removeMovie] = useMutation(REMOVE_MOVIE);
  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;
  const { data } = useQuery(GET_USER, {
    variables: { userId: Auth.getProfile().data._id },
  });

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
  }, [data]);

  const handleDeleteMovie = async (id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await removeMovie({
        variables: {
          userId: Auth.getProfile().data._id,
          id: id,
        },
      });
      if (!response) {
        throw new Error("Something went wrong.");
      }
      removeMovieId(id);
      console.log(id);
    } catch (err) {
      console.error(err);
    }
  };
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }
  return (
    <div className="container">
      <h2>
        {userData.savedMovies.length
          ? `${userData.username + "'s " + userData.savedMovies.length} saved ${
              userData.savedMovies.length === 1 ? "movie" : "movies"
            }:`
          : "You have no saved movies!"}
      </h2>
      <br />
      <div className="grid">
        {userData.savedMovies.map((movie) => {
          const handleShow = (id) => {
            setShow(id);
          };
          return (
            <div key={movie.id} className="card text-center mb-3 beforeCard">
              <div className="card-body">
                <img
                  onClick={() => handleShow(movie.id)}
                  className="card-img-top"
                  src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                />
                <Modal
                  key={movie.id}
                  className="modalCard"
                  show={show === movie.id}
                  onHide={handleClose}
                >
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
                        <button
                          className="saveBtn"
                          onClick={() => handleDeleteMovie(movie.id)}
                        >
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
    </div>
  );
};

export default SavedMovies;
