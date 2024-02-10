import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div
      style={{
        color: "black",
      }}
    >
      <h1>Dashboard</h1>

      <label htmlFor="date-picker" className="page-label">
        Date:
      </label>
      <input type="date" id="date-picker" name="date-picker" />
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
        <label className="page-label">Name</label>
        <label className="page-label">000</label>
        <br />
      </form>
    </div>
  );
};
export default Dashboard;
