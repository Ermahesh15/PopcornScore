import React, { useEffect, useRef } from 'react'

export default function Search({ query, setQuery }) {
    const inputEl = useRef(null);
    useEffect(function () {
        inputEl.current.focus()
        function enterCall(e) {
            if (document.activeElement === inputEl.current) return;
            if (e.code === 'Enter') {
                setQuery('')
            }
        }
        document.addEventListener('keydown', enterCall)
        return function () {
            document.removeEventListener('keydown', enterCall)
        }
    }, [setQuery])


    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            ref={inputEl}
            onChange={(e) => setQuery(e.target.value)}
        />
    )
}
