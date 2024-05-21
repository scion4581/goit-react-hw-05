import { useParams } from "react-router-dom";
import { useEffect, useState} from 'react';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import TmdbApiClient from '../../TmdbApiClient';
import css from './MovieCast.module.css';

export default function MovieCast() {

    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function getMovieCast() {
            setLoading(true);
            try {
                const foundCast = await TmdbApiClient.getMovieCast(movieId);
                setCast(foundCast);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        }

        getMovieCast();
    }, [movieId]);

    return (
        <>
            {loading && <Loader />}
            {errorMessage && <ErrorMessage message={errorMessage} />}
            {
                cast.length > 0 ?
                <ul className={css.movieCastList}>
                        {cast.map(actor => {
                            return (
                                <li key={actor.id}>
                                <img width={200} height={300} src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt={actor.name} />
                                <p>{actor.name}</p>
                        </li>
                        )
                    })}
                </ul>
                : <div>There is no cast info for this movie</div>
            }
        </> 
    );
}