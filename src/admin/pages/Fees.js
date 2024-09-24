import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import "../styles/Fees.css"; // Ensure unique class names

const Fees = () => {
  const [view, setView] = useState("feesCollection");
  const [feesData, setFeesData] = useState(null); // Fees data for the line chart
  const [expensesData, setExpensesData] = useState(null); // Expenses data for pie chart
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    // Simulating backend data fetching
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
      <div className="button-group">
        <button onClick={() => setView("feesCollection")}>
          Fees Collection
        </button>
        <button onClick={() => setView("schoolExpenses")}>
          School Expenses
        </button>
      </div>

      {view === "feesCollection" && feesData && (
        <div className="fees-collection">
          <div className="fees-overview">
            {/* First Section: Fees Paid Line Chart */}
            <ReactApexChart
              options={feesLineChartOptions}
              series={feesData}
              type="line"
              height={300}
              className="fees-line-chart"
            />
            {/* Second Section: Fees Overview Cards */}
            <div className="fees-cards">
              <div className="card">Total Amount: $15000</div>
              <div className="card">Total Tuition: $8000</div>
              <div className="card">Total Miscellaneous: $4000</div>
              <div className="card">Total Activity: $3000</div>
            </div>
          </div>

          {/* Second Section: List of Fees Paid by Students */}
          <div className="fees-list">
            <h3>Fees Paid by Students</h3>
            <ul>
              <li>John Doe: $1000 - Paid</li>
              <li>Jane Smith: $1500 - Paid</li>
              <li>Michael Brown: $2000 - Paid</li>
            </ul>
          </div>
        </div>
      )}

      {view === "schoolExpenses" && expensesData && (
        <div className="school-expenses">
          <div className="expenses-overview">
            {/* First Section: School Expenses Line Chart and Pie Chart */}
            <ReactApexChart
              options={feesLineChartOptions}
              series={feesData}
              type="line"
              height={300}
              className="expenses-line-chart"
            />
            <ReactApexChart
              options={expensesPieChartOptions}
              series={expensesData}
              type="pie"
              height={300}
              className="expenses-pie-chart"
            />
            <div className="total-expenses">
              Total Expenses: ${totalExpenses}
            </div>
          </div>

          {/* Second Section: List of Expenses */}
          <div className="expenses-list">
            <h3>List of Expenses</h3>
            <ul>
              <li>Salaries: $25000</li>
              <li>Maintenance: $15000</li>
              <li>Utilities: $5000</li>
              <li>Miscellaneous: $5000</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fees;
