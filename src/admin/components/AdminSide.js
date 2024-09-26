import { useState } from "react";
import user from "../../images/usericon.jpeg";
import { NavLink } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { RiCoinsFill } from "react-icons/ri";
import { BsCalendarEventFill } from "react-icons/bs";
import { FaAngleDoubleUp } from "react-icons/fa";
import logo from "../../images/logo.jpg";

const AdminSide = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="sideDiv1">
      <div className="sideDiv2">
        <img
          src={logo}
          style={{ width: 70, height: 70, borderRadius: "50%" }}
        />
      </div>
      <div className="sideDiv3" style={{ marginTop: 50 }}>
        <NavLink
          to="/admin"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
          end
        >
          <IoGrid className="icon" />
          <h3 className="label">Dashboard</h3>
        </NavLink>
        <NavLink
          to="/admin/students"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
          end
        >
          <FaUserGraduate className="icon" />
          <h3 className="label">Students</h3>
        </NavLink>
        <NavLink
          to="/admin/teachers"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
        >
          <HiUsers className="icon" />
          <h3 className="label">Teachers</h3>
        </NavLink>
        <NavLink
          to="/admin/fee"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
        >
          <RiCoinsFill className="icon" />
          <h3 className="label">Finance</h3>
        </NavLink>
        <NavLink
          to="/admin/events"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
        >
          <BsCalendarEventFill className="icon" />
          <h3 className="label">Events</h3>
        </NavLink>
        <NavLink
          to="/admin/promotion"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
        >
          <FaAngleDoubleUp className="icon" />
          <h3 className="label">Promotion</h3>
        </NavLink>
      </div>
      {/* <div className="sideDiv4" style={{ marginTop: 50 }}>
        <img
          src={user}
          alt="user icon"
          style={{
            width: 35,
            height: 35,
            borderRadius: 20,
            alignSelf: "center",
          }}
        />
        <div className="sideDiv41">
          <h3>Alex</h3>
          <h4>Admin</h4>
        </div>
      </div> */}
    </div>
  );
};

export default AdminSide;
