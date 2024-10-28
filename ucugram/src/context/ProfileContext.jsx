import React, {
  act,
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect
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
  const { state: authState } = useAuth();
  const initialState = {
    user: null,
    posts: [],
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(profileReducer, initialState);
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (authState.user) {
        dispatch({ type: "SET_LOADING" });
        try {
          const response = await fetch(`http://localhost:3001/api/user/profile/${authState.user.id}`, {
            headers: {
              "Authorization": `Bearer ${authState.user.token}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            dispatch({ type: "SET_PROFILE", payload: data });
          } else {
            dispatch({ type: "SET_ERROR", payload: data.message });
          }
        } catch (error) {
          dispatch({ type: "SET_ERROR", payload: "Error al cargar el perfil" });
        }
      }
    };

    fetchProfile();
  }, [authState.user]); // Ejecutar cuando authState.user cambie

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
