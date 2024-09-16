import { useState } from "react";
import user from "../../images/usericon.jpeg";
import { NavLink } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { TbCheckbox } from "react-icons/tb";
import { BsCalendarEventFill } from "react-icons/bs";

const LibSide = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="sideDiv1">
      <div className="sideDiv2">
        <h2>Logo</h2>
      </div>
      <div className="sideDiv3" style={{ marginTop: 50 }}>
        <NavLink
          to="/admin"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
          end
        >
          <IoGrid className="icon" />
        </NavLink>
        <NavLink
          to="/admin/students"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
          end
        >
          <FaUsers className="icon" />
        </NavLink>
        <NavLink
          to="/admin/teachers"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
        >
          <HiUsers className="icon" />
        </NavLink>
        <NavLink
          to="/admin/fee"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
        >
          <TbCheckbox className="icon" />
        </NavLink>
        <NavLink
          to="/admin/events"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
        >
          <BsCalendarEventFill className="icon" />
        </NavLink>
      </div>
      <div className="sideDiv4" style={{ marginTop: 50 }}>
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
          <h4>Admin</h4>
        </div>
      </div>
    </div>
  );
};

export default LibSide;
