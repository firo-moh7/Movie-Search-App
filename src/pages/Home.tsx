import { useState } from "react";
import MovieCard from "../componenets/MovieCard";
import SearchBar from "../componenets/SearchBar";
import type { Movie } from "../types/Type";
import { Link } from "react-router-dom";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      return;
    }
      setIsLoading(true);
      setError(null);

    try {
       const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&query=${encodeURIComponent(query)}`
    );
    
    if (!res.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await res.json();
    
    const formattedMovies: Movie[] = data.results.map((movie: any) => ({

      id: movie.id.toString(),
      title: movie.title,
      year: movie.release_date,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,

    }));

    setMovies(formattedMovies);
    
  } catch (err) {
    setError(err instanceof Error ? err.message : "Unknown error");
  } finally {
    setIsLoading(false);    
    };
  }

  
  return (

    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        📋 Movie Search App
        </h1>
        <Link to="/favorites" className="text-blue-600 font-bold">
            ❤️ Favorites
       </Link>

      <SearchBar 
      searchTerm={searchTerm} 
      onSearchTermChange={(term) => {
      setSearchTerm(term);
      searchMovies(term);
      }} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">

        {isLoading ? (
          <p className = "text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ): movies.length==0 ? (  
          <p className="text-center text-gray-600">No movies found.</p>
        ) : (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
          )}

      </div>
    </div>
  );
}

export default Home;