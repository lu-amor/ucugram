import { url } from "../App";
import { useAuth } from "../context/AuthContext";
import { PROFILE_ACTIONS, useProfile } from "../context/ProfileContext";

export const useGetProfile = () => {
  const { state: authState } = useAuth();
  const { dispatch } = useProfile();

  const getProfile = async (userId) => {
    try {
      dispatch({ type: PROFILE_ACTIONS.LOADING });
      const response = await fetch(url + "user/profile/" + userId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });

      const data = await response.json();
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

  return getProfile;
};
