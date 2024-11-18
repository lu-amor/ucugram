import { useState } from "react";
import { url } from "../App.js";
import { useAuth } from "../context/AuthContext.js";

const updateProfileInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { state: authState } = useAuth();

  const updateProfile = async (newInfo) => {
    try {
      console.log("entra");
      setLoading(true);
      setError(null);
      const response = await fetch(url + `user/profile/edit/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify(newInfo),
      });

      const data = await response.json();
      setLoading(false);
      console.log("update result: ", data);
      return response.ok;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { updateProfile, loading, error };
};

export default updateProfileInfo;
