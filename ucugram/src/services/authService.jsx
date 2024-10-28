import { useEffect } from "react";
import { useAuth, AUTH_ACTIONS } from "./../context/AuthContext";
import { url } from "../App";

export const useLogin = () => {
  const { dispatch } = useAuth();

  const login = async (email, password) => {
    const user = {
      email: email,
      password: password,
    };
    dispatch({ type: AUTH_ACTIONS.LOADING });
    try {
      const response = await fetch(url + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem( "token",data.token);
        dispatch({
          type: AUTH_ACTIONS.LOGIN,
          payload: {
            user: data,
            token: data.token,
          },
        });
        return true;
      } else {
        dispatch({
          type: AUTH_ACTIONS.ERROR,
          payload: {
            error: data.message || "Error en el inicio de sesión",
          },
        });
        return false;
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.ERROR,
        payload: {
          error: error || "Error en el inicio de sesión",
        },
      });
      console.error("Error en el inicio de sesión:", error);
      return false;
    }
  };

  return login;
};

export const useLogout = () => {
  const { dispatch } = useAuth();
  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };
  return logout;
};
