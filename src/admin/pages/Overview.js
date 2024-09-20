import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import Calendar from "react-calendar"; // Import react-calendar
import "react-calendar/dist/Calendar.css"; // Import the calendar CSS
import "../styles/Overview.css";
import { IoPersonAdd } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import students from "../../images/students.png";
import teachers from "../../images/teachers.png";
import income from "../../images/income.png";
import expenses from "../../images/expenses.png";

// Dummy data for overview
const overviewData = {
  students: 500,
  teachers: 50,
  totalRevenue: 1000000,
  totalExpenses: 600000,
  newAdmissions: 20,
  events: 5,
  schoolYear: "2023/2024",
  upcomingEvents: [
    { date: new Date("2024-09-21"), event: "Science Fair" },
    { date: new Date("2024-10-01"), event: "Parent-Teacher Meeting" },
  ],
};

const Overview = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const [value, setValue] = useState(new Date()); // Calendar selected date
  const [hoveredDate, setHoveredDate] = useState(null);

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
        data: [
          100000, 120000, 140000, 160000, 180000, 200000, 220000, 240000,
          260000,
        ],
      },
      {
        name: "Expenses",
        data: [
          80000, 85000, 90000, 95000, 100000, 105000, 110000, 115000, 120000,
        ],
      },
    ],
  };

  const handleAddStudent = () => {
    navigate("/admin/add-student");
  };

  const handleAddEvent = () => {
    navigate("/admin/add-event");
  };

  // Check if a date has an event
  const isEventDate = (date) => {
    return overviewData.upcomingEvents.some(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  // Get event for the selected date
  const getEventForDate = (date) => {
    const event = overviewData.upcomingEvents.find(
      (event) => event.date.toDateString() === date.toDateString()
    );
    return event ? event.event : null;
  };

  return (
    <div className="overview-page">
      {/* Section 1: Greeting and Add Student Button */}
      <div className="section greeting-section">
        <h3>{greeting}</h3>
        <button onClick={handleAddStudent} className="btn-add-student">
          <IoPersonAdd />
          <span> New Addmission</span>
        </button>
      </div>

      {/* Section 2: School Analytics Cards */}
      <div className="overview-cards">
        <div className="card">
          <div>
            <h2>{overviewData.students}</h2>
            <p>Total Students</p>
          </div>
          <div style={{ alignSelf: "center" }}>
            <img src={students} style={{ width: 50, height: 50 }} />
          </div>
        </div>
        <div className="card">
          <div>
            <h2>{overviewData.teachers}</h2>
            <p>Total Teachers</p>
          </div>
          <div style={{ alignSelf: "center" }}>
            <img src={teachers} style={{ width: 60, height: 50 }} />
          </div>
        </div>
        <div className="card">
          <div>
            <h2>{overviewData.totalRevenue}</h2>
            <p>Total Revenue</p>
          </div>
          <div style={{ alignSelf: "center" }}>
            <img src={income} style={{ width: 50, height: 50 }} />
          </div>
        </div>
        <div className="card">
          <div>
            <h2>{overviewData.totalExpenses}</h2>
            <p>Total Expenses</p>
          </div>
          <div style={{ alignSelf: "center" }}>
            <img src={expenses} style={{ width: 50, height: 50 }} />
          </div>
        </div>
      </div>

      {/* Section 3: Financial Graph and Events */}
      <div className="section financial-section">
        <div className="calendar-section">
          <h3>School Calendar</h3>
          <Calendar
            onChange={setValue}
            value={value}
            tileClassName={({ date }) =>
              isEventDate(date) ? "event-day" : null
            }
            onMouseOver={({ date }) =>
              setHoveredDate(isEventDate(date) ? date : null)
            }
          />

          {hoveredDate && (
            <div className="event-popup">
              <p>Event: {getEventForDate(hoveredDate)}</p>
            </div>
          )}
        </div>

        <div className="events-section">
          <h3>Upcoming Events</h3>
          <div className="ul">
            {overviewData.upcomingEvents.map((event, index) => (
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <p key={index} className="date">
                  {event.date.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>

                <h4 style={{ alignSelf: "center" }}>{event.event}</h4>
              </div>
            ))}
          </div>
          <button onClick={handleAddEvent} className="btn-add-event">
            <FaPlus />
            <span> New Event</span>
          </button>
        </div>
      </div>

      {/* Section 4: School Calendar */}
      <div className="financial-chart">
        <h3>School Financials</h3>
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
