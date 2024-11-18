import { url } from "../App.js";
import { useAuth } from "../context/AuthContext.js";

export default function useFriend() {
  const {state: authState} = useAuth();
  
  const addFriend = async (friendId) => {
    try {
      const response = await fetch(`${url}user/add-friend/${friendId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
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
      const response = await fetch(`${url}user/remove-friend/${friendId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.json();
      console.log("data", data);

      if (!response.ok) {
        return false;
      }

      return true;
    } catch (error) {
      return error.message;
      //   throw new Error(error.message);
    }
  };

  return { addFriend, removeFriend };
}
