import React from "react";
import classes from "./suggestionCard.module.css";
import FollowButton from "../followButton/followButton";
import Avatar from "../avatar/avatar";
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "../../hooks/useGetProfile";

export default function SuggestionCard(suggestion) {
  const suggestedUser = suggestion.suggestion;
  const navigate = useNavigate();
  const getProfile = useGetProfile();

  const handleGoProfile = async () => {
    await getProfile(suggestedUser._id)
    navigate('/profile/' + suggestedUser.username)
  }


  return (
    <div className={`${classes.suggestionCard} card `} onClick={handleGoProfile}>
      <div className={classes.cardAvatar}>
        <Avatar user={suggestedUser}></Avatar>
      </div>
      <div className={classes.cardInfo}>
        <h3 className={`${classes.title} is-6 has-text-weight-semibold `}>
          {suggestedUser.username}
        </h3>
      </div>
      <div className={`${classes.followSection} mt-2`}>
        <FollowButton
          userId={suggestedUser._id}
          initialFollows={suggestedUser.follows}
        />
      </div>
    </div>
  );
}
