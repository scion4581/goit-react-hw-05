import css from './MovieInfo.module.css';

export default function MovieInfo({ movie: { backdrop_path, original_title, overview, genres } }) {
    return (
        <div className={css.movieInfoCard}>
            <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} />
            <div>
                <h1 className={css.movieTitle} >{original_title}</h1>
                <div className={css.movieInfoRow}>
                    <b>Overview:</b>
                    <p>{overview}</p>
                </div>
                <div className={css.movieInfoRow}>
                    <b>Genres:</b>
                    <p>{genres.map(genre => genre.name).join(', ')}</p>
                </div>
            </div>
        </div>
    )
}