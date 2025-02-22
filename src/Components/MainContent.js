import React, { useState } from 'react'
import WatchedSummary from './WatchedSummary';
import WatchedList from './WatchedList';
import MovieList from './MovieList';

export default function MainContent({ tempWatchedData, movies }) {
    const [watched, setWatched] = useState(tempWatchedData);
    const [isOpen1, setIsOpen1] = useState(true);
    const [isOpen2, setIsOpen2] = useState(true);
    return (
        <main className="main">
            <div className="box">
                <button
                    className="btn-toggle"
                    onClick={() => setIsOpen1((open) => !open)}
                >
                    {isOpen1 ? "–" : "+"}
                </button>
                {isOpen1 && (
                    <MovieList movies={movies} />
                )}
            </div>

            <div className="box">
                <button
                    className="btn-toggle"
                    onClick={() => setIsOpen2((open) => !open)}
                >
                    {isOpen2 ? "–" : "+"}
                </button>
                {isOpen2 && (
                    <>
                        <WatchedSummary watched={watched} />
                        <WatchedList watched={watched} />
                    </>
                )}
            </div>
        </main>
    )
}
