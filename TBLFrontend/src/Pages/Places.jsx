import  { useState,useEffect } from 'react';
import Navbard from '../Components/Navbard';
import PlacesCard from '../Components/PlacesCard';
import "./places.css";

function Places() {
  const [filter, setFilter] = useState('');
  const [places, setPlaces] = useState([]); // State for storing places
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch places data from backend
  useEffect(() => {
    fetch("http://localhost:8080/places") // Ensure this matches your backend endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }
        return response.json();
      })
      .then((data) => {
        setPlaces(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter places based on search query
  const filteredPlaces = places.filter(place =>
    place.name.toLowerCase().includes(filter.toLowerCase()) ||
    place.location.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Navbard />
      <div className="places-page">
        {/* Filter Bar */}
        <div className="filter-bar">
  <div className="search-container">
    {/* Search Icon */}
    <span className="search-icon">&#128269;</span>
    
    {/* Search Input */}
    <input
      type="text"
      placeholder="Search places..."
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="filter-input"
    />
    
    {/* Clear Button (Visible only when there's input) */}
    {filter && (
      <button className="clear-button" onClick={() => setFilter('')}>
        &times;
      </button>
    )}
  </div>
</div>
        <div className="places-grid">
          {loading ? (
            <p>Loading places...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : filteredPlaces.length > 0 ? (
            filteredPlaces.map((place) => (
              <PlacesCard key={place.id} place={place} />
            ))
          ) : (
            <p className="no-places-message">No matching places found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Places;