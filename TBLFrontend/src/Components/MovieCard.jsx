import {} from 'react';
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
    return (
      <div className="movie-card">
        <img 
          src={movie.image} 
          alt={movie.title} 
          className="movie-image"
        />
        <div className="p-4">
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-description">{movie.description}</p>
        </div>
      </div>
    );
  };
  
  export default MovieCard;
