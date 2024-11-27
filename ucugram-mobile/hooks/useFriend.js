import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../App.js";
import { useAuth } from "../context/AuthContext.js";

export default function useFriend() {
  
  const addFriend = async (friendId) => {
    try {
      const token = await AsyncStorage.getItem("token")
      const response = await fetch(`${url}user/add-friend/${friendId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        return false;
      }
      return true;
    } catch (error) {
      throw new Error(response.json().message);
    }
  };
  
  const removeFriend = async (friendId) => {
    try {
      const token = await AsyncStorage.getItem("token")
      const response = await fetch(`${url}user/remove-friend/${friendId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = response.json();

      if (!response.ok) {
        return false;
      }
      return true;
    } catch (error) {
      return error.message;
    }
  };

  return { addFriend, removeFriend };
}
