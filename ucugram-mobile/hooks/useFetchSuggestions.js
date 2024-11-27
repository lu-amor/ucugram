import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useGetAllUsers from "./useGetAllUsers.js";

const useFetchSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getAllUsers = useGetAllUsers();
  const { state: authState, handleReload } = useAuth();

  const getSuggestions = async () => {
    const allUsers = await getAllUsers();
    // console.log("allUsers: ", allUsers);
    // console.log("authState: ", authState);

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
    const reload = async () => {
      await handleReload();
      if (authState.user) {
        setLoading(true);
        const sugg = await getSuggestions();
        setSuggestions(sugg);
        setLoading(false);
      }
    };
    reload();
  }, []);

  return { suggestions, loading, error };
};

export default useFetchSuggestions;
