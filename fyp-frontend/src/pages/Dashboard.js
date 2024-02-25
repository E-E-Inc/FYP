import React, { useEffect, useState } from "react";
import BackButton from "./backButton";
import axios from "axios";
import Modal from "react-modal";
import { CiCircleInfo } from "react-icons/ci";

const Dashboard = () => {
  // Use states for information and data so the values can be used
  const [info, setInfo] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Sets timestamp to current time
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substr(0, 10)
  );

  // Sets the value of date when the page opens
  useEffect(() => {
    console.log(selectedDate);
    fetchInformation();
  }, [selectedDate]);

  // makes a get request to /information with selectedDate as a param
  const fetchInformation = async (e) => {
    //e.preventDefault();
    try {
      // Send a get request to backend
      const response = await axios.get("http://localhost:5000/information", {
        params: {
          selectedDate: selectedDate,
        },
      });
      setInfo(response.data);
    } catch (error) {
      console.error("failed to fetch:", error);
    }
  };

  const showNutritionalInfo = (e) => {
    e.preventDefault();
    openModal();
  };

  // Method for opening modal for user input
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Method for closing modal for user input
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Sets the state variable for date selected by user
  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);
    console.log("Selected Date:", dateValue);
  };

  return (
    <div className="dashboard">
      <BackButton />
      <h1>Dashboard</h1>

      <label htmlFor="date-picker" className="page-label">
        Date:
      </label>
      <input
        type="date"
        id="date-picker"
        name="date-picker"
        //Sets the value and calls handleDateChange when value is updated
        value={selectedDate}
        onChange={handleDateChange}
      />

      <form className="form">
        <div className="form-row-bold">
          <label className="page-label-bold">Food Item</label>
          <label className="page-label-bold">portion size</label>
          <label className="page-label-bold">Calories</label>
          <label className="page-label-bold">More</label>
        </div>
        {info.map((item) => (
          <div className="form-row" key={item.fid}>
            <label className="page-label">{item.foodName}</label>
            <label className="page-label">{item.portionSize}</label>
            <label className="page-label">{item.overallCalories}</label>
            <button className="clearButton" onClick={showNutritionalInfo}>
              <CiCircleInfo></CiCircleInfo>
            </button>

            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Nutrient Information"
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
              <BackButton />
              testing
              <label className="page-label">{item.foodName}</label>
            </Modal>
          </div>
        ))}
      </form>
    </div>
  );
};
export default Dashboard;
