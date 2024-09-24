import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBook } from "react-icons/fa";
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
          to="/parents"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
          end
        >
          <FaBook className="icon" />
          <h3 className="label">Result</h3>
        </NavLink>
      </div>
    </div>
  );
};

export default LibSide;
