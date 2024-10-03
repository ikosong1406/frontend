import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "react-calendar/dist/Calendar.css";
import "../styles/Overview.css";
import { IoPersonAdd } from "react-icons/io5";
import students from "../../images/students.png";
import teachers from "../../images/teachers.png";
import income from "../../images/income.png";
import expenses from "../../images/expenses.png";
import studentData from "../../Api/Student"; // Adjust the path as necessary
import teacherData from "../../Api/Teachers.json"; // Adjust the path as necessary
import eventData from "../../Api/Events.json"; // Adjust the path as necessary
import feesData from "../../Api/FeeCollection.json"; // Adjust the path as necessary
import expenseData from "../../Api/SchoolExpenses.json"; // Adjust the path as necessary

const Overview = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState([]);
  const [greeting, setGreeting] = useState("");
  const [events, setEvents] = useState(eventData); // Use the imported events data
  const [financialData, setFinancialData] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await studentData(); // Fetch data from backend
        setStudent(data); // Store data in state
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        setIsLoading(false);
      }
    };

    loadStudents();
  }, []);

  useEffect(() => {
    const totalRevenue = feesData.reduce((acc, fee) => acc + fee.amount, 0);
    const totalExpenses = expenseData.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );

    setFinancialData({ totalRevenue, totalExpenses });
  }, []);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning, Admin!");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon, Admin!");
    } else {
      setGreeting("Good Evening, Admin!");
    }
  }, []);

  const financialChartOptions = {
    chart: {
      type: "line",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    stroke: {
      curve: "smooth",
    },
    series: [
      {
        name: "Income",
        data: feesData.map((fee) => fee.amount), // Use the fee amounts for income
      },
      {
        name: "Expenses",
        data: expenseData.map((expense) => expense.amount), // Use the expense amounts
      },
    ],
  };

  const handleAddStudent = () => {
    navigate("/admin/newStudent");
  };

  const allEvents = Object.keys(events).flatMap((date) =>
    events[date].map((event) => ({
      date,
      title: event.title,
      color: event.color,
    }))
  );

  // Limit to the top 5 events
  const topEvents = allEvents.slice(0, 4);

  return (
    <div className="overview-page">
      {/* Section 1: Greeting and Add Student Button */}
      <div className="section greeting-section">
        <h3>{greeting}</h3>
        <button onClick={handleAddStudent} className="btn-add-student">
          <IoPersonAdd />
          <span> New Admission</span>
        </button>
      </div>

      {/* Section 2: School Analytics Cards */}
      <div className="overview-cards">
        <div className="card">
          <div>
            <h2>{student.length}</h2>
            <p>Total Students</p>
          </div>
          <div style={{ alignSelf: "center" }}>
            <img src={students} style={{ width: 50, height: 50 }} />
          </div>
        </div>
        <div className="card">
          <div>
            <h2>{teacherData.length}</h2>
            <p>Total Teachers</p>
          </div>
          <div style={{ alignSelf: "center" }}>
            <img src={teachers} style={{ width: 60, height: 50 }} />
          </div>
        </div>
        <div className="card">
          <div>
            <h2>{financialData.totalRevenue}</h2>
            <p>Total Revenue</p>
          </div>
          <div style={{ alignSelf: "center" }}>
            <img src={income} style={{ width: 50, height: 50 }} />
          </div>
        </div>
        <div className="card">
          <div>
            <h2>{financialData.totalExpenses}</h2>
            <p>Total Expenses</p>
          </div>
          <div style={{ alignSelf: "center" }}>
            <img src={expenses} style={{ width: 50, height: 50 }} />
          </div>
        </div>
      </div>

      {/* Section 3: Financial Graph and Events */}
      <div className="section financial-section">
        <div className="calendar-sections">
          <FullCalendar
            className="fullcalendar"
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={allEvents}
            height={"90vh"}
            width={"100vh"}
          />
        </div>

        <div className="events-section">
          <h3>Upcoming Events</h3>
          <div className="ul">
            {topEvents.map((event, index) => (
              <div key={index} className="event-item">
                <div>
                  <h2
                    className="event-date"
                    style={{ color: event.color, fontSize: 18 }}
                  >
                    {event.date}
                  </h2>
                  <h3 className="event-title" style={{ color: "black" }}>
                    {event.title}
                  </h3>
                  <div
                    className="event-line"
                    style={{
                      backgroundColor: event.color,
                      width: "70%",
                      height: 4,
                      marginTop: -10,
                      marginBottom: 10,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 4: Financial Chart */}
      <div className="financial-chart">
        <h3>School Finance</h3>
        <Chart
          options={financialChartOptions}
          series={financialChartOptions.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default Overview;
