import { useState } from "react";
import { url } from "../App.js";

const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdUser, setCreatedUser] = useState(null);

  const postUserAW = async (user) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`Error creating user: ${response.statusText}`);
      }

      const newUserWithId = await response.json();
      setCreatedUser(newUserWithId); // se actualiza el estado con el usuario creado
      setLoading(false);
      return newUserWithId;
    } catch (err) {
      setError(err.message); // Manejo del error
      setLoading(false);
      throw err;
    }
  };

  return { postUserAW, createdUser, loading, error };
};

export default useCreateUser;
