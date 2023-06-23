import * as React from "react";
import SearchBar from "../../components/SearchBar/index.tsx";
import MovieContent from "../../components/MovieContent/index.tsx";
import ShowContent from "../../components/ShowContent/index.tsx";

export default function Home() {
  return (
    <div className="Home">
      <SearchBar />
      <MovieContent
        id={0}
        title={""}
        poster_path={""}
        vote_average={0}
        release_date={0}
        overview={""}
      />
      <ShowContent
        id={0}
        name={""}
        poster_path={""}
        vote_average={0}
        first_air_date={0}
        overview={""}
      />
    </div>
  );
}
