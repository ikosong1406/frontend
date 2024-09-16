import React from "react";
import { Outlet } from "react-router-dom";
import AdminSide from "./AdminSide";

const TeachLayout = () => {
  return (
    <div className="layout-container">
      <div className="sidebar-container">
        <AdminSide />
      </div>
      <div className="page-container">
        <Outlet />
      </div>
    </div>
  );
};

export default TeachLayout;
