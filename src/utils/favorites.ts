import type { Movie } from "../types/Type";

const FAVORITES_KEY = "favorites_movies";

//get all favorites
export const getFavorites = ():Movie[]=>{
    const saved = localStorage.getItem(FAVORITES_KEY)
    return saved ? (JSON.parse(saved) as Movie[]) : []; 
}

//save favorites
export const saveFavorites = (movies:Movie[])=>{
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(movies))
};

//Add movie
export const addFavorites = (movie:Movie)=>{
    const favorites:Movie[] = getFavorites();

    const exists = favorites.some((s)=> s.id === movie.id)
    if (exists) return

    const updated = [...favorites, movie]
    saveFavorites(updated)  
};

//remove favorites
export const removeFavorites = (id : string) => {
    const favorites = getFavorites()
    const updated: Movie[] = favorites.filter((m) => m.id !== id);
    saveFavorites(updated)
};

//check if favorite
export const isFavorite = (id : string)=>{
    const favorites = getFavorites();
    return favorites.some((s)=> s.id === id);
}
