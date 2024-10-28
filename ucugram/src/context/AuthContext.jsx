import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState
} from "react";
const AuthContext = createContext();

export const AUTH_ACTIONS = {
  LOGIN: "login",
  LOGOUT: "logout",
  LOADING: "loading",
  ERROR: "error",
};

// la action va a pasar en la dispatch function
// la función reducer va a devolver el estado actualizado dependiendo de la acción.
// state va a ser el objeto pasado por parámetro en el useReducer
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case AUTH_ACTIONS.LOGOUT:
      localStorage.removeItem("token")
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

export const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: !!localStorage.getItem("token"),
    user: null,
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
