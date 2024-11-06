import { useState } from "react";
import { url } from './../App.jsx';
import { useAuth } from '../context/AuthContext.jsx';

// const url = "http://localhost:3000/posts";

const useUploadPhoto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { state: authState } = useAuth();

  const uploadPhoto = async (imageUrl, caption) => {
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append("image", imageUrl); 
      formData.append("caption", caption); 

      console.log(imageUrl.path)
      const response = await fetch(url + `posts/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authState.token}`,
        },
        body: formData,
      });

      const data = await response.json();
      setLoading(false);
      console.log("upload post result: ", data);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { uploadPhoto, loading, error };
};

export default useUploadPhoto;
