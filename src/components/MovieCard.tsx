import type { Movie } from "../types/Type";
import { Link } from "react-router-dom";
import { isFavorite, addFavorites, removeFavorites} from "../utils/favorites";
import { useState } from "react";

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const [fav, setFav] = useState(isFavorite(movie.id));

    const toggleFavorite = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if(fav){
            removeFavorites(movie.id)
            setFav(false)
        }
        else{
            addFavorites(movie)
            setFav(true)
        }
    }
    return(
        
        <Link to={`/movie/${movie.id}`}> 
            <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
                <button
                onClick={toggleFavorite}
                className="absolute top-2 right-2 text-xl"
                >
                {fav ? "❤️" : "🤍"}
             </button>
            <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    {movie.title}
                    </h2>
                <p className="text-gray-600">
                    {movie.year}</p>
            </div>
            </div>  
        </Link>

    )
}

export default MovieCard;
