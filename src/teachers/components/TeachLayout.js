import React from "react";
import { Outlet } from "react-router-dom";
import TeachSide from "./TeachSide";
import "../styles/TeachLayout.css";

const TeachLayout = () => {
  return (
    <div className="layout-container">
      <div className="sidebar-container">
        <TeachSide />
      </div>
      <div className="page-container">
        <Outlet />
      </div>
    </div>
  );
};

export default TeachLayout;
