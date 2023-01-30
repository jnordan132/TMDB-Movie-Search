import Auth from "../../utils/auth";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { REMOVE_USER } from "../../utils/mutations";
import { clearMovieId } from "../../utils/localStorage";

function Header() {
  const [removeUser] = useMutation(REMOVE_USER);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
                <NavDropdown.Item
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
            <NavDropdown.Divider />
            <NavDropdown.Item className="danger" onClick={removeUser}>
              Delete Account
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
