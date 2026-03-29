import { useState } from 'react';
import "./SavedCard.css";

function SavedCard({ trip }) {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showMemoriesPopup, setShowMemoriesPopup] = useState(false);
  const [isDone, setIsDone] = useState(trip.completed || false); 
  const [memoriesDate, setMemoriesDate] = useState('');
  const [memoriesFile, setMemoriesFile] = useState(null);
  const email = localStorage.getItem('email');
  
  const handleDelete = () => {
    setShowDeletePopup(true);
  };
   
  
  const confirmDelete = async () => {
    setShowDeletePopup(false);
    console.log('Attempting to delete trip with ID:', trip.id);  
    try {
      const response = await fetch(`http://localhost:8080/saved/${trip.id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert(`${trip.name} has been deleted.`);
     
      } else {
        alert("Failed to delete the trip.");
      }
    } catch (error) {
      console.error("Error occurred while deleting:", error);
      alert("An error occurred while deleting the trip.");
    }
  };
  
  const handleSaveMemories = async () => {
    setShowMemoriesPopup(false);
    
    if (!memoriesDate || !memoriesFile || !email || !trip.name) {
        alert("Please provide all details: date, image, email, and place.");
        return;
    }

    const stringifiedDate = memoriesDate;  

    const formData = new FormData();
    formData.append("email", email);  
    formData.append("name", trip.name);  
    formData.append("date", stringifiedDate);  
    formData.append("imageFile", memoriesFile);  

    try {
        const response = await fetch(`http://localhost:8080/memories`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert("Memories added successfully.");
        } else {
            const errorMessage = await response.text();
            alert(`Failed to add memories. Error: ${errorMessage}`);
        }
    } catch (error) {
        console.error("Error occurred while adding memories:", error);
        alert("An error occurred while adding memories.");
    }
};

  
  const cancelDelete = () => {
    setShowDeletePopup(false);
  };


  const handleAddMemories = () => {
    setShowMemoriesPopup(true);
  };


  const handleMarkAsDone = async () => {
    setIsDone(true);  
    try {
      const response = await fetch(`http://localhost:8080/saved/${trip.id}/complete`, {
        method: 'PUT',
      });
  
      if (response.ok) {
        alert(`${trip.name} has been marked as done.`);
      } else {
        alert("Failed to mark as done.");
      }
    } catch (error) {
      console.error("Error occurred while marking as done:", error);
      alert("An error occurred while marking as done.");
    }
  };

  return (
    <div className={`saved-card ${isDone ? 'done' : ''}`}>
      <img src={trip.image} alt={trip.name} className="saved-image" />
      <div className="saved-content">
        <h2 className="saved-name">{trip.name}</h2>
        <p className="saved-location">{trip.location}</p>
        <p className="saved-description">{trip.description}</p>
        <div className="saved-buttons">
          <button className="delete-button" onClick={handleDelete}>Delete</button>
          <button className="add-memories-button" onClick={handleAddMemories}>Add Memories</button>
          <button className="mark-done-button" onClick={handleMarkAsDone}>
            {isDone ? 'Done' : 'Mark as Done'}
          </button>
        </div>
      </div>

      {showDeletePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>Are you sure you want to delete <strong>{trip.name}</strong>?</p>
            <div className="popup-buttons">
              <button className="confirm-button" onClick={confirmDelete}>Yes</button>
              <button className="cancel-button" onClick={cancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}


      {showMemoriesPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>Add memories for <strong>{trip.name}</strong>:</p>
       
             <input
              type="date"
              value={memoriesDate}
              onChange={(e) => setMemoriesDate(e.target.value)}
              className="memories-date-input"
            />
            
        
            <input
              type="file"
              onChange={(e) => setMemoriesFile(e.target.files[0])}
              className="memories-file-input"
            />
            <div className="popup-buttons">
              <button className="confirm-button" onClick={handleSaveMemories}>
                Save
              </button>
              <button className="cancel-button" onClick={() => setShowMemoriesPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SavedCard;