import css from './ErrorMessage.module.css';

export default function ErrorPage({ message }) {
    return (
        <div className={css.error}>
            <p>{message}</p>
        </div>
    );
}