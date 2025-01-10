import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/ui/Sidebar";
import Nav from "../components/dashboard/nav/Nav";
import { useState } from "react";

function DashboardlLayout() {
  const [showSidebar,setShowSidebar]= useState(true);
  return (
    <div className="min-vh-100 overflow-hidden">
      <div className="vh-100 d-flex flex-row">
        <Sidebar showSidebar={showSidebar}></Sidebar>
        <div className="flex-fill h-full overflow-hidden">
          <div className="w-full h-full">
            <Nav toggleSidebar={() => setShowSidebar(!showSidebar)}></Nav>
            <main className="calc-height overflow-y-scroll p-2">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardlLayout;
