import React from 'react';
import Avatar from '../avatar/avatar';
import FollowButton from '../followButton/followButton';
import 'ucugram/src/components/allSuggestions/allSuggestions.css';

const AllSuggestions = ({ suggestions, onBack }) => {
  return (
    <div className="all-suggestions">

      <h2 className="title all-sugg-title is-4 has-text-centered ">All suggestions</h2>

      <ul className="suggestions-list">
        {suggestions.map((suggestion) => (
          <li key={suggestion.id} className="suggestion-item">

            <div className="item-avatar">
              <Avatar user={suggestion} ></Avatar>
            </div>

            <div className="item-info">
              <h3 className="sugg-user has-text-dark">{suggestion.name}</h3>
            </div>

            <div className="follow-section">
              <FollowButton userId={suggestion.id} initialFollows={suggestion.follows}/>
            </div>

          </li>
        ))}
      </ul>

      <button onClick={onBack} className="back-button button is-primary mt-4">go back</button>

    </div>
  );
};

export default AllSuggestions;

