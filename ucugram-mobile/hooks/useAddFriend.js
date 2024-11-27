import { url } from "../App.js";
import { useAuth } from "../context/AuthContext.js";

export default async function useAddFriend() {
  const {state: authState} = useAuth()

  const addFriend = async (friendId) => {
    try {
      const response = await fetch(
        `${url}user/add-friend/${friendId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      if (!response.ok) {
        return false;
      }      
      return true;
    } catch (error) {
        throw new Error(response.json().message);
    }
  };

  return addFriend;
}