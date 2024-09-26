import React from "react";
import { Outlet } from "react-router-dom";
import ResultSide from "./ResultSide";

const ResultLayout = () => {
  return (
    <div className="layout-container">
      <div className="sidebar-container">
        <ResultSide />
      </div>
      <div className="page-container">
        <Outlet />
      </div>
    </div>
  );
};

export default ResultLayout;
