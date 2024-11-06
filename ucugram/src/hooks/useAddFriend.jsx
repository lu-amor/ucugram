import { url } from "../App.jsx";

export default async function useAddFriend() {
  const token = localStorage.getItem("token");

  const addFriend = async (friendId) => {
    try {
      const response = await fetch(
        `${url}user/add-friend/${friendId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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