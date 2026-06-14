import { useEffect, useState } from "react";
import type { Movie } from "../types/Type";
import { getFavorites } from "../utils/favorites";
import { Link } from "react-router";


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
    <div className="min-h-screen bg-slate-100 p-8 ">
      <Link to="/" className="text-blue-600 font-bold mb-4 inline-block">
        ← Back to Home
      </Link>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-bold line-clamp-1">
                  {movie.title}
                </h2>

                <p className="text-gray-500 mt-1">
                  {movie.year}
                </p>

                <button
                  onClick={() => handleRemove(movie.id)}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition hover:scale-105 transform duration-300 cursor-pointer"
                >
                  Remove ❤️
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