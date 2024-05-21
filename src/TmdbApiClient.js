import axios from "axios";

const TMDB_API_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = 'f654d0bddf526fa842b6e62e8fd1297a';

class TmdbAPI {    
    #httpClient;
    constructor(apiKey) {
        this.#httpClient = axios.create({
            baseURL: TMDB_API_URL,
            params: {
                api_key: apiKey,
                language: 'en-US'
            }
        });

        this.#httpClient.interceptors.response.use(null, axiosError => {
            console.log(axiosError);
            const error = { message: 'Нажаль виникла помилка' };
            if (axiosError.response?.data?.status_message) {
                error.message = axiosError.response.data.status_message;
            } 
            return Promise.reject(error);
        });
    }

    // timeWindow: possible values - day or week
    async getTrendingMoviesByTimeWindow(timeWindow = 'day') {
        const response =  await this.#fetch(`/trending/movie/${timeWindow}`);
        return response.results;
    }

    async getMovieById(movieId) {
        return await this.#fetch(`movie/${movieId}`);
    }

    async getMovieReviews(movieId) {
        const response = await this.#fetch(`movie/${movieId}/reviews`);
        return response.results;
    }

     async getMovieCast(movieId) {
        const response = await this.#fetch(`movie/${movieId}/credits`);
        return response.cast;
     }
    
    async findMoviesByName(query) {
        const response = await this.#fetch(`search/movie?query=${query}`);///&include_adult=false
        return response.results;
    }

    async #fetch(resourcePath, urlParams) {
        const response = await this.#httpClient.get(resourcePath, urlParams ?? null);
        return response.data;
    }
}

const TmdbApiClient = new TmdbAPI(TMDB_API_KEY);

export default TmdbApiClient;