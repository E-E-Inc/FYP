import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import Modal from "react-modal";
import "./pages.css";
import BackButton from "./backButton";

Modal.setAppElement("#root"); // This line is needed for accessibility reasons

function CameraCapture() {
  const webcamRef = useRef(null);
  const [pictureCaptured, setPictureCaptured] = useState(false);
  const [portionSize, setPortionSize] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const blob = dataURLtoBlob(imageSrc);
      uploadBlob(blob);
      setPictureCaptured(true);
      openModal();
    }
  };

  function dataURLtoBlob(dataURL) {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  const sendPortionSize = () => {
    axios
      .post("http://localhost:5000/process", {
        portionSize: portionSize,
      })
      .then(function (response) {
        console.log(response);
        setPictureCaptured(false);
        closeModal();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const uploadBlob = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("File uploaded successfully", jsonResponse);
      } else {
        console.error("Upload failed", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during upload", error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="camera-capture">
      <BackButton />
      <h1 class="my-heading"> Capture your food</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        className="webcam"
      />
      <br />
      <button onClick={capture} className="capture-button">
        Capture Photo
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Portion Size Input"
        style={{
          overlay: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            position: "relative",
            top: "auto",
            left: "auto",
            right: "auto",
            bottom: "auto",
            borderRadius: "10px",
          },
        }}
      >
        <h2>Enter Portion Size</h2>
        <input
          type="number"
          value={portionSize}
          onChange={(e) => setPortionSize(e.target.value)}
          placeholder="Enter portion size"
          className="portion-size-input"
        />
        <button onClick={sendPortionSize} className="send-button">
          Send Portion Size
        </button>
      </Modal>
    </div>
  );
}

export default CameraCapture;
