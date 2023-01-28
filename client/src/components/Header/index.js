import Auth from "../../utils/auth";

function Header() {
  return (
    <div className="header">
      <h1>
        <a href="/">MovieWiki</a>
      </h1>
      <nav className="navbar">
        {Auth.loggedIn() ? (
          <ul>
            <li>
              <a href="/saved">My List</a>
            </li>
            <li onClick={Auth.logout}>
              <a>Logout</a>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/signup">Signup</a>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}

export default Header;
