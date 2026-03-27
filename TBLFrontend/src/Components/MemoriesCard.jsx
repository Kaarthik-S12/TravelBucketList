import React from 'react';
import "./MemoriesCard.css";

function MemoriesCard({ memory }) {
  return (
    <div className="memories-card">
      <img src={memory.photo} alt={memory.place} className="memory-photo" />
      <div className="memory-info">
        <h2 className="memory-place">{memory.place}</h2>
        <p className="memory-date">{memory.date}</p>
      </div>
    </div>
  );
}

export default MemoriesCard;