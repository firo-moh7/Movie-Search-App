import { useEffect, useState } from "react";
import type { Movie } from "../types/Type";
import { getFavorites } from "../utils/favorites";


function Favorites() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setMovies(getFavorites());
  }, []);

  const handleRemove = (id: string) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
  };

  useEffect(() => {
    // Update localStorage whenever movies state changes
    localStorage.setItem("favorites_movies", JSON.stringify(movies));
  }, [movies]);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        ❤️ My Favorites
      </h1>
      <p className="text-center text-gray-600 mb-8">
        {movies.length} movie{movies.length !== 1 && "s"} saved
       </p>

      {movies.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-2">
            No favorites yet
          </h2>

        <p className="text-gray-600">
          Start searching and save movies you love ❤️
        </p>
      </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div
            key={movie.id}
            className="bg-white rounded-lg shadow-md p-4"
            >
              {/* Reuse MovieCard but without the favorite button */}
               <div
            key={movie.id}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-80 object-cover rounded"
            />

            <h2 className="font-bold mt-2">
              {movie.title}
            </h2>

            <p>{movie.year}</p>

            {/* Put the Remove button here */}
            <button
              onClick={() => handleRemove(movie.id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;