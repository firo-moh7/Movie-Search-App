import type { Movie } from "../types/Type"
import type { TMDBMovieResponse, TMDBGenre} from "../types/tmdb";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchPopularMovies = async (): Promise<Movie[]> => {

    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)

    if (!res.ok){
        throw new Error("Failed to fetch popular movies")
    }

    const data:TMDBMovieResponse = await res.json()

    return data.results.map((movie) => ({
        id: movie.id.toString(),
        title: movie.title,
        year: movie.release_date,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));

}

export const searchMovies = async (query:string): Promise<Movie[]> => {

    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)

    if (!res.ok){
        throw new Error("Failed to fetch movies")
    }
    const data:TMDBMovieResponse = await res.json()

    return data.results.map((movie) => ({
        id: movie.id.toString(),
        title: movie.title,
        year: movie.release_date,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));

}

export const fetchMovieDetails = async (id:string): Promise<Movie> => {

    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)

    if (!res.ok){
        throw new Error("Failed to fetch movie details")
    }

    const data = await res.json()

    return {
        id: data.id.toString(),
        title: data.title,
        year: data.release_date,
        poster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : "",
        backdrop: data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : "",
        rating: data.vote_average,
        runtime: data.runtime,
        overview: data.overview,
        genres: data.genres.map((g:TMDBGenre) => g.name),
    };

}