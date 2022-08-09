import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MovieContent from "./components/MovieContent";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <MovieContent />
      <Footer />
    </div>
  );
}

export default App;
