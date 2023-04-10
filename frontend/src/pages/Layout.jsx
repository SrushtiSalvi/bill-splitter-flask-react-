import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
