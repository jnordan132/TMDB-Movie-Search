import React, { useState, useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { REMOVE_MOVIE, REMOVE_SHOW } from "../../utils/mutations";
import { GET_USER } from "../../utils/queries";
import { removeMovieId, removeShowId } from "../../utils/localStorage";

const SavedList = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [removeMovie] = useMutation(REMOVE_MOVIE);
  const [removeShow] = useMutation(REMOVE_SHOW);

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
      console.log(response);
      if (!response) {
        throw new Error("Something went wrong.");
      }
      removeMovieId(id);
      console.log(id);
    } catch (err) {
      console.error(err);
    }
    handleClose();
  };

  const handleDeleteShow = async (id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await removeShow({
        variables: {
          userId: Auth.getProfile().data._id,
          id: id,
        },
      });
      console.log(response);
      if (!response) {
        throw new Error("Something went wrong.");
      }
      removeShowId(id);
      console.log(id);
    } catch (err) {
      console.error(err);
    }
    handleClose();
  };

  if (!userDataLength) {
    return (
      <Spinner animation="border" role="status" className="spinner">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <div className="container">
      <br />
      <h2 className="moviesSaved">
        {userData.savedMovies.length || userData.savedShows.length
          ? `${userData.username + "'s " + "Saved List:"}`
          : "You dont have anything saved!"}
      </h2>
      <br />
      <div className="grid">
        {userData.savedMovies.map((movie) => {
          const handleShow = (id) => {
            setShow(id);
          };
          return (
            <div
              key={movie.id || show.id}
              className="card text-center mb-3 beforeCard"
            >
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
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                    <div className="movieModal">
                      <img
                        className="card"
                        src={
                          "https://image.tmdb.org/t/p/w500/" + movie.poster_path
                        }
                      />
                      <h3>{movie.title}</h3>
                      <div class="center">
                        <h6>
                          <b>Release Date: {movie.release_date}</b>
                        </h6>
                        <h6>
                          <b>Rating: {movie.vote_average} / 10</b>
                        </h6>
                      </div>
                      <p>{movie.overview}</p>
                    </div>
                    <div>
                      <div className="buttonDiv">
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
        {userData.savedShows.map((shows) => {
          const handleShow = (id) => {
            setShow(id);
          };
          return (
            <div key={shows.id} className="card text-center mb-3 beforeCard">
              <div className="card-body">
                <img
                  onClick={() => handleShow(shows.id)}
                  className="card-img-top"
                  src={"https://image.tmdb.org/t/p/w500/" + shows.poster_path}
                />
                <Modal
                  key={shows.id}
                  className="modalCard"
                  show={show === shows.id}
                  onHide={handleClose}
                >
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                    <div className="movieModal">
                      <img
                        className="card"
                        src={
                          "https://image.tmdb.org/t/p/w500/" + shows.poster_path
                        }
                      />
                      <h3>{shows.name}</h3>
                      <div class="center">
                        <h6>
                          <b>Release Date: {shows.first_air_date}</b>
                        </h6>
                        <h6>
                          <b>Rating: {shows.vote_average} / 10</b>
                        </h6>
                      </div>
                      <p>{shows.overview}</p>
                    </div>
                    <div>
                      <div className="buttonDiv">
                        <button
                          className="saveBtn"
                          onClick={() => handleDeleteShow(shows.id)}
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

export default SavedList;
