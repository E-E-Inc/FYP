import React, { useEffect, useState, useRef } from "react";
import BackButton from "./backButton";
import axios from "axios";
import Modal from "react-modal";
import { CiCircleInfo } from "react-icons/ci";
import { Grid, Button } from "@mui/material";

import {
  Chart,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Use states for information and data so the values can be used
  const [info, setInfo] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [results, setResults] = useState(false);
  const [total, setTotal] = useState(0);
  // Store food name and nutrient info
  const [nutrientInfo, setNutrientInfo] = useState(null);
  const [neededCalories, setNeededCalories] = useState(null);
  const [difference, setDifference] = useState(null);
  const chartRef = useRef(null);
  // Sets timestamp to current time
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substr(0, 10)
  );

  // Sets the value of date when the page opens
  useEffect(() => {
    fetchInformation();
    setDifference(neededCalories - total);
    console.log("Needed >> ", neededCalories);
  }, [selectedDate]);

  // Creates a chart for displaying the total calories and needed calories
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("myChart").getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Calories"],
        datasets: [
          {
            label: "Recommended Calories Intake",

            data: [neededCalories, total],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
          {
            label: "Calories Consumed",

            data: [total],
            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
            borderColor: ["rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              type: "linear",
              beginAtZero: true,
            },
          ],
        },
      },
    });
  }, [neededCalories, total]);

  // makes a get request to /information with selectedDate as a param
  const fetchInformation = async () => {
    setDifference(0);
    setResults(false);
    setTotal(0);

    try {
      // Send a get request to backend
      const response = await axios.get(
        "https://fyppython-production.up.railway.app/information",
        {
          params: {
            selectedDate: selectedDate,
          },
          withCredentials: true, // Include session ID in request
        }
      );

      setInfo(response.data);
      totalCalories(response.data);
      fetchNeededCalories();
    } catch (error) {
      console.error("failed to fetch:", error);
      setInfo([]);
      setResults(true);
    }
  };

  // makes a get request to /needed_calories
  const fetchNeededCalories = async () => {
    console.log("fetching needed calories");

    try {
      // Send a get request to backend
      const response = await axios.get(
        "https://fyppython-production.up.railway.app/needed_calories",
        {
          withCredentials: true,
        }
      );
      setNeededCalories(response.data);
    } catch (error) {
      console.error("failed to fetch:", error);
    }
  };

  // calculates total calories
  const totalCalories = (data) => {
    let dayTotal = 0;
    if (data) {
      data.forEach((item) => {
        dayTotal += parseFloat(item.overallCalories);
      });
      setTotal(dayTotal);
    }
  };

  // makes a get request to /getNutrition with foodName and portion_size as a param
  const fetchNutritionalInfo = async (foodName, portion_size) => {
    try {
      const data = { foodName, portion_size };

      // Send a get request to backend
      const response = await axios.post(
        "https://fyppython-production.up.railway.app/getNutrition",
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
          {info &&
            info.map((item) => (
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
      <p className="page-label">
        Recommended Calories Requires: {neededCalories}
      </p>
      <br /> <br />
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
};
export default Dashboard;
