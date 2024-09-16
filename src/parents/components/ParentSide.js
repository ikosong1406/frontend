import { useState } from "react";
// import "../styles/TeachSide.css";
import user from "../../images/usericon.jpeg";
import { NavLink } from "react-router-dom";
import { FaBook } from "react-icons/fa";

const LibSide = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="sideDiv1">
      <div className="sideDiv2">
        <h2>Logo</h2>
      </div>
      <div className="sideDiv3">
        <NavLink
          to="/parents"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
          end
        >
          <FaBook className="icon" />
        </NavLink>
      </div>
    </div>
  );
};

export default LibSide;
