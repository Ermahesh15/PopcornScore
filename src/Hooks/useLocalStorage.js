import { useEffect, useState } from "react"

export function useLocalStorage() {
    const [watched, setWatched] = useState(function () {
        const storedData = localStorage.getItem('watched')
        return JSON.parse(storedData)
    });

    useEffect(function () {
        localStorage.setItem('watched', JSON.stringify(watched))
    }, [watched])

    return { watched, setWatched }
}
