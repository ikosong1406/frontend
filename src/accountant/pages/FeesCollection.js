import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import feesCollectionData from "../../Api/FeeCollection.json"; // Import fees collection JSON
// import "../styles/Fees.css";
import { IoAnalytics } from "react-icons/io5";

const FeesCollection = () => {
  const navigate = useNavigate();
  const [feesData, setFeesData] = useState([]); // Fees data for the line chart

  useEffect(() => {
    // Simulating backend data fetching for charts
    setFeesData([
      {
        name: "Fees Paid",
        data: [1000, 2000, 1500, 3000, 4000, 2500], // Simulated data
      },
    ]);
  }, []);

  const feesLineChartOptions = {
    chart: {
      id: "fees-line-chart",
      type: "line",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    stroke: {
      curve: "smooth",
    },
  };

  const handleNewFeeClick = () => {
    navigate("/accountant/feePayment"); // Redirect to fee payment page
  };

  return (
    <div className="fees-page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <h1>Fees Collection</h1>
        <button className="new-fee-btn" onClick={handleNewFeeClick}>
          + New Fee
        </button>
      </div>
      <div className="fees-collection">
        <div className="fees-overview">
          {/* Fees Paid Line Chart */}
          <div
            style={{
              width: "65%",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <h3>Fees Collection</h3>
            <ReactApexChart
              options={feesLineChartOptions}
              series={feesData}
              type="line"
              height={250}
              className="fees-line-chart"
            />
          </div>
          {/* Fees Overview Cards */}
          <div className="fees-cards">
            <div className="card">
              <IoAnalytics
                style={{ fontSize: 40, color: "white", marginTop: -15 }}
              />
              <h3 style={{ fontSize: 20, marginTop: 0 }}> $15000</h3>
              <p style={{ color: "gray", marginTop: -10 }}>Total Amount</p>
            </div>
            <div className="card">
              <IoAnalytics
                style={{ fontSize: 40, color: "white", marginTop: -15 }}
              />
              <h3 style={{ fontSize: 20, marginTop: 0 }}> $8000</h3>
              <p style={{ color: "gray", marginTop: -10 }}>Total Tuition</p>
            </div>
            <div className="card">
              <IoAnalytics
                style={{ fontSize: 40, color: "white", marginTop: -15 }}
              />
              <h3 style={{ fontSize: 20, marginTop: 0 }}> $4000</h3>
              <p style={{ color: "gray", marginTop: -10 }}>
                Total Miscellaneous
              </p>
            </div>
            <div className="card">
              <IoAnalytics
                style={{ fontSize: 40, color: "white", marginTop: -15 }}
              />
              <h3 style={{ fontSize: 20, marginTop: 0 }}> $3000</h3>
              <p style={{ color: "gray", marginTop: -10 }}>Total Activity</p>
            </div>
          </div>
        </div>

        {/* List of Fees Paid by Students */}
        <div className="fees-list">
          <h3>Fees Paid by Students</h3>
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Class</th>
                <th>Fee Paid</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {feesCollectionData.map((fee, index) => (
                <tr key={index}>
                  <td>
                    <img src={`../assets/${fee.photo}`} alt={fee.name} />
                  </td>
                  <td>{fee.name}</td>
                  <td>{fee.class}</td>
                  <td>{fee.feePaid}</td>
                  <td>${fee.amount}</td>
                  <td>{fee.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeesCollection;
