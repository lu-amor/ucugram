import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../App";

const AuthContext = createContext();

export const AUTH_ACTIONS = {
  LOGIN: "login",
  LOGOUT: "logout",
  LOADING: "loading",
  ERROR: "error",
};

function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case AUTH_ACTIONS.LOGOUT:
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

// export const handleReload = async (dispatch) => {
//   const token = await AsyncStorage.getItem("token");
//   if (token) {
//     const decoded = jwtDecode(token);
//     const userId = decoded.id;
//     dispatch({ type: AUTH_ACTIONS.LOADING });
//     const user = await getUserProfile(userId, token);
  
//     dispatch({
//       type: AUTH_ACTIONS.LOGIN,
//       payload: {
//         user: user,
//         token: token,
//       },
//     });
//   }
// };

export const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const { token } = state;

  // Cargar el token desde AsyncStorage al iniciar la app
  const handleReload = async () => {
    console.log("entra al handler")
    const token = await AsyncStorage.getItem("token");
    if (token) {
      console.log("tiene token")
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      dispatch({ type: AUTH_ACTIONS.LOADING });
      const user = await getUserProfile(userId, token);
      console.log('user: ', user, state.loading)
      dispatch({
        type: AUTH_ACTIONS.LOGIN,
        payload: {
          user: user,
          token: token,
        },
      });
      console.log("is loading: ", state.loading)
      console.log("is atuthenticated: ", state.isAuthenticated)
    }
  };

  useEffect(() => {
    handleReload();
  }, [token]);

  return (
    <AuthContext.Provider value={{ state, dispatch, handleReload }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
