import React, { useState, useEffect } from "react";
import MovieContent from "../../components/MovieContent/index.tsx";
import { BsSearch } from "react-icons/bs";
import { Navbar, Container, Form, FormControl } from "react-bootstrap";

export default function Movies() {
  const API_KEY = "289007003aedc1f5fc443437ec56c8e0";
  const API = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results[0]);
        setMovies(data.results);
      });
  }, []);

  const searchMovie = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      if (query == "") {
        return;
      } else {
        const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`;
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setQuery(event.target.value);
  };
  return (
    <>
      <Navbar variant="dark">
        <Container fluid>
          <Navbar.Collapse id="navbarScroll">
            <Form
              className="d-flex justify-content-center searchBar"
              onSubmit={searchMovie}
              autoComplete="off"
            >
              <FormControl
                type="search"
                placeholder="Search..."
                className="me-2"
                aria-label="search"
                name="query"
                value={query}
                onChange={changeHandler}
              ></FormControl>
              <button type="submit" className="button">
                <BsSearch />
              </button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        {movies.length > 0 ? (
          <div className="container">
            <div className="grid">
              {movies.map((movieReq) => (
                <MovieContent key={movieReq.id} {...movieReq} />
              ))}
            </div>
          </div>
        ) : (
          <h6 className="display-2">Sorry! No Movies Found for Your Search!</h6>
        )}
      </div>
    </>
  );
}
