import { useState } from "react";
import logo from "../../images/logo.jpg";
import user from "../../images/usericon.jpeg";
import { NavLink } from "react-router-dom";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaCalculator } from "react-icons/fa6";
import { RiPieChart2Fill } from "react-icons/ri";

const AccSide = () => {
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
          to="/accountant"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
          end
        >
          <FaMoneyBillTrendUp className="icon" />
          <h3 className="label">Fees</h3>
        </NavLink>
        <NavLink
          to="/accountant/schoolExpenses"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
          end
        >
          <FaCalculator className="icon" />
          <h3 className="label">Expenses</h3>
        </NavLink>
        <NavLink
          to="/teacher/student"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
        >
          <RiPieChart2Fill className="icon" />
          <h3 className="label">Budget</h3>
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

export default AccSide;
