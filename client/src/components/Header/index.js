import Auth from "../../utils/auth";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { clearMovieId } from "../../utils/localStorage";

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="grey" variant="dark">
      <Navbar.Brand href="/">MovieWiki</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/movies">Movies</Nav.Link>
          <Nav.Link href="/shows">TV Shows</Nav.Link>
        </Nav>

        <Nav className="right">
          <NavDropdown title="Account" id="collasible-nav-dropdown">
            {Auth.loggedIn() ? (
              <div className="dropDown">
                <NavDropdown.Item href="/saved">My List</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  className="danger"
                  onClick={() => {
                    Auth.logout();
                    clearMovieId();
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </div>
            ) : (
              <div className="dropDown">
                <div>
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                </div>
                <div>
                  <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
                </div>
              </div>
            )}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
