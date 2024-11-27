import React, { useState } from "react";
import classes from "./UploadPhotoModal.module.css";
import useUploadPhoto from "../../hooks/useUploadPhoto";
import { useNavigate } from "react-router-dom";

function UploadPhotoModal({ closeModal, onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [caption, setCaption] = useState("");
  const { uploadPhoto, loading, error } = useUploadPhoto();
  const navigate = useNavigate()

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreviewURL(URL.createObjectURL(file)); // genera la URL de vista previa
    } else {
      setPreviewURL(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      const result = await uploadPhoto(selectedFile, caption);
      if (result) {
        navigate('/feed');
      }
      closeModal();
      URL.revokeObjectURL(previewURL); // limpia la URL temporal después de subir
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <button
          className={`${classes.delete} delete`}
          onClick={closeModal}
        ></button>
        <div className={classes.modalContainer}>
          <form onSubmit={handleUpload} className={classes.modalContainer}>
            <div className={classes.field}>
              <input
                type="file"
                id="fileUpload"
                accept="image/*"
                className={classes.fileInput}
                onChange={handleFileChange} 
              />
              {!previewURL && (
                <>
                  <label
                    htmlFor="fileUpload"
                    className={classes.customFileButton}
                  >
                    <div
                      className="button"
                      style={{ backgroundColor: "#b1c4e8", borderWidth: "0px" }}
                    >
                      +
                    </div>
                    <p className={classes.uploadText}>
                      <i>Upload photo</i>
                    </p>
                  </label>
                </>
              )}
            </div>
            {previewURL && (
              <>
                <div className={classes.previewContainer}>
                  <img
                    src={previewURL}
                    alt="Preview"
                    className={classes.previewImage}
                  />
                  <input
                    className={classes.captionInput} 
                    type="text"
                    placeholder="Add a caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </div>
                <div className={classes.buttonContainer}>
                  <button
                    className="button"
                    id={classes.uploadButton}
                    type="submit"
                  >
                    Upload
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadPhotoModal;
