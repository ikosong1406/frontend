import React from "react";
import { Outlet } from "react-router-dom";
import LibSide from "./LibSide";
// import "../styles/TeachLayout.css";

const LibLayout = () => {
  return (
    <div className="layout-container">
      <div className="sidebar-container">
        <LibSide />
      </div>
      <div className="page-container">
        <Outlet />
      </div>
    </div>
  );
};

export default LibLayout;
