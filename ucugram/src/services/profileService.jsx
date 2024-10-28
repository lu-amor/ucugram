import React, { useEffect } from "react";
import { useProfile, PROFILE_ACTIONS } from "../context/ProfileContext";
import { useAuth } from "../context/AuthContext";
import { url } from "../App";

// not working

export const useGetProfile = (userId) => {
  const { dispatch } = useProfile();
  const { state: authState } = useAuth();

  useEffect(() => {
    console.log("ejecuta, " + userId)
    const getProfile = async () => {
      try {
        dispatch({ type: PROFILE_ACTIONS.SET_LOADING });
        const response = await fetch(url + "user/profile/" + useId, {
          headers: {
            "Content-Type": "application/json",
            "Autorization": `Bearer ${authState.token}`,
          },
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
          dispatch({
            type: PROFILE_ACTIONS.SET_PROFILE,
            payload: {
              user: data.user,
              posts: data.posts,
            },
          });
        } else {
          dispatch({
            type: PROFILE_ACTIONS.SET_ERROR,
            payload: {
              error: data.message || "Error al cargar perfil",
            },
          });
          throw new Error(data.message || "Error al cargar perfil");
        }
      } catch (error) {
        dispatch({
          type: PROFILE_ACTIONS.SET_ERROR,
          payload: {
            error: "Error al cargar perfil",
          },
        });
        console.error("Error al cargar perfil", error);
      }
    };

    getProfile();
  }, [dispatch, userId]);

  return;
};
