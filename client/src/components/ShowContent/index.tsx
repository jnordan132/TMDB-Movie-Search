import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth.tsx";
import { ADD_SHOW } from "../../utils/mutations.tsx";
import { saveShowIds, getSavedShowIds } from "../../utils/localStorage.tsx";

interface MovieContentProps {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
  first_air_date: number;
  overview: string;
}

export default function ShowContent({
  id,
  name,
  poster_path,
  vote_average,
  first_air_date,
  overview,
}: MovieContentProps) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [addShow] = useMutation(ADD_SHOW);
  const [savedShowIds, setSavedShowIds] = useState(getSavedShowIds() || []);

  useEffect(() => {
    saveShowIds(savedShowIds);
  }, [savedShowIds]);

  const handleSaveShow = async () => {
    if (savedShowIds?.some((savedShowId: any) => savedShowId === id)) {
      return;
    }
    let currentSavedShowIds = getSavedShowIds() || [];

    currentSavedShowIds.push(id);

    saveShowIds(currentSavedShowIds);
    const showToSave = {
      id,
      name,
      poster_path,
      vote_average,
      first_air_date,
      overview,
    };
    console.log(showToSave);
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await addShow({
        variables: {
          userId: (Auth.getProfile() as any).data._id,
          id,
          name,
          poster_path,
          vote_average,
          first_air_date,
          overview,
        },
      });
      setSavedShowIds(currentSavedShowIds);
      saveShowIds(currentSavedShowIds);
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
                <h3>{name}</h3>

                <div className="center">
                  <h6>
                    <b>Release Date: {first_air_date}</b>
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
                    <br />
                    <button
                      disabled={savedShowIds?.some(
                        (savedShowId: any) => savedShowId === id
                      )}
                      className="saveBtn"
                      onClick={() => {
                        handleSaveShow();
                        handleClose();
                      }}
                    >
                      {savedShowIds?.some(
                        (savedShowId: any) => savedShowId === id
                      )
                        ? "Saved"
                        : "Save"}
                    </button>
                  </div>
                ) : (
                  <div>
                    <br />
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
