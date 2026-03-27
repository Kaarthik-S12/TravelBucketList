import React from 'react';
import "./planningCard.css";

const PlanningCard = ({ plan }) => {
  return (
    <div className="planning-card">
      <img 
        src={plan.image} 
        alt={plan.title} 
        className="planning-image"
      />
      <div className="p-4">
        <h2 className="planning-title">{plan.title}</h2>
        <p className="planning-place"><strong>Place:</strong> {plan.place}</p>
        <p className="planning-description">{plan.description}</p>
        <a 
          href={plan.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="planning-link"
        >
          Visit Website
        </a>
      </div>
    </div>
  );
};

export default PlanningCard;