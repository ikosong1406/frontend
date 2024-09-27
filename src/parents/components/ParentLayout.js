import React from "react";
import { Outlet } from "react-router-dom";
import ParentSide from "./ParentSide";
import { useWindowDimensions } from "./useWindowDimensions";
import { FaBook } from "react-icons/fa";

const Layout = () => {
  const { width } = useWindowDimensions();

  return (
    <div className="layout-container">
      {width > 925 ? (
        <div className="sidebar-container">
          <ParentSide />
        </div>
      ) : null}
      {width <= 925 ? (
        <div
          className="bottom-tab-container"
          style={{
            padding: 5,
            backgroundColor: "#7cb5cb",
            width: "50%",
            borderRadius: "0 10px 10px 0",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <FaBook
            style={{ alignSelf: "center", fontSize: 25, color: "white" }}
          />
          <h2
            style={{ alignSelf: "center", fontSize: 20, alignSelf: "center" }}
          >
            {" "}
            Result{" "}
          </h2>
        </div>
      ) : null}
      <div className="page-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
