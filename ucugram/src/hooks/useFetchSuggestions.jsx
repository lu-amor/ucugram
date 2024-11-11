import { useState, useEffect } from "react";
import { url } from "../App.jsx";
import useGetAllUsers from "./useGetAllUsers.jsx";
import { useAuth, handleReload } from "../context/AuthContext.jsx";

const useFetchSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getAllUsers = useGetAllUsers();
  const { state: authState, dispatch: authDispatch } = useAuth();

  const getSuggestions = async () => {
    const allUsers = await getAllUsers();
/*     console.log("allUsers: ", allUsers);
    console.log("authState: ", authState); */

    // obtengo todos los usuarios que no son amigos del autenticado
    const notFriends = allUsers.filter((user) => {
      const find = authState.user.friends.find(
        (friend) => friend._id === user._id
      );
      if (!find && user._id !== authState.user._id) {
        return user;
      }
    });
    return notFriends;
  };
  
  useEffect(() => {
    const a = async () => {
      await handleReload(localStorage.getItem("token"), authDispatch);
    };
    a();
  }, []);

  useEffect(() => {
    if(authState.user) {
      const a = async () => {
/*         console.log("entra"); */
        setLoading(true);
        const sugg = await getSuggestions();
        setSuggestions(sugg);
        setLoading(false);
      };
      a();
    }
  }, [authState]);

  return { suggestions, loading, error };
};

export default useFetchSuggestions;
