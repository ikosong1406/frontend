import React from "react";
import { Outlet } from "react-router-dom";
import AccSide from "./AccSide";

const AccLayout = () => {
  return (
    <div className="layout-container">
      <div className="sidebar-container">
        <AccSide />
      </div>
      <div className="page-container">
        <Outlet />
      </div>
    </div>
  );
};

export default AccLayout;
