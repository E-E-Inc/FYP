import React from "react";
import { useHistory } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const BackButton = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <button onClick={goBack} className="back-button">
      <BiArrowBack />
    </button>
  );
};

export default BackButton;
