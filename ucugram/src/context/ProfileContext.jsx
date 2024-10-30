import React, {
  act,
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext();

export const PROFILE_ACTIONS = {
  SET_PROFILE: "set-profile",
  SET_LOADING: "set-loading",
  SET_ERROR: "set-error",
};

function profileReducer(state, action) {
  switch (action.type) {
    case PROFILE_ACTIONS.SET_PROFILE:
      return {
        ...state,
        user: action.payload.user,
        posts: action.payload.posts,
        loading: false,
        error: null,
      };
    case PROFILE_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PROFILE_ACTIONS.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

// not working
export const ProfileProvider = ({ children }) => {
  const initialState = {
    user: null,
    posts: [],
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(profileReducer, initialState);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const initialState = {
    user: null,
    posts: [],
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(profileReducer, initialState);
  return { state, dispatch };
};
