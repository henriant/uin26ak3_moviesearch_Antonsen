
import { useNavigate } from "react-router-dom";

export default function MovieCard({movie}) {
    const navigate = useNavigate()

    const handleClick = () => {
        // Navigasjon til filmside
        navigate(`/${movie.Title.replace(/\s+/g, '-').toLowerCase()}`, {
            state: {imdbID: movie.imdbID}
        })
    }

    const isValidUrl = (url) => {
        try{
            new URL(url)
            return true
        }catch (e) {
            return false
        }
    }

    const posterUrl = movie.Poster !== "N/A" && isValidUrl(movie.Poster) ? movie.Poster : null

    return (
        <li onClick={handleClick}>
            <h2>{movie.Title}</h2>
            <p>År: {movie.Year}</p>
            {posterUrl ? (
                <img src={posterUrl} alt={movie.Title} onError={(e) => {
                    console.log("Kunne ikke laste inn poster-bildet for ", movie.Title)
                    e.target.style.display = "none"
                }}
                />
            ) : (
                <p>Ingen bilde tilgjengelig</p>
            )}
        </li>
    )
}