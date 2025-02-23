import React, { useEffect, useRef, useState } from 'react'
import Loader from './Loader';
import StarRating from './StarRating';
const KEY = process.env.REACT_APP_OMDB_API_KEY;

export default function MovieDetails({ onCloseMovie, selectedId, handleAddWacthed, watched }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState('')
    const countRef = useRef(0);

    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
    console.log(isWatched)
    const watchedUserRating = watched.find(
        (movie) => movie.imdbID === selectedId
    )?.userRating;


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

    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating,
            countRatingDecisions: countRef.current,
        };

        handleAddWacthed(newWatchedMovie);
        onCloseMovie();
    }
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
                        {isWatched ?
                            <strong className='text-center'>
                                You rated with movie {watchedUserRating} <span>⭐️</span>
                            </strong> :

                            <div className="rating">
                                <StarRating
                                    maxRating={10}
                                    size={24}
                                    onSetRating={setUserRating}
                                />
                                {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+ Add to list</button>}
                            </div>
                        }
                        <p><em>{plot}</em></p>
                        <p><strong>Starring:</strong> {actors}</p>
                        <p><strong>Directed by:</strong> {director}</p>

                    </section>
                </>
            }
        </div>
    )
}
