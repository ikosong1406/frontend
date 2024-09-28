import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "react-calendar/dist/Calendar.css";
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
};

const dummyEvents = {
  "2024-09-13": [
    {
      title: "Sports Day",
      description: "Annual sports competition",
      color: "red",
    },
  ],
  "2024-10-01": [
    {
      title: "Parent-Teacher Meeting",
      description: "PTA meeting at 10 AM",
      color: "blue",
    },
  ],
};

const Overview = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const [value, setValue] = useState(new Date()); // Calendar selected date
  const [hoveredDate, setHoveredDate] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState(dummyEvents);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    date: "",
    color: "",
  });

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
    navigate("/admin/newStudent");
  };

  const handleAddEvent = () => {
    navigate("/admin/add-event");
  };

  const handleDateClick = (info) => {
    const dateStr = info.dateStr;
    const eventsForDate = events[dateStr] || [];
    setSelectedDate(dateStr);
    setEventDetails(
      eventsForDate[0] || { title: "", description: "", color: "" }
    );
  };

  const allEvents = Object.keys(events).flatMap((date) =>
    events[date].map((event) => ({
      date,
      title: event.title,
      color: event.color,
    }))
  );

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
        <div className="calendar-sections">
          <FullCalendar
            className="fullcalendar"
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={allEvents}
            dateClick={handleDateClick}
            height={"90vh"}
            width={"100vh"}
          />
        </div>

        <div className="events-section">
          <h3>Upcoming Events</h3>
          <div className="ul">
            {allEvents.map((event, index) => (
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

      {/* Section 4: School Calendar */}
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
