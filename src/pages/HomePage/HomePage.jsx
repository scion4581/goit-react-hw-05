import { useEffect, useState, useRef } from 'react';

import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import TmdbApiClient from '../../TmdbApiClient';

export default function HomePage() {

  const [trendMovies, setTrendMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function getMovies() {
      setLoading(true);
      try {
        const movies = await TmdbApiClient.getTrendingMoviesByTimeWindow();
        setTrendMovies(movies);
      } catch (error) {
        setErrorMessage(error.message); 
      } finally {
        setLoading(false);
      }
    }

    getMovies();
  }, []);   


  return (
    <div className="section">
      <h1>Trending today</h1>
      {loading && <Loader />}
      {trendMovies && <MovieList movies={trendMovies} />}
      {errorMessage && <ErrorMessage message={errorMessage}/>}
    </div>
  );
}