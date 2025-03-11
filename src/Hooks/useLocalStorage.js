import { useEffect, useState } from "react"

export function useLocalStorage(intialState, key) {
    const [value, setValue] = useState(function () {
        const storedData = localStorage.getItem(key)
        return JSON.parse(storedData)
    });

    useEffect(function () {
        localStorage.setItem('value', JSON.stringify(value))
    }, [value, key])

    return [value, setValue]
}
