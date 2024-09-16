import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Events.css";

// Dummy backend data for events
const dummyEvents = {
  "2024-09-13": [
    { title: "Sports Day", description: "Annual sports competition" },
  ],
  "2024-10-01": [
    { title: "Parent-Teacher Meeting", description: "PTA meeting at 10 AM" },
  ],
};

const EventsPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(dummyEvents);
  const [emailSent, setEmailSent] = useState(false);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleSendEmail = () => {
    // Simulate email sending
    setEmailSent(true);
    alert("Notification emails sent to parents!");
  };

  const selectedDateString = selectedDate.toISOString().split("T")[0];
  const eventsForSelectedDay = events[selectedDateString] || [];

  return (
    <div className="events-page">
      <div className="calendar-section">
        <Calendar onClickDay={handleDateClick} />
      </div>
      <div className="event-details-section">
        <h2>Events for {selectedDateString}</h2>
        {eventsForSelectedDay.length > 0 ? (
          eventsForSelectedDay.map((event, index) => (
            <div key={index} className="event-item">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          ))
        ) : (
          <p>No events for this day</p>
        )}
        <button onClick={handleSendEmail}>Send Notification Emails</button>
      </div>
    </div>
  );
};

export default EventsPage;
