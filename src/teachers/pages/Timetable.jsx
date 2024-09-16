import React, { useState } from "react";
import "../styles/Timetable.css"; // Import CSS for styling

const Timetable = () => {
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
      acc[hour] = Array(daysOfWeek.length).fill("");
      return acc;
    }, {})
  );

  const handleChange = (hour, dayIndex, value) => {
    setTimetable((prev) => ({
      ...prev,
      [hour]: prev[hour].map((item, index) =>
        index === dayIndex ? value : item
      ),
    }));
  };

  const handleSave = () => {
    // Implement save functionality here
    alert("Changes saved!");
  };

  return (
    <div className="timetable-wrapper">
      {/* <button className="save-button" onClick={handleSave}>
        Save
      </button> */}
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
    </div>
  );
};

export default Timetable;
