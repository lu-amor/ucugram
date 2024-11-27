import React, { useState, useEffect } from "react";
import classes from "./profileImgPreview.module.css";
import useUploadPhoto from "../../hooks/useUploadPhoto";
import Avatar from "../avatar/avatar";

function ProfileImgPreview({ closeModal,  imgPreview}) {
  const { uploadPhoto, loading, error } = useUploadPhoto();
  const [fakeUSer, setFackeUser] = useState();

  useEffect(() => {
    const user = {profilePicture: imgPreview};
    setFackeUser(user);
  }, [])

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      await uploadPhoto(selectedFile, caption);
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
          <div className={classes.avatarContainer}>
            <Avatar user={fakeUSer}/>
          </div>
          <div className={classes.buttonContainer}>
            <button className="button" id={classes.cancelButton} onClick={closeModal}>cancel</button>
            <button className="button" id={classes.selectButton}>select</button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileImgPreview;
