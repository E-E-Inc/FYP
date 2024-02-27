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

  // Store food name and nutrient info
  const [selectedFood, setSelectedFood] = useState(null);
  const [nutrientInfo, setNutrientInfo] = useState(null);

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
      setInfo([]);
      setResults(true);
    }
  };

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

  const handleNutrientInfo = (foodName) => {
    // If not, set the selected food and fetch nutrient information
    setSelectedFood(foodName); // Set the selected food
    fetchNutritionalInfo(foodName); // Fetch nutrient information for the selected food
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

                {/* Display other nutrient information here */}
              </div>
            )}
          </Modal>
        </Grid>
      </form>
    </div>
  );
};
export default Dashboard;
