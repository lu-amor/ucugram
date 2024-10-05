import React from 'react';
import Slider from 'react-slick';
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
      <h2 className="title is-4">Sugerencias para ti</h2> 
      <Slider {...settings}>
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="suggestion-card card"> 
            <div className="card-avatar">
              <figure className="image is-128x128 "> 
                <img src={suggestion.avatar} alt={suggestion.name} className="is-rounded" /> 
              </figure>
            </div>
            <div className="card-info">
              <h3 className="title is-6">{suggestion.name}</h3> 
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SuggestionsPreview;

