import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "react-calendar/dist/Calendar.css";
import "../styles/Events.css";
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import eventData from "../../Api/Events";
import axios from "axios";
import BackendApi from "../../Api/BackendApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventsPage = () => {
  const [events, setEvents] = useState([]); // Use imported eventData
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    date: "",
    color: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await eventData(); // Fetch data from backend
        setEvents(data); // Store data in state
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch students");
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  const handleAddEventClick = () => {
    setIsModalOpen(true); // Open modal to add an event
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      title: eventDetails.title,
      description: eventDetails.description,
      color: eventDetails.color,
      date: eventDetails.date,
    };

    try {
      // Send the new event details to the backend using Axios
      const response = await axios.post(`${BackendApi}/newEvent`, newEvent);

      if (response.status === 200) {
        // Update events state locally only after successful backend response
        toast.success("Event added successfully");
      } else {
        toast.error("Error adding event");
      }
    } catch (error) {
      toast.error("Failed to add event.");
    }

    handleCloseModal(); // Close the modal after submission
  };

  const handleDeleteEvent = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      const data = {
        id: eventId,
      };

      try {
        const response = await axios.post(`${BackendApi}/deleteEvent`, data);
        if (response.status === 200) {
          toast.success("Event deleted successfully");
        } else {
          toast.error("Error deleting event");
        }
      } catch (error) {
        toast.error("Failed to delete event.");
      }
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0];
  };

  const allEvents = events.map((event) => ({
    _id: event._id,
    title: event.title,
    date: formatDate(event.date),
    color: event.color,
  }));

  return (
    <div className="events-page">
      <ToastContainer />
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
              height={"90vh"}
              width={"100vh"}
            />
          </div>
        </div>

        {/* Second Section: All Events List */}
        <div className="right-section">
          <h2>Events List</h2>
          <div className="all-events-list">
            {allEvents.map((event) => (
              <div key={event._id} className="event-item">
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
                  <FaTrash
                    className="delete-icon"
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDeleteEvent(event._id)}
                  />
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
            <div style={{ display: "flex" }}>
              <h2>Add Event</h2>
              <button
                onClick={handleCloseModal}
                style={{ color: "black", fontWeight: "800", fontSize: 20 }}
              >
                X
              </button>
            </div>

            <form onSubmit={handleEventSubmit} style={{ display: "block" }}>
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
              <button type="submit" style={{ marginTop: 370 }}>
                Add Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
