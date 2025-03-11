import { useEffect, useState } from "react";
import './Assets/css/style.css'
import Header from "./Components/Header";
import MainContent from "./Components/MainContent";
import NumResults from "./Components/NumResults";
import Search from "./Components/Search";
import Box from "./Components/Box";
import MovieList from "./Components/MovieList";
import WatchedSummary from "./Components/WatchedSummary";
import WatchedList from "./Components/WatchedList";
import Loader from "./Components/Loader";
import ErrorMessage from "./Components/ErrorMessage";
import MovieDetails from "./Components/MovieDetails";
import { useMovies } from "./Hooks/useMovies";

export default function App() {
  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie)
  const [selectedId, setSelectedId] = useState(null);
  //const [watched, setWatched] = useState([]);

  const [watched, setWatched] = useState(function () {
    const storedData = localStorage.getItem('watched')
    return JSON.parse(storedData)
  });

  function handleCloseMovie() {
    setSelectedId(null)
  }

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleDeleteWatched(id) {
    setWatched(watched.filter((movie) => movie.imdbID !== id && [...watched, movie]))
  }

  // function handleAddWacthed(item) {
  //   setWatched([...watched, item])
  //   localStorage.setItem('watched', JSON.stringify([...watched, item]))
  // }

  function handleAddWacthed(item) {
    setWatched([...watched, item])
  }

  useEffect(function () {
    localStorage.setItem('watched', JSON.stringify(watched))
  }, [watched])



  return (
    <>
      <Header>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Header>


      <MainContent>

        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
        </Box>

        <Box>
          {selectedId ?
            <MovieDetails
              onCloseMovie={handleCloseMovie}
              selectedId={selectedId}
              handleAddWacthed={handleAddWacthed}
              watched={watched}
            /> : <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>}
        </Box>

      </MainContent>
    </>
  );
}
