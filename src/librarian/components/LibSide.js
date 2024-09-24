import { useState } from "react";
import user from "../../images/usericon.jpeg";
import { NavLink } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import logo from "../../images/logo.jpg";

const LibSide = () => {
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
          to="/library"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
          end
        >
          <FaBook className="icon" />
        </NavLink>
        <NavLink
          to="/library/bookIssuing"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
          end
        >
          <IoGrid className="icon" />
        </NavLink>
      </div>
      <div className="sideDiv4">
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
          <h4>librarian</h4>
        </div>
      </div>
    </div>
  );
};

export default LibSide;
