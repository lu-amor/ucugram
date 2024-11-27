import { useState } from "react";
import { url } from "../App.js";
import { useAuth } from "../context/AuthContext.js";

// const url = "http://localhost:3000/posts";

const useUploadPhoto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { state: authState } = useAuth();

  const uploadPhoto = async (imageUrl, caption) => {
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("image",{uri: imageUrl, name: "image.jpg", type: "image/jpeg"});
    formData.append("caption", caption);
    try {
      const response = await fetch(url + "posts/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
        body: formData,
      });

      const result = await response.json();
      setLoading(false);

      if (!response.ok) {
        return false;
      }
      return true;
    } catch (err) {
      setError(err.message);
      console.error("Upload failed:", err);
    }
  };

  return { uploadPhoto, loading, error };
};

export default useUploadPhoto;
