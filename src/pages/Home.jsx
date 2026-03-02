import { useEffect, useState } from "react"
import History from "../components/History"

export default function Home(){

    const [search, setSearch] = useState()
    const storedHistory = localStorage.getItem("search")
    const[focused, setFocused] = useState(false)

    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])

    console.log("Denne kommer fra storage: ", storedHistory)

    const baseUrl = `http://www.omdbapi.com/?s=${search}&apikey=`

    //GJØR DETTE: !!!
    const apiKey = import.meta.env.VITE_APP_API_KEY

    useEffect(()=>{
             localStorage.setItem("search", JSON.stringify(history))
    }, [history])

    const getMovies = async()=> {
        try
        {
            const response = await fetch(`${baseUrl}${apiKey}`)
            const data = await response.json()
            console.log(data)
        }
        catch(err){
            console.error(err);
        }
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        e.target.reset()

        setHistory((prev) => [...prev, search])


    }

    console.log(history)

    return(
    <main>
        <h1>Filmbiblioteket</h1>
        <form onSubmit={handleSubmit} id="search_for_movies">
            <label>
                Søk etter filmer:
                <input type="search" placeholder="James Bond" onChange={handleChange} onFocus={() => setFocused(true)} /*onBlur={() => setFocused(false)}*/></input>
            </label>
            {focused ? <History history={history} setSearch={setSearch}/> : null}
            <button onClick={getMovies}>Søk</button>
        </form>
    </main>
    )
}