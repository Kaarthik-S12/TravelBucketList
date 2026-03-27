import {useState,useEffect} from 'react';
import Navbard from '../Components/Navbard';
import SavedCard from '../Components/SavedCard';
import "./Saved.css";

function Saved() {
  const [savedTrips, setSavedTrips] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) {
      console.error("No email found in localStorage");
      return;
    }

    // Function to fetch saved trips
    const fetchSavedTrips = () => {
      fetch(`http://localhost:8080/saved?email=${email}`)
        .then(response => response.json())
        .then(data => setSavedTrips(data))
        .catch(error => console.error("Error fetching saved trips:", error));
    };

    // Initial fetch
    fetchSavedTrips();

    // Set interval to fetch every second (1000 milliseconds)
    const intervalId = setInterval(fetchSavedTrips, 1000);

    // Clear interval on cleanup
    return () => clearInterval(intervalId);
  }, [email]); 


  return (
    <>
      <Navbard />
      <div className="saved-page">
        <h1>Planned Trips</h1>
        <div className="saved-grid">
          {savedTrips.length > 0 ? (
            savedTrips.map((trip) => (
              <SavedCard key={trip.id} trip={trip} />
            ))
          ) : (
            <p className="no-trips-message">No planned trips found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Saved;