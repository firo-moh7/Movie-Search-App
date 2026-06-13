import {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Movie } from '../types/Type';

const MoviesDetails = () => {

  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = await res.json();

        const formattedMovie = {
            id: data.id.toString(),
            title: data.title,
            year: data.release_date,
            poster: data.poster_path
                ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                : "",
            backdrop: data.backdrop_path
                ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
                : "",
            rating: data.vote_average,
            runtime: data.runtime,
            overview: data.overview,
            genres: data.genres.map((g: any) => g.name),
            };
        setMovie(formattedMovie);
      }
         catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!movie) {
    return <p className="text-center text-gray-600">Movie not found.</p>;
  }

  return (

    <div className="min-h-screen bg-black/70 text-white">
      <Link to="/" className="inline-block mt-4 ml-4 text-blue-500 hover:underline">
        ← Back to Home
      </Link>
        
        {/* Background */}
        <div
        className="h-[60vh] bg-cover bg-center relative"
        style={{
            backgroundImage: `url(${movie.backdrop})`,
        }}
        >
        <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto p-6 -mt-32 relative z-10">

        <div className="flex flex-col md:flex-row gap-6">
            
            <img
            src={movie.poster}
            className="w-64 rounded-xl shadow-lg"
            />

            <div>
            <h1 className="text-3xl font-bold">{movie.title}</h1>

            <p className="text-gray-300 mt-2">
                ⭐ {movie.rating?.toFixed(1)} / 10
            </p>

            <p className="text-gray-400">
                ⏱ {movie.runtime} min
            </p>

            <p className="mt-4 text-gray-300">
                {movie.overview}
            </p>

            <div className="flex gap-2 mt-4 flex-wrap">
                {movie.genres?.map((g: string) => (
                <span
                    key={g}
                    className="bg-blue-600 px-3 py-1 rounded-full text-sm"
                >
                    {g}
                </span>
                ))}
             </div>
            </div>
          </div>
        </div>
    </div>
    );
    };

export default MoviesDetails;