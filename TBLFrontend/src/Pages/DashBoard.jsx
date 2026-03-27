import { useEffect, useState } from 'react';
import Navbard from '../Components/Navbard';
import MovieCard from '../Components/MovieCard';
import axios from 'axios';
import "./dashboard.css";

function DashBoard() {
  // Define state to hold the movies
  const [movies, setMovies] = useState([]);

  // Fetch movies from the backend
  useEffect(() => {
    axios.get('http://localhost:8080/movies')  // Adjust the URL as per your backend API
      .then(response => {
        setMovies(response.data); // Set the movies state with the fetched data
      })
      .catch(error => {
        console.error("There was an error fetching the movies:", error);
      });
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <>
      <Navbard />
      <div className="dashboard-container p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Adventure Movies</h1>
        <div className="movie-container flex flex-wrap gap-6 justify-start">
          {movies.length === 0 ? (
            <p>Loading movies...</p>
          ) : (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default DashBoard;
