import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth.tsx";
import { ADD_MOVIE } from "../../utils/mutations.tsx";
import { saveMovieIds, getSavedMovieIds } from "../../utils/localStorage.tsx";
interface MovieContentProps {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: number;
  overview: string;
}

export default function MovieContent({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
  overview,
}: MovieContentProps) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [addMovie] = useMutation(ADD_MOVIE);
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds() || []);

  useEffect(() => {
    saveMovieIds(savedMovieIds);
  }, [savedMovieIds]);

  const handleSaveMovie = async () => {
    if (savedMovieIds?.some((savedMovieId: any) => savedMovieId === id)) {
      return;
    }
    let currentSavedMovieIds = getSavedMovieIds() || [];

    currentSavedMovieIds.push(id);

    saveMovieIds(currentSavedMovieIds);
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
          userId: (Auth.getProfile() as any).data._id, // Type assertion
          id,
          title,
          poster_path,
          vote_average,
          release_date,
          overview,
        },
      });
      setSavedMovieIds(currentSavedMovieIds);
      saveMovieIds(currentSavedMovieIds);
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
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <div className="movieModal">
                <img
                  className="card"
                  src={"https://image.tmdb.org/t/p/w500/" + poster_path}
                />
                <h3>{title}</h3>
                <div className="center">
                  <h6>
                    <b>Release Date: {release_date}</b>
                  </h6>
                  <h6>
                    <b>Rating: {vote_average} / 10</b>
                  </h6>
                </div>
                <p>{overview}</p>
              </div>
              <div>
                {Auth.loggedIn() ? (
                  <div className="buttonDiv">
                    <button
                      disabled={savedMovieIds?.some(
                        (savedMovieId: any) => savedMovieId === id
                      )}
                      className="saveBtn"
                      onClick={() => {
                        handleSaveMovie();
                        handleClose();
                      }}
                    >
                      {savedMovieIds?.some(
                        (savedMovieId: any) => savedMovieId === id
                      )
                        ? "Saved"
                        : "Save"}
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="cantSave">
                      <a href="/login">Login</a> or <a href="/signup">Signup</a>{" "}
                      to save this
                    </p>
                  </div>
                )}
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}
