import SearchBar from "../../components/SearchBar";
import MovieContent from "../../components/MovieContent";
import ShowContent from "../../components/ShowContent";

function Home() {
  return (
    <div className="Home">
      <SearchBar />
      <MovieContent />
      <ShowContent />
    </div>
  );
}

export default Home;
