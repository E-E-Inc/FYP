import React from "react";
import { useHistory } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const BackButton = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <button
      onClick={goBack}
      style={{
        position: "fixed",
        top: "20px",
        left: "20px",
        background: "none",
        border: "none",
        width: "20px", // adjust the width as needed
        height: "20px", // adjust the height as needed
        fontSize: "25px", // adjust the font size as needed
      }}
    >
      <BiArrowBack />
    </button>
  );
};

export default BackButton;
