import { useParams } from "react-router-dom";
import { useEffect, useState} from 'react';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import TmdbApiClient from '../../TmdbApiClient';
import css from './MovieReviews.module.css';

export default function MovieReviews() {

    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function getMovieReviews() {
            setLoading(true);
            try {
                const foundReviews = await TmdbApiClient.getMovieReviews(movieId);
                setReviews(foundReviews);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        }

        getMovieReviews();
    }, [movieId]);

    return (
        <>
            {loading && <Loader />}
            {errorMessage && <ErrorMessage message={errorMessage} />}
            {
                reviews.length > 0 ?
                <ul className={css.movieReviewList}>
                        {reviews.map(review => {
                            return (
                                <li key={review.id}>
                                    <b>Author: {review.author}</b>
                                    <p>{review.content}</p>
                                </li>
                            )   
                    })}
                    </ul>
                : <div>There are no reviews for this movie</div>
            }
        </> 
    );
}