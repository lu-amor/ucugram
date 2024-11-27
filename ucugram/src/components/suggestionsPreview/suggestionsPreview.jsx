import React, { useEffect } from "react";
import Slider from "react-slick";
import FollowButton from "../followButton/followButton";
import Avatar from "../avatar/avatar";
import SuggestionCard from "./../suggestionCard/suggestionCard.jsx";
import classes from "ucugram/src/components/suggestionsPreview/suggestionsPreview.module.css";
import useFetchSuggestions from "./../../hooks/useFetchSuggestions.jsx";
import Loader from "../loader/loader.jsx";

const SuggestionsPreview = () => {
  const { suggestions, loading, error } = useFetchSuggestions();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    suggestions.length !== 0 ? (
      <div className={classes.suggestionsPreview}>
        <h2 className={`title is-4 has-text-info`}>Suggestions for you</h2>
        <Slider {...settings}>
          {suggestions.map((suggestion, index) => (
            <div key={index} className="suggestionWrapper">
              <SuggestionCard suggestion={suggestion} />
            </div>
          ))}
          {console.log(suggestions)}
        </Slider>
      </div>
    ) : null
  );  
};

export default SuggestionsPreview;
