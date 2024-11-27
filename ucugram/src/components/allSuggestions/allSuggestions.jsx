import React from 'react';
import Avatar from '../avatar/avatar';
import FollowButton from '../followButton/followButton';
import classes from 'ucugram/src/components/allSuggestions/allSuggestions.module.css';

const AllSuggestions = ({ suggestions, onBack }) => {
  return (
    <div className={classes.allSuggestions}>

      <h2 className={`title ${classes.allSuggTitle} is-4 has-text-centered`}>All suggestions</h2>

      <ul className={classes.suggestionsList}>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id} className={classes.suggestionItem}>

            <div className={classes.itemAvatar}>
              <Avatar user={suggestion} ></Avatar>
            </div>

            <div className={classes.itemInfo}>
              <h3 className={`${classes.suggUser} has-text-dark`}>{suggestion.name}</h3>
            </div>

            <div className={classes.followSection}>
              <FollowButton userId={suggestion.id} initialFollows={suggestion.follows}/>
            </div>

          </li>
        ))}
      </ul>

      <button onClick={onBack} className={`${classes.backButton} button is-primary mt-4`}>go back</button>

    </div>
  );
};

export default AllSuggestions;

