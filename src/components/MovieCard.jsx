import { useNavigate } from "react-router-dom";

export default function MovieCard({movie}) {
    const navigate = useNavigate()

    const handleClick = () => {
        // Navigasjon til filmside
        navigate(`/${movie.Title.replace(/\s+/g, '-').toLowerCase()}`, {
            state: {imdbID: movie.imdbID}
        })
    }

    return (
        <li onClick={handleClick}>
            <h2>{movie.Title}</h2>
            <p>År: {movie.Year}</p>
            {movie.Poster !== "N/A" ? (
                <img src={movie.Poster} alt={movie.Title} />
            ) : (
                <p>Ingen bilde tilgjengelig</p>
            )}
        </li>
    )
}