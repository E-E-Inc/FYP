import React, { useEffect, useState } from "react";
import BackButton from "./backButton";
import axios from "axios";
import Modal from "react-modal";
import { CiCircleInfo } from "react-icons/ci";
import { Grid, Button } from "@mui/material";

const Dashboard = () => {
  // Use states for information and data so the values can be used
  const [info, setInfo] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [results, setResults] = useState(false);
  const [total, setTotal] = useState(0);
  // Store food name and nutrient info
  const [nutrientInfo, setNutrientInfo] = useState(null);
  const [test, setTest] = useState(null);

  // Sets timestamp to current time
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substr(0, 10)
  );

  // Sets the value of date when the page opens
  useEffect(() => {
    fetchInformation();
  }, [selectedDate]);

  // makes a get request to /information with selectedDate as a param
  const fetchInformation = async () => {
    setResults(false);
    setTotal(0);
    try {
      // Send a get request to backend
      const response = await axios.get("http://localhost:5000/information", {
        params: {
          selectedDate: selectedDate,
        },
      });
      setInfo(response.data);
      totalCalories(response.data.rows);
      setTest(response.data.totalCalsNeeded);
    } catch (error) {
      console.error("failed to fetch:", error);
      setInfo([]);
      setResults(true);
    }
  };

  // calculates total calories
  const totalCalories = (data) => {
    let dayTotal = 0;
    data.forEach((item) => {
      dayTotal += item.overallCalories;
    });
    setTotal(dayTotal);
  };

  // makes a get request to /getNutrition with foodName and portion_size as a param
  const fetchNutritionalInfo = async (foodName, portion_size) => {
    try {
      const data = { foodName, portion_size };

      // Send a get request to backend
      const response = await axios.post(
        "http://localhost:5000/getNutrition",
        data
      );

      // Set the nutrient info to the response.data
      setNutrientInfo(response.data);
      setModalIsOpen(true);
    } catch (error) {
      console.error("failed to fetch:", error);
    }
  };

  // Method for closing modal for user input
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Sets the state variable for date selected by user
  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);
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
        value={selectedDate}
        onChange={handleDateChange}
      />
      <br /> <br />
      <form className="form">
        <Grid container spacing={2}>
          <Grid item xs={2.5}>
            <label className="page-label-bold">Food Item</label>
          </Grid>
          <Grid item xs={3}>
            <label className="page-label-bold">portion size</label>
          </Grid>
          <Grid item xs={3}>
            <label className="page-label-bold">Calories</label>
          </Grid>
          <Grid item xs={3}>
            <label className="page-label-bold">More</label>
          </Grid>

          {/* Grid for displaying food info for a user from database */}
          {info.map((item) => (
            <React.Fragment key={item.fid}>
              <Grid item xs={3}>
                <label className="page-label">{item.foodName}</label>
              </Grid>
              <Grid item xs={3}>
                <label className="page-label">{item.portionSize}</label>
              </Grid>
              <Grid item xs={3}>
                <label className="page-label">{item.overallCalories}</label>
              </Grid>
              <Grid item xs={3}>
                <Button
                  className="clearButton"
                  onClick={() =>
                    fetchNutritionalInfo(item.foodName, item.portionSize)
                  }
                >
                  <CiCircleInfo />
                </Button>
              </Grid>
            </React.Fragment>
          ))}

          {/* Modal for displaying nutritional information in a popup */}
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

            {/* Display nutrient information */}
            {nutrientInfo && (
              <div>
                <h2>Nutrient Information for {nutrientInfo[0].name}</h2>
                <p>overall calories: {nutrientInfo[0].calories}</p>
                <p>Fat: {nutrientInfo[0].fat_total_g} grams</p>
                <p>Saturated Fat: {nutrientInfo[0].fat_saturated_g} grams</p>
                <p>Protein: {nutrientInfo[0].protein_g} grams</p>
                <p>Sodium: {nutrientInfo[0].sodium_mg} miligrams</p>
                <p>Cholesterol: {nutrientInfo[0].cholesterol_mg} miligrams</p>
                <p>
                  Carbohydrates: {nutrientInfo[0].carbohydrates_total_g} grams
                </p>
                <p>Fiber: {nutrientInfo[0].fiber_g} grams</p>
                <p>Sugar: {nutrientInfo[0].sugar_g} grams</p>
              </div>
            )}
          </Modal>
        </Grid>
      </form>
      <p className="page-label">Total Calories: {total} </p>
    </div>
  );
};
export default Dashboard;
