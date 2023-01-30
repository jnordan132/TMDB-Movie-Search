import { Nav, Navbar } from "react-bootstrap";

function Footer() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="footer">
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

export default Footer;
