import React, { useState } from 'react'
import WatchedSummary from './WatchedSummary';
import WatchedList from './WatchedList';
import MovieList from './MovieList';
import Box from './Box';

export default function MainContent({ tempWatchedData, movies }) {
    const [watched, setWatched] = useState(tempWatchedData);
    return (
        <main className="main">
            
            <Box>
                <MovieList movies={movies} />
            </Box>

            <Box>
                <WatchedSummary watched={watched} />
                <WatchedList watched={watched} />
            </Box>

        </main>
    )
}
