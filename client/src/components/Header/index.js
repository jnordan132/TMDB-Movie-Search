function Header() {
  return (
    <div className="header">
      <h1>
        <a href="https://jnordan132.github.io/TMDB-Movie-Search/">MovieWiki</a>
      </h1>
      <nav className="navbar">
        <ul>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/signup">Signup</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
