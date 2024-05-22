import { useSearchParams, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';

import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import MovieSearchBar from '../../components/MovieSearchBar/MovieSearchBar';
import TmdbApiClient from '../../TmdbApiClient';

export default function MoviesPage() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
      async function findMovies() {
          const queryParam = searchParams.get('query');
          if (!queryParam) return;
            setErrorMessage('');
            setLoading(true);
            try {
              const foundMovies = await TmdbApiClient.findMoviesByName(queryParam);
              if (foundMovies) {
                setMovies(foundMovies);
              } else {
                setErrorMessage('There are no images found');
              }
            } catch (error) {
              setErrorMessage(error.message); 
            } finally {
              setLoading(false);
            }
        };

        findMovies();
    }, [searchParams]);
  
    return (
        <div className="section">
        <MovieSearchBar onSearchSumbit={setSearchParams} />    
        {loading && <Loader />}
        {errorMessage && <ErrorMessage message={errorMessage}/>}
        {movies.length > 0 && <MovieList movies={movies} />}
        </div>
    );
}