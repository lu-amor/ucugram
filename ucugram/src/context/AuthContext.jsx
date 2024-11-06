import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { url } from "../App";

const AuthContext = createContext();

export const AUTH_ACTIONS = {
  LOGIN: "login",
  LOGOUT: "logout",
  LOADING: "loading",
  ERROR: "error",
  RELOAD: "reload",
};

// la action va a pasar en la dispatch function
// la función reducer va a devolver el estado actualizado dependiendo de la acción.
// state va a ser el objeto pasado por parámetro en el useReducer
function authReducer(state, action) {
  // console.log("action:", action);
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      // console.log("user: ", action.payload.user.user);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case AUTH_ACTIONS.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null,
      };
    case AUTH_ACTIONS.LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
}

const getUserProfile = async (userId, token) => {
  try {
    const response = await fetch(url + "user/profile/" + userId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const handleReload = async (token, dispatch) => {
  const decoded = jwtDecode(token);
  const userId = decoded.id;
  dispatch({ type: AUTH_ACTIONS.LOADING });
  const user = await getUserProfile(userId, token);

  dispatch({
    type: AUTH_ACTIONS.LOGIN,
    payload: {
      user: user,
      token: token,
    },
  });
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: !!localStorage.getItem("token"),
    user: "null",
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { token } = state;

  // para cuando se refresca la página
  useEffect(() => {
    if (token) {
      handleReload(token, dispatch);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
