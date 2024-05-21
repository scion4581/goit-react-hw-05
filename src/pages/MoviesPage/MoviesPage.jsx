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

  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
      const queryParam = searchParams.get('query');
      if (queryParam) {
          setQuery(queryParam);
      }
    }, [searchParams]); 

    useEffect(() => {
        async function findMovies() {
          if (query === '') return;
            setErrorMessage('');
            setLoading(true);
            try {
              const foundMovies = await TmdbApiClient.findMoviesByName(query);
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
    }, [query]);
  
    return (
        <div className="section">
        <MovieSearchBar onSearchSumbit={setSearchParams} />    
        {loading && <Loader />}
        {errorMessage && <ErrorMessage message={errorMessage}/>}
        {movies.length > 0 && <MovieList movies={movies} />}
        </div>
    );
}