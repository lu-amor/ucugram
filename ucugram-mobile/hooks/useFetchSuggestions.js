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
    try {
      setLoading(true);
      const allUsers = await getAllUsers();

      const notFriends = allUsers.filter((user) => {
        const find = authState.user.friends.find(
          (friend) => friend._id === user._id
        );
        return !find && user._id !== authState.user._id;
      });

      setSuggestions(notFriends);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setError(err);
      setLoading(false);
    }
  };

  const reloadSuggestions = async () => {
    await handleReload();
    if (authState.user) {
      await getSuggestions();
    }
  };

  useEffect(() => {
    reloadSuggestions();
  }, []);

  return { getSuggestions, suggestions, loading, error, reloadSuggestions };
};

export default useFetchSuggestions;