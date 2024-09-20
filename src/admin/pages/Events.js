import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "react-calendar/dist/Calendar.css";
import "../styles/Events.css";
import { FaPlus } from "react-icons/fa6";
import { FaEllipsisV } from "react-icons/fa";

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

const EventsPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState(dummyEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    date: "",
    color: "",
  });

  const handleDateClick = (info) => {
    const dateStr = info.dateStr;
    const eventsForDate = events[dateStr] || [];
    setSelectedDate(dateStr);
    setEventDetails(
      eventsForDate[0] || { title: "", description: "", color: "" }
    );
  };

  const handleAddEventClick = () => {
    setIsModalOpen(true); // Open modal to add an event
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    // Update events object with new event details
    const newEvent = {
      title: eventDetails.title,
      description: eventDetails.description,
      color: eventDetails.color,
    };
    setEvents((prevEvents) => ({
      ...prevEvents,
      [eventDetails.date]: prevEvents[eventDetails.date]
        ? [...prevEvents[eventDetails.date], newEvent]
        : [newEvent],
    }));
    handleCloseModal();
  };

  const allEvents = Object.keys(events).flatMap((date) =>
    events[date].map((event) => ({
      date,
      title: event.title,
      color: event.color,
    }))
  );

  return (
    <div className="events-page">
      {/* Header with title and add event button */}
      <div className="headers">
        <h2>Events</h2>
        <button onClick={handleAddEventClick} className="btn-add-event">
          <FaPlus style={{ fontSize: 14 }} />
          <span> Add Event</span>
        </button>
      </div>

      <div className="content">
        {/* First Section: Calendar and Past Events */}
        <div className="left-section">
          <div className="calendar-section">
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
        </div>

        {/* Second Section: All Events List */}
        <div className="right-section">
          <h2>Events List</h2>
          <div className="all-events-list">
            {allEvents.map((event, index) => (
              <div key={index} className="event-item">
                <div>
                  <h2 className="event-date" style={{ color: event.color }}>
                    {event.date}
                  </h2>
                  <h2 className="event-title">{event.title}</h2>
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
                <div className="event-menu">
                  <FaEllipsisV />
                  <div className="event-actions">
                    <button>Edit</button>
                    <button>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for adding an event */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Event</h2>
            <form onSubmit={handleEventSubmit}>
              <label>
                Event Title:
                <input
                  type="text"
                  value={eventDetails.title}
                  onChange={(e) =>
                    setEventDetails({ ...eventDetails, title: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Event Description:
                <input
                  type="text"
                  value={eventDetails.description}
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  value={eventDetails.date}
                  onChange={(e) =>
                    setEventDetails({ ...eventDetails, date: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Event Color:
                <input
                  type="color"
                  value={eventDetails.color}
                  onChange={(e) =>
                    setEventDetails({ ...eventDetails, color: e.target.value })
                  }
                  required
                />
              </label>
              <button type="submit">Add Event</button>
            </form>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}

      {/* Event Details Pop-up when a date is clicked */}
      {selectedDate && eventDetails.title && (
        <div className="event-popup">
          <h3>Event Details</h3>
          <p>
            <strong>Date:</strong> {selectedDate}
          </p>
          <p>
            <strong>Title:</strong> {eventDetails.title}
          </p>
          <p>
            <strong>Description:</strong> {eventDetails.description}
          </p>
          <button onClick={() => setSelectedDate(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
