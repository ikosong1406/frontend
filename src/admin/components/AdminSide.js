import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { RiCoinsFill } from "react-icons/ri";
import { BsCalendarEventFill } from "react-icons/bs";
import { FaAngleDoubleUp } from "react-icons/fa";
import logo from "../../images/logo.jpg";
import axios from "axios";
import BackendApi from "../../Api/BackendApi";
import { getUserToken } from "../../Api/storage";

const AdminSide = () => {
  const [showNav, setShowNav] = useState(false);
  const [userData, setUserData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const userToken = await getUserToken();
      setToken(userToken);
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getData = async () => {
    const data = { token };
    try {
      const response = await axios.post(`${BackendApi}/userdata`, data);
      const fetchedData = response.data.data;

      setUserData(fetchedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      const interval = setInterval(() => {
        setRefreshing(true);
        getData();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [token]);

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
          <h3 className="label">Staffs</h3>
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
      <NavLink className="sideDiv4">
        <img
          src={userData.profilePhoto}
          alt=""
          style={{
            width: 35,
            height: 35,
            borderRadius: 20,
            alignSelf: "center",
          }}
        />
        <div className="sideDiv41">
          <h3>{userData.firstname}</h3>
          <h4>{userData.role}</h4>
        </div>
      </NavLink>
    </div>
  );
};

export default AdminSide;
