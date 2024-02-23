import React, { useEffect, useState } from "react";
import BackButton from "./backButton";
import axios from "axios";

const Dashboard = () => {
  // Use states for information and data so the values can be used
  const [info, setInfo] = useState([]);

  // Sets timestamp to current time
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substr(0, 10)
  );

  // Sets the value of date when the page opens
  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  // makes a get request to /information with selectedDate as a param
  const fetchInformation = async (e) => {
    e.preventDefault();
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

  // Sets the state variable for date selected by user
  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);
    console.log("Selected Date:", dateValue);
  };

  return (
    <div
      style={{
        color: "black",
      }}
    >
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
      <br />
      <br></br>

      <form
        style={{
          color: "black",
          border: "1px solid black",
          borderRadius: "10px",
          padding: "10px",
          width: "300px",
          height: "400px",
        }}
      >
        <label className="page-label-bold">Food Item</label>
        <label className="page-label-bold">Calories</label>
        <br />

        {info.map((item) => (
          // ^ Loops through each item in array

          // displays each item in array with fid as a "Control"
          <React.Fragment key={item.fid}>
            <label className="page-label-bold">{item.foodName}</label>
            <label className="page-label-bold">{item.portionSize}</label>
            <br />
          </React.Fragment>
        ))}
      </form>

      <button onClick={fetchInformation}></button>
    </div>
  );
};
export default Dashboard;
