import { useState, useEffect } from "react";
import "../styles/TeachSide.css";
import logo from "../../images/logo.jpg";
import { NavLink } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import axios from "axios";
import BackendApi from "../../Api/BackendApi";
import { getUserToken } from "../../Api/storage";

const TeachSide = () => {
  const [showNav, setShowNav] = useState(false);
  const [userData, setUserData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

export default TeachSide;
