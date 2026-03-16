import '../style/MovieList.css'
import MovieCard from './MovieCard';

export default function MovieList({ movies }) {
  return (
    <ul>
      {movies?.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </ul>
  );
}
