import Auth from "../../utils/auth";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { clearMovieId } from "../../utils/localStorage";

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">MovieWiki</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/movies">Movies</Nav.Link>
          <Nav.Link href="/shows">TV Shows</Nav.Link>
          <NavDropdown title="Account" id="collasible-nav-dropdown">
            {Auth.loggedIn() ? (
              <>
                <NavDropdown.Item href="/saved">My List</NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    Auth.logout();
                    clearMovieId();
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </>
            ) : (
              <>
                <div>
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                </div>
                <div>
                  <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
                </div>
              </>
            )}
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Delete Account
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {/* <Nav>
          <Nav.Link href="#deets">More deets</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
            Dank memes
          </Nav.Link>
        </Nav> */}
      </Navbar.Collapse>
    </Navbar>
  );
}

// function Header() {
//   return (
//     <div className="header">
//       <h1>
//         <a href="/">MovieWiki</a>
//       </h1>
//       <nav className="navbar">
//         {Auth.loggedIn() ? (
//           <ul>
//             <li>
//               <a href="/saved">My List</a>
//             </li>
//             <li
//               onClick={() => {
//                 Auth.logout();
//                 clearMovieId();
//               }}
//             >
//               <a>Logout</a>
//             </li>
//           </ul>
//         ) : (
//           <ul>
//             <li>
//               <a href="/login">Login</a>
//             </li>
//             <li>
//               <a href="/signup">Signup</a>
//             </li>
//           </ul>
//         )}
//       </nav>
//     </div>
//   );
// }

export default Header;
