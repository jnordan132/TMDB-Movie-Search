import { Modal, show, Button } from "react-bootstrap";
import React, { useState } from "react";
// const API_IMG = "https://image.tmdb.org/t/p/w500/";

const MovieContent = ({
  title,
  poster_path,
  vote_average,
  release_date,
  overview,
}) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  if (poster_path == null || undefined || overview == "") {
    return;
  } else {
    return (
      <div className="card text-center mb-3 beforeCard">
        <div className="card-body">
          <img
            className="card-img-top"
            src={"https://image.tmdb.org/t/p/w500/" + poster_path}
          />
          <div className="card-body">
            <button type="button" className="button" onClick={handleShow}>
              View More
            </button>
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
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
};

export default MovieContent;
