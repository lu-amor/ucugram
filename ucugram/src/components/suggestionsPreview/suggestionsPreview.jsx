import React from 'react';
import Slider from 'react-slick';
import FollowButton from '../followButton/followButton';
import Avatar from '../avatar/avatar';
import classes from 'ucugram/src/components/suggestionsPreview/suggestionsPreview.module.css';

const SuggestionsPreview = ({ suggestions }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,  
    slidesToScroll: 1, 
    responsive: [
      {
        breakpoint: 768,  
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <div className={classes.suggestionsPreview}>
      <h2 className={`${classes.title} is-4 has-text-centered`}>Suggestions for you</h2> 
      <Slider {...settings}>
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className={`${classes.suggestionCard} card `}> 
            <div className={classes.cardAvatar}>
              <Avatar user={suggestion} ></Avatar>
            </div>
            <div className={classes.cardInfo}>
              <h3 className={`${classes.title} is-6 has-text-weight-semibold `}>{suggestion.name}</h3> 
            </div>
            <div className={`${classes.followSection} mt-2`}>
              <FollowButton userId={suggestion.id} initialFollows={suggestion.follows}/>
            </div>

          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SuggestionsPreview;

