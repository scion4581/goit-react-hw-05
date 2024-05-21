import { useParams, Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState, useRef, Suspense } from 'react';
import clsx from "clsx";

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import TmdbApiClient from '../../TmdbApiClient';

import css from './MovieInfoPage.module.css';

export default function MovieInfoPage() {

  const location = useLocation();
  const backLinkURLRef = useRef(location.state ?? "/movies");
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function getMovie() {
      setLoading(true);
      try {
        const foundMovie = await TmdbApiClient.getMovieById(movieId);
        setMovie(foundMovie);
      } catch (error) {
        setErrorMessage(error.message); 
      } finally {
        setLoading(false);
      }
    }

    getMovie();
  }, [movieId]);   

   const getActiveLinkClass = ({ isActive }) => {
        return clsx(isActive && css.active);
    };
    
  return (
    <div className="section">
      <Link to={backLinkURLRef.current}>{'<- Go back'}</Link>
      {loading && <Loader />}
      {movie && <MovieInfo movie={movie} />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <ul className={css.subPageLinks}>
            <li>
               <NavLink className={getActiveLinkClass} to={'cast'}>Cast</NavLink>
            </li>
            <li>
               <NavLink className={getActiveLinkClass} to={'reviews'}>Reviews</NavLink>
            </li>
      </ul>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
}