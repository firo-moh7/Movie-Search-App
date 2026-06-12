export interface Movie{
    id:string;
    title:string;
    year:string;
    poster:string;
    backdrop?:string;
    rating?:number;
    runtime?:number;
    overview?:string;
    genres?:string[];   
}