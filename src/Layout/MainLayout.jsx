import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = ({data}) => {
  return (
    <div>
      <Sidebar user={data}/>
      <Navbar user={data}/>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;