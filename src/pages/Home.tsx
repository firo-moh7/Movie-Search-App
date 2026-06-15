import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import type { Movie } from "../types/Type";
import SkeletonCard from "../components/SkeletonCard";
import { Link } from "react-router-dom";
import { fetchPopularMovies, searchMovies } from "../services/tmdb";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPopularMovies = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const popularMovies = await fetchPopularMovies();
      setMovies(popularMovies);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };
  
  const loadSearchMovies = async (query: string) => {
    setIsLoading(true);
    setError(null); 

    try {
      const searchResults = await searchMovies(query);
      setMovies(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };
  


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        loadSearchMovies(searchTerm);
      } 
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);


  
  useEffect(() => {
    loadPopularMovies();
  }, []);

  
  return (

    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-3xl font-bold text-center mb-8">
          {searchTerm
            ? `Search Results for "${searchTerm}"`
            : "🔥 Popular Movies"}
      </h1>

        <Link to="/favorites" className="text-blue-600 font-bold">
            ❤️ Favorites
       </Link>

      <SearchBar 
      searchTerm={searchTerm} 
      onSearchTermChange={setSearchTerm} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">

        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : error ? (
          <p className="text-center text-red-600 col-span-full">
            {error}
          </p>
        ) : movies.length === 0 ? (
          <div className="text-center py-12 col-span-full">
            <h2 className="text-xl font-semibold">
              No movies found
            </h2>

            <p className="text-gray-500 mt-2">
              Try another search term.
            </p>
          </div>
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