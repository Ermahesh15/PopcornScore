import React, { useEffect, useState } from 'react'
import Loader from './Loader';
const KEY = process.env.REACT_APP_OMDB_API_KEY;

export default function MovieDetails({ onCloseMovie, selectedId }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(
        function () {
            async function getMovieDetails() {
                setIsLoading(true)
                const res = await fetch(`http://www.omdbapi.com/?i=${selectedId}&apikey=${KEY}`);
                const data = await res.json()
                setIsLoading(false)
                setMovie(data)
            }
            getMovieDetails()
        }, [selectedId])

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;
    return (

        <div className="details">
            {isLoading ? <Loader /> :
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster of ${movie} movie`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐️</span>
                                {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>

                    <section>
                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            }
        </div>
    )
}
