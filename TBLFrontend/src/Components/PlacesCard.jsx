import { useState } from 'react';
import "./placescard.css";

function PlacesCard({ place }) {
  const [showPopup, setShowPopup] = useState(false);

  // Handle "Add to Travel" button click
  const handleAddToTravel = () => {
    setShowPopup(true);
  };
  const email = localStorage.getItem("email"); // Retrieve email from localStorage
  if (!email) {
    alert("No email found. Please log in.");
    return;
  }
  // Handle confirmation
  const handleConfirm = async () => {
    setShowPopup(false);
    
    const email = localStorage.getItem("email"); // Retrieve email from localStorage
    if (!email) {
      alert("No email found. Please log in.");
      return;
    }
    
    const travelData = {
      email,
      name: place.name,
      image: place.image,
      location: place.location,
      description: place.description,
      completed: false
    };
    
    try {
      const response = await fetch("http://localhost:8080/saved", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(travelData),
      });
      
      if (response.ok) {
        alert(`${place.name} has been added to your travel list!`);
      } else {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error adding to travel list:", error);
      alert("Failed to add to travel list. Please try again.");
    }
  };


  // Handle cancellation
  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="places-card">
      <img src={place.image} alt={place.name} className="places-image" />
      <div className="places-content">
        <h2 className="places-name">{place.name}</h2>
        <p className="places-location">{place.location}</p>
        <p className="places-description">{place.description}</p>
        <button className="add-to-travel-button" onClick={handleAddToTravel}>
          Add to Travel
        </button>
      </div>

      {/* Confirmation Pop-up */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>Are you sure you want to add <strong>{place.name}</strong> to your travel list?</p>
            <div className="popup-buttons">
              <button className="confirm-button" onClick={handleConfirm}>Yes</button>
              <button className="cancel-button" onClick={handleCancel}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlacesCard;