import React from 'react';
import 'ucugram/src/components/allSuggestions/allSuggestions.css';

const AllSuggestions = ({ suggestions, onBack }) => {
  return (
    <div className="all-suggestions">
      <h2>Todas las sugerencias</h2>
      <ul className="suggestions-list">
        {suggestions.map((suggestion) => (
          <li key={suggestion.id} className="suggestion-item">
            <div className="item-avatar">
              <img src={suggestion.avatar} alt={suggestion.name} />
            </div>
            <div className="item-info">
              <h3>{suggestion.name}</h3>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={onBack} className="back-button">Volver</button>
    </div>
  );
};

export default AllSuggestions;

