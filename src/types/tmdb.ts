export interface TMDBMovie{
    id:string;
    title:string;
    release_date:string;
    poster_path:string | null;
}

export interface TMDBMovieResponse {
    results : TMDBMovie[]
}

export interface TMDBGenre {
    id:number;
    name:string
}