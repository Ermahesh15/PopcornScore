import React from 'react'
import MovieListItem from './MovieListItem'

export default function MovieList({ movies, onSelectMovie }) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => <MovieListItem movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />)}
        </ul>
    )
}
