import React from 'react'
import WatchedListItem from './WatchedListItem'

export default function WatchedList({ watched }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedListItem movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    )
}
