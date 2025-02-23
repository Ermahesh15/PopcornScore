import React from 'react'
import WatchedListItem from './WatchedListItem'

export default function WatchedList({ watched, onDeleteWatched }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedListItem onDeleteWatched={onDeleteWatched} movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    )
}
