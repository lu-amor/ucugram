import { useState } from "react";
import { url } from "./../App.jsx";
import { useAuth } from "../context/AuthContext.jsx";

// const url = "http://localhost:3000/posts";

const useUploadPhoto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { state: authState } = useAuth();

  const uploadPhoto = async (file, caption) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    try {
      const response = await fetch( url + "posts/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error uploading the photo");
      }

      const result = await response.json();
      console.log("Upload successful:", result);
    } catch (err) {
      setError(err.message);
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return { uploadPhoto, loading, error };
};

export default useUploadPhoto;
