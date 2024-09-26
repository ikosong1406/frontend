import { useState } from "react";
import "../styles/TeachSide.css";
import logo from "../../images/logo.jpg";
import user from "../../images/usericon.jpeg";
import { NavLink } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";

const TeachSide = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="sideDiv1">
      <div className="sideDiv2">
        <img
          src={logo}
          style={{ width: 70, height: 70, borderRadius: "50%" }}
        />
      </div>
      <div className="sideDiv3">
        <NavLink
          to="/teacher"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
          end
        >
          <FaBook className="icon" />
          <h3 className="label">Notes</h3>
        </NavLink>
        <NavLink
          to="/teacher/timetable"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
          end
        >
          <IoGrid className="icon" />
          <h3 className="label">Timetable</h3>
        </NavLink>
        <NavLink
          to="/teacher/student"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
        >
          <FaUsers className="icon" />
          <h3 className="label">Students</h3>
        </NavLink>
        <NavLink
          to="/teacher/review"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
        >
          <FaRepeat className="icon" />
          <h3 className="label">Review</h3>
        </NavLink>
      </div>
      {/* <div className="sideDiv4">
        <img
          src={user}
          alt=""
          style={{
            width: 35,
            height: 35,
            borderRadius: 20,
            alignSelf: "center",
          }}
        />
        <div className="sideDiv41">
          <h3>Alex</h3>
          <h4>Teacher</h4>
        </div>
      </div> */}
    </div>
  );
};

export default TeachSide;
