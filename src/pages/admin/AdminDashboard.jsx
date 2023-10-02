import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import AddSeller from "./AddSeller";
import ListSeller from "./ListSeller";

function AdminDashboard() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };
  return (
    <>
      <div
        className={`admin-dashbord ${isSidebarCollapsed ? "collapsed" : ""}`}
      >
        <Sidebar
          collapsed={isSidebarCollapsed}
          onToggleSidebar={toggleSidebar}
        />
        <div className="main-content">
          <Navbar />
          <hr></hr>
          <Routes>
            <Route exect path="" element={<Home />} />
            <Route path="add-seller" element={<AddSeller />} />
            <Route path="list-sellers" element={<ListSeller />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
