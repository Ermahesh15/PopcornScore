import { useEffect, useState } from "react";
const KEY = process.env.REACT_APP_OMDB_API_KEY;

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("");


  useEffect(() => {
    callback?.();
    if (!query) return; // Prevents API call when query is empty
    const controller = new AbortController();
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        setError(""); // Reset error before new request

        const res = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${KEY}`, { signal: controller.signal });

        if (!res.ok) throw new Error("Something went wrong");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found!");

        setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false); // Ensures loading stops even if an error occurs
      }
    }

   // handleCloseMovie()
    getMovieDetails();

    return () => controller.abort(); // Cleanup function to cancel fetch if query changes

  }, [query]); // Effect runs when `query` changes

  return { movies, isLoading, error }
}
