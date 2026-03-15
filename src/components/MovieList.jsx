export default function MovieList({movies}){
    return(
        <ul>
            {movies?.map((movie, index) => (
                <li key={index}>
                    <h2>{movie.Title}</h2>
                    <p>År: {movie.Year}</p>
                    {movie.Poster !== "N/A" ? (
                        <img src={movie.Poster} alt={movie.Title} onError={(e) => {
                            console.log("Kunne ikke finne bilde for: ", movie.Title)
                            e.target.style.display = "none"
                        }} />
                    ) : (
                        <p>Ingen bilde tilgjengelig</p>
                    )}
                </li>
            ))}
        </ul>
    )
}