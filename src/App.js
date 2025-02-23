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

const KEY = process.env.REACT_APP_OMDB_API_KEY;


export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true)
          setError('')  // Reset error before new request
          const res = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${KEY}`);
          if (!res.ok) throw new Error('Something went wrong')

          const data = await res.json()
          if (data.Response === 'False') throw new Error('Movie not found!')
          setIsLoading(false)
          setMovies(data.Search)
        }
        catch (err) {
          setError(err.message)
        }
        finally {
          setIsLoading(false); // Ensures loading stops even if error occurs
        }
      }
      getMovieDetails()
    }, [query])


  function onCloseMovie() {
    setSelectedId(null)
  }

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleAddWacthed(item) {
    setWatched([...watched, item])
  }

  function handleDeleteWatched(id) {
    setWatched(watched.filter((movie) => movie.imdbID !== id && [...watched, movie]))
  }

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
              onCloseMovie={onCloseMovie}
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
