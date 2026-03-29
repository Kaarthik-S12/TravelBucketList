import { useState,useEffect } from 'react';
import NavBar from '../Components/NavBar';
import PlanningCard from '../Components/PlanningCard'; 
import "./planning.css";
import Navbard from '../Components/Navbard';
function Planning() {
  const [search, setSearch] = useState('');
  const [plans, setPlans] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/planning") 
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch plans");
        }
        return response.json();
      })
      .then(data => {
        setPlans(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching plans:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filteredPlans = plans.filter(plan => 
    plan.title.toLowerCase().includes(search.toLowerCase()) || 
    plan.place.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <Navbard/>
    <div className="planning-page">
 
    <div className="search-bar">
  
  <span className="search-icon">&#128269;</span>
  

  <input
    type="text"
    placeholder="Search for plans..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  
  {/* Clear Button (Optional) */}
  {search && (
    <button className="clear-button" onClick={() => setSearch('')}>
      &times; {/* Unicode for close icon */}
    </button>
  )}
</div>
  {loading ? (
          <p className="loading-message">Loading plans...</p>
        ) : error ? (
          <p className="error-message">Error: {error}</p>
        ) : (
          <div className="planning-grid">
            {filteredPlans.length > 0 ? (
              filteredPlans.map((plan) => (
                <PlanningCard key={plan.id} plan={plan} />
              ))
            ) : (
              <p className="no-plans-message">No matching plans found.</p>
            )}
          </div>
        )}
</div>
</>
  );
}

export default Planning;
