import React from 'react';
import Slider from 'react-slick';
import FollowButton from '../followButton/followButton';
import Avatar from '../avatar/avatar';
import 'ucugram/src/components/suggestionsPreview/suggestionsPreview.css';

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
    <div className="suggestions-preview">
      <h2 className="title is-4 has-text-centered">Suggestions for you</h2> 
      <Slider {...settings}>
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="suggestion-card card "> 
            <div className="card-avatar">
              <Avatar user={suggestion} ></Avatar>
            </div>
            <div className="card-info">
              <h3 className="title is-6 has-text-weight-semibold ">{suggestion.name}</h3> 
            </div>
            <div className="follow-section mt-2">
              <FollowButton userId={suggestion.id} initialFollows={suggestion.follows}/>
            </div>

          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SuggestionsPreview;

