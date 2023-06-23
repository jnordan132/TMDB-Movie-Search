import * as React from "react";
import { Nav, Navbar } from "react-bootstrap";

export default function Footer() {
  return (
    <Navbar expand="lg" className="footer">
      <div className="footerContent">
        <h6>
          MovieWiki Was Created Using The{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="http://https://www.themoviedb.org/documentation/api"
          >
            TMDB API
          </a>
        </h6>
      </div>
    </Navbar>
  );
}
