import React, { useState, useEffect } from "react";
import MovieContent from "../MovieContent/index.tsx";
import ShowContent from "../ShowContent/index.tsx";
import { BsSearch } from "react-icons/bs";
import { Navbar, Container, Form, FormControl } from "react-bootstrap";

export default function SearchBar() {
  const API_KEY = "289007003aedc1f5fc443437ec56c8e0";
  const API = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;
  const [content, setContent] = useState<
    Array<{
      name: any;
      first_air_date: any;
      poster_path: any;
      vote_average: any;
      release_date: any;
      overview: any;
      title?: string;
      id?: number;
    }>
  >([]);

  const [query, setQuery] = useState("");
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results[0]);
        setContent(data.results);
      });
  }, []);

  const searchContent = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      if (query == "") {
        return;
      } else {
        const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`;
        const res = await fetch(url);
        const data = await res.json();
        setContent(data.results);
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
              onSubmit={searchContent}
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
        {content.length > 0 ? (
          <div className="container">
            <div className="grid">
              {content.map((item) =>
                item.hasOwnProperty("title") ? (
                  <MovieContent
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    poster_path={item.poster_path}
                    vote_average={item.vote_average}
                    release_date={item.release_date}
                    overview={item.overview}
                  />
                ) : (
                  <ShowContent
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    poster_path={item.poster_path}
                    vote_average={item.vote_average}
                    first_air_date={item.first_air_date}
                    overview={item.overview}
                  />
                )
              )}
            </div>
          </div>
        ) : (
          <h6 className="display-2">
            Sorry! Nothing Was Found for Your Search!
          </h6>
        )}
      </div>
    </>
  );
}
