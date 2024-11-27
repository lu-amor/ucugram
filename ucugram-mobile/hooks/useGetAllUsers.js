import { url } from "../App.js";
import { useAuth } from "../context/AuthContext.js";

const useGetAllUsers = () => {
  const { state: authState } = useAuth();

  const getAllUsers = async () => {
    try {
      const response = await fetch(url + "user/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al cargar usuarios", error);
    }
  };

  return getAllUsers;
};

export default useGetAllUsers;
