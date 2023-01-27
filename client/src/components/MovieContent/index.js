import { Modal, show, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_MOVIE } from "../../utils/mutations";
import { saveMovieIds, getSavedMovieIds } from "../../utils/localStorage";
// const API_IMG = "https://image.tmdb.org/t/p/w500/";

const MovieContent = ({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
  overview,
}) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [addMovie] = useMutation(ADD_MOVIE);
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  });

  const handleSaveMovie = async () => {
    const movieToSave = {
      id,
      title,
      poster_path,
      vote_average,
      release_date,
      overview,
    };
    console.log(movieToSave);
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await addMovie({
        variables: {
          userId: {
            id,
            title,
            poster_path,
            vote_average,
            release_date,
            overview,
          },
        },
      });
      // if book successfully saves to user's account, save book id to state
      setSavedMovieIds([...savedMovieIds, movieToSave.id]);
    } catch (err) {
      console.error(err);
    }
  };

  if (poster_path == null || overview == "") {
    return;
  } else {
    return (
      <div className="card text-center mb-3 beforeCard">
        <div className="card-body">
          <img
            onClick={handleShow}
            className="card-img-top"
            src={"https://image.tmdb.org/t/p/w500/" + poster_path}
          />
          <Modal className="modalCard" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <h6>Release Date: {release_date}</h6>
            </Modal.Header>
            <Modal.Body>
              <div className="movieModal">
                <img
                  className="card"
                  src={"https://image.tmdb.org/t/p/w500/" + poster_path}
                />
                <h3>{title}</h3>
                <br />
                <p>{overview}</p>
                <br />
                <h6>IMDb Rating: {vote_average} / 10</h6>
              </div>
              <button className="saveBtn" onClick={handleSaveMovie}>
                Save
              </button>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
};

export default MovieContent;
