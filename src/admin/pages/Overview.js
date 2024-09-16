import React from "react";
import "../styles/Overview.css";

// Dummy data for overview
const overviewData = {
  students: 500,
  teachers: 50,
  totalRevenue: 1000000,
  totalExpenses: 600000,
  newAdmissions: 20,
  events: 5,
  schoolYear: "2023/2024",
};

const Overview = () => {
  return (
    <div className="overview-page">
      <h1>School Overview</h1>
      <div className="overview-cards">
        <div className="card">
          <h3>Total Students</h3>
          <p>{overviewData.students}</p>
        </div>
        <div className="card">
          <h3>Total Teachers</h3>
          <p>{overviewData.teachers}</p>
        </div>
        <div className="card">
          <h3>Total Revenue</h3>
          <p>${overviewData.totalRevenue}</p>
        </div>
        <div className="card">
          <h3>Total Expenses</h3>
          <p>${overviewData.totalExpenses}</p>
        </div>
        <div className="card">
          <h3>New Admissions</h3>
          <p>{overviewData.newAdmissions}</p>
        </div>
        <div className="card">
          <h3>Upcoming Events</h3>
          <p>{overviewData.events}</p>
        </div>
        <div className="card">
          <h3>Current School Year</h3>
          <p>{overviewData.schoolYear}</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
