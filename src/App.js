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

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  const [query, setQuery] = useState("interstellar");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
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
    setSelectedId(id)
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
          {selectedId ? <MovieDetails onCloseMovie={onCloseMovie} selectedId={selectedId} /> : <>
            <WatchedSummary watched={watched} />
            <WatchedList watched={watched} />
          </>}
        </Box>

      </MainContent>
    </>
  );
}
