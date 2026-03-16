import '../style/Movie.css'

import { useParams, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Movie() {
    const { movie } = useParams()
    const { state } = useLocation()
    const navigate = useNavigate()
    const [movieData, setMovieData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const apiKey = import.meta.env.VITE_APP_API_KEY

    useEffect(() => {
        const fetchMovie = async () => {
            setIsLoading(true)
            try {
                // Prioriterer imdbID, men bruker tittel-slug som fallback
                const query = state?.imdbID
                    ? `i=${state.imdbID}`
                    : `t=${movie.replace(/-/g, '+')}`

                const response = await fetch(
                    `https://www.omdbapi.com/?${query}&apikey=${apiKey}`
                )
                const data = await response.json()

                if (data.Response === "True") {
                    setMovieData(data)
                } else {
                    setError("Fant ikke filmen.")
                }
            } catch (err) {
                setError("Noe gikk galt.")
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchMovie()
    }, [movie, state, apiKey])

    if (isLoading) return <main><p>Laster...</p></main>
    if (error) return <main><p>{error}</p></main>

    return (
        <main>
            <button onClick={() => navigate("/")}>← Tilbake</button>
            <article>
                {movieData.Poster !== "N/A" ? (
                    <img src={movieData.Poster} alt={movieData.Title} />
                ) : (
                    <p>Ingen poster tilgjengelig</p>
                )}
                <section>
                    <h1>{movieData.Title}</h1>
                    <p><strong>År:</strong> {movieData.Year}</p>
                    <p><strong>Sjanger:</strong> {movieData.Genre}</p>
                    <p><strong>Regissør:</strong> {movieData.Director}</p>
                    <p><strong>IMDb-rating:</strong> {movieData.imdbRating}</p>
                </section>
            </article>
        </main>
    )
}