import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function ErrorPage({message}) {
    return (
        <div className="section">
            <ErrorMessage message={message}/>
        </div> 
    );
}