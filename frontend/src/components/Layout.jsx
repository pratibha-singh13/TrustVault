// Layout.jsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen">
            <Sidebar isCollapsed={!isSidebarOpen} />
            <div className="flex-1 flex flex-col">
                <Topbar toggleSidebar={toggleSidebar} />
                <div className="p-6 flex-grow bg-[#edf2f7] dark:bg-[#1e293b]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
