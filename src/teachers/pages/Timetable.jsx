import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import BackendApi from "../../Api/BackendApi";
import { getUserToken } from "../../Api/storage";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "../styles/Timetable.css"; // Import your custom CSS

const Timetable = () => {
  const [userData, setUserData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const userToken = await getUserToken();
      setToken(userToken);
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getData = async () => {
    const data = { token };
    try {
      const response = await axios.post(`${BackendApi}/userdata`, data);
      const fetchedData = response.data.data;

      setUserData(fetchedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      const interval = setInterval(() => {
        setRefreshing(true);
        getData();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [token]);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hours = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
  ];

  const [timetable, setTimetable] = useState(() =>
    hours.reduce((acc, hour) => {
      acc[hour] = Array(daysOfWeek.length).fill(""); // Empty strings for each day
      return acc;
    }, {})
  );

  useEffect(() => {
    const fetchTimetable = async () => {
      const data = { userId: userData._id };
      try {
        const response = await axios.post(`${BackendApi}/allTimetable`, data);
        const { timetable } = response.data || {}; // Avoid accessing undefined
        if (timetable && Object.keys(timetable).length > 0) {
          setTimetable(timetable);
        } else {
        }
      } catch (error) {
        console.error("Error fetching timetable:", error);
      }
    };

    fetchTimetable();
  }, [userData]);

  const handleChange = (hour, dayIndex, value) => {
    setTimetable((prev) => ({
      ...prev,
      [hour]: prev[hour].map((item, index) =>
        index === dayIndex ? value : item
      ),
    }));
  };

  const handleSave = async () => {
    try {
      const data = {
        userId: userData._id,
        timetable,
      };
      await axios.post(`${BackendApi}/newTimetable`, data);
      toast.success("Timetable saved successfully!");
    } catch (error) {
      toast.error("Error saving timetable.");
    }
  };

  return (
    <div className="timetable-wrapper">
      <ToastContainer /> {/* Add Toastify container to display notifications */}
      <div className="timetable-grid">
        <div className="cell header">Time</div>
        {daysOfWeek.map((day) => (
          <div key={day} className="cell header">
            {day}
          </div>
        ))}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="cell">{hour}</div>
            {timetable[hour].map((item, index) => (
              <input
                key={index}
                type="text"
                value={item}
                onChange={(e) => handleChange(hour, index, e.target.value)}
                className="cell"
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <button
        className="save-button"
        onClick={handleSave}
        style={{ marginTop: 20 }}
      >
        Save Timetable
      </button>
    </div>
  );
};

export default Timetable;
