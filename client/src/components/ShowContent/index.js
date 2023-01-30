import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_SHOW } from "../../utils/mutations";
import { saveShowIds, getSavedShowIds } from "../../utils/localStorage";

const ShowContent = ({
  id,
  name,
  poster_path,
  vote_average,
  first_air_date,
  overview,
}) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [addShow] = useMutation(ADD_SHOW);
  const [savedShowIds, setSavedShowIds] = useState(getSavedShowIds() || []);

  useEffect(() => {
    saveShowIds(savedShowIds);
  }, [savedShowIds]);

  const handleSaveShow = async () => {
    if (savedShowIds?.some((savedShowId) => savedShowId === id)) {
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
          userId: Auth.getProfile().data._id,
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
                <br />
                <p>{overview}</p>
                <h6>
                  <b>Rating: {vote_average} / 10</b>
                </h6>
                <h6>
                  <b>Release Date: {first_air_date}</b>
                </h6>
              </div>
              <div>
                {Auth.loggedIn() ? (
                  <div>
                    <button
                      disabled={savedShowIds?.some(
                        (savedShowId) => savedShowId === id
                      )}
                      className="saveBtn"
                      onClick={() => {
                        handleSaveShow(id);
                        handleClose();
                      }}
                    >
                      {savedShowIds?.some((savedShowId) => savedShowId === id)
                        ? "Saved"
                        : "Save"}
                    </button>
                  </div>
                ) : (
                  <div>
                    <a href="/login">
                      <button className="saveBtn">Login</button>
                    </a>
                    <a href="/signup">
                      <button className="saveBtn">Signup</button>
                    </a>
                  </div>
                )}
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
};

export default ShowContent;
