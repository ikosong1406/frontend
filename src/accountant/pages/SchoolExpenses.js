import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import schoolExpensesData from "../../Api/SchoolExpenses.json"; // Import school expenses JSON
// import "../styles/Fees.css";

const SchoolExpenses = () => {
  const [expensesData, setExpensesData] = useState([]); // Expenses data for pie chart
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    // Simulating backend data fetching for charts
    setExpensesData([45, 30, 15, 10]); // Simulated pie chart data for expenses
    setTotalExpenses(50000); // Simulated total expenses
  }, []);

  const expensesPieChartOptions = {
    labels: ["Salaries", "Maintenance", "Utilities", "Miscellaneous"],
    chart: {
      type: "pie",
    },
  };

  return (
    <div className="fees-page">
      <h1>School Expenses</h1>
      <button className="new-expense-btn">+ New Expense</button>
      <div className="school-expenses">
        <div className="expenses-overview">
          {/* Pie Chart for School Expenses */}
          <ReactApexChart
            options={expensesPieChartOptions}
            series={expensesData}
            type="pie"
            height={500}
            className="expenses-pie-chart"
          />
        </div>

        {/* List of Expenses */}
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
    </div>
  );
};

export default SchoolExpenses;
