import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import feesCollectionData from "../../Api/FeeCollection.json"; // Import fees collection JSON
import schoolExpensesData from "../../Api/SchoolExpenses.json"; // Import school expenses JSON
import "../styles/Fees.css"; // Ensure unique class names
import { IoAnalytics } from "react-icons/io5";

const Fees = () => {
  const [view, setView] = useState("feesCollection");
  const [feesData, setFeesData] = useState(null); // Fees data for the line chart
  const [expensesData, setExpensesData] = useState(null); // Expenses data for pie chart
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    // Simulating backend data fetching for charts
    setFeesData([
      {
        name: "Fees Paid",
        data: [1000, 2000, 1500, 3000, 4000, 2500], // Simulated data
      },
    ]);
    setExpensesData([45, 30, 15, 10]); // Simulated pie chart data for expenses
    setTotalExpenses(50000); // Simulated total expenses
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

  const expensesPieChartOptions = {
    labels: ["Salaries", "Maintenance", "Utilities", "Miscellaneous"],
    chart: {
      type: "pie",
    },
  };

  return (
    <div className="fees-page">
      <div className="tab-menu">
        <button
          className={view === "feesCollection" ? "active-tab" : ""}
          onClick={() => setView("feesCollection")}
        >
          Fees Collection
        </button>
        <button
          className={view === "schoolExpenses" ? "active-tab" : ""}
          onClick={() => setView("schoolExpenses")}
        >
          School Expenses
        </button>
      </div>

      {view === "feesCollection" && feesData && (
        <div className="fees-collection">
          <div className="fees-overview">
            {/* First Section: Fees Paid Line Chart */}
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
            {/* Second Section: Fees Overview Cards */}
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

          {/* Second Section: List of Fees Paid by Students in a Table */}
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
      )}

      {view === "schoolExpenses" && expensesData && (
        <div className="school-expenses">
          <div className="expenses-overview">
            {/* First Section: School Expenses Line Chart and Pie Chart */}
            <div
              style={{
                width: "65%",
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <h3>School Expenses</h3>
              <ReactApexChart
                options={feesLineChartOptions}
                series={feesData}
                type="line"
                height={300}
                className="expenses-line-chart"
              />
            </div>
            <ReactApexChart
              options={expensesPieChartOptions}
              series={expensesData}
              type="pie"
              height={500}
              className="expenses-pie-chart"
            />
          </div>

          {/* Second Section: List of Expenses in a Table */}
          <div className="expenses-list">
            <h3>List of Expenses</h3>
            <table>
              <thead>
                <tr>
                  <th>Label</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {schoolExpensesData.map((expense, index) => (
                  <tr key={index}>
                    <td>{expense.label}</td>
                    <td>{expense.name}</td>
                    <td>${expense.amount}</td>
                    <td>{expense.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fees;
