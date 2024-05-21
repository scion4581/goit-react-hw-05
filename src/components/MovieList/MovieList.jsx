import { Link, useLocation } from "react-router-dom";

import css from './MovieList.module.css';

export default function MovieList({ movies }) {

  const location = useLocation();

  return (
    <ul className={css.movieList}>
        {movies.map((movie) => {
                return (
                    <li key={movie.id}>
                        <Link className={css.movieLink} to={`/movies/${movie.id}`} state={location}>
                          {movie.title}
                        </Link>
                    </li>
                );
            })}
    </ul>
  );
}