import { useEffect, useState } from "react"
import History from "../components/History"
import MovieList from "../components/MovieList"

export default function Home(){

    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const storedHistory = localStorage.getItem("search")
    const [focused, setFocused] = useState(false)

    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])

    /* GJØR DETTE !!! */
    const apiKey = import.meta.env.VITE_APP_API_KEY

    useEffect(()=>{
        localStorage.setItem("search", JSON.stringify(history))
    }, [history])

    const getMovies = async () => {
        if (search.length < 3) return
        setIsSearching(true)

        try {
            const response = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=${apiKey}`)
            const data = await response.json()
            if (data.Search) {
                setMovies(data.Search) // Oppdaterer GUI-et med søkeresultater
            } else {
                setMovies([]) // Tømmer listen hvis ingen resultater
            }
        } catch(err) {
            console.error(err)
        } finally {
            setIsSearching(false)
        }
    }

    const fetchDefaultMovies = async () => {
        try {
            const response = await fetch(`http://www.omdbapi.com/?s=James+Bond&apikey=${apiKey}`)
            const data = await response.json()
            if (data.Search) {
                setMovies(data.Search.slice(0, 10)) // Setter default-filmer
            }
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchDefaultMovies()
    }, [apiKey])

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (search.length >= 3) {
            getMovies() // Kaller søkefunksjonen
        }
        if (!history.includes(search)) {
            setHistory((prev) => [...prev, search])
        }
    }

    return(
    <main>
        <h1>Filmbiblioteket</h1>
        <form onSubmit={handleSubmit} id="search_for_movies">
            <label>
                Søk etter filmer:
                <input type="search" placeholder="Søk etter film..." value={search} onChange={handleChange} onFocus={() => setFocused(true)}/>
            </label>
            {focused && <History history={history} setSearch={setSearch}/>}
            <button type="submit" disabled={search.length < 3}>Søk</button>
        </form>
        {isSearching ? <p>Søker...</p> : <MovieList movies={movies} />}
    </main>
    )
}
