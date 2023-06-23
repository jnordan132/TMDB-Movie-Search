import React, { useState, useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth.tsx";
import { REMOVE_MOVIE, REMOVE_SHOW } from "../../utils/mutations.tsx";
import { GET_USER } from "../../utils/queries.tsx";
import { removeMovieId, removeShowId } from "../../utils/localStorage.tsx";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: string;
  overview: string;
}

interface Show {
  id: number;
  poster_path: string;
  name: string;
  first_air_date: string;
  vote_average: string;
  overview: string;
}

export default function SavedList() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [removeMovie] = useMutation(REMOVE_MOVIE);
  const [removeShow] = useMutation(REMOVE_SHOW);

  const [userData, setUserData] = useState<any>({});
  const userDataLength = Object.keys(userData).length;
  const { data } = useQuery(GET_USER, {
    variables: { userId: (Auth.getProfile() as any).data._id },
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

  const handleDeleteMovie = async (id: number) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await removeMovie({
        variables: {
          userId: (Auth.getProfile() as any).data._id,
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

  const handleDeleteShow = async (id: number) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await removeShow({
        variables: {
          userId: (Auth.getProfile() as any).data._id,
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
        {userData.savedMovies.map((movie: Movie) => {
          const handleShow = (id: number) => {
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
                  alt={movie.title}
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
                        alt={movie.title}
                      />
                      <h3>{movie.title}</h3>
                      <div className="center">
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
        {userData.savedShows.map((show: Show) => {
          const handleShow = (id: number) => {
            setShow(id);
          };
          return (
            <div key={show.id} className="card text-center mb-3 beforeCard">
              <div className="card-body">
                <img
                  onClick={() => handleShow(show.id)}
                  className="card-img-top"
                  src={"https://image.tmdb.org/t/p/w500/" + show.poster_path}
                  alt={show.name}
                />
                <Modal
                  key={show.id}
                  className="modalCard"
                  show={show === show.id}
                  onHide={handleClose}
                >
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                    <div className="movieModal">
                      <img
                        className="card"
                        src={
                          "https://image.tmdb.org/t/p/w500/" + show.poster_path
                        }
                        alt={show.name}
                      />
                      <h3>{show.name}</h3>
                      <div className="center">
                        <h6>
                          <b>Release Date: {show.first_air_date}</b>
                        </h6>
                        <h6>
                          <b>Rating: {show.vote_average} / 10</b>
                        </h6>
                      </div>
                      <p>{show.overview}</p>
                    </div>
                    <div>
                      <div className="buttonDiv">
                        <button
                          className="saveBtn"
                          onClick={() => handleDeleteShow(show.id)}
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
}
