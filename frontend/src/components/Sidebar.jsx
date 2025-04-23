// Sidebar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUserAlt, FaVault, FaCog } from "react-icons/fa";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div
            className={`${isCollapsed ? "w-16" : "w-64"
                } h-full bg-[#1a202c] text-white transition-all duration-300 flex flex-col`}
        >
            <button
                className="lg:hidden text-white p-4"
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
            >
                {isCollapsed ? "→" : "←"}
            </button>

            <div className="flex-grow flex flex-col items-center justify-between">
                <div className="flex-grow">
                    <nav className="mt-8">
                        <Link
                            to="/dashboard"
                            className="flex items-center py-3 px-4 text-lg hover:bg-[#2d3748] transition-all"
                        >
                            <FaHome className="mr-2" />
                            {!isCollapsed && "Dashboard"}
                        </Link>
                        <Link
                            to="/my-vault"
                            className="flex items-center py-3 px-4 text-lg hover:bg-[#2d3748] transition-all"
                        >
                            <FaVault className="mr-2" />
                            {!isCollapsed && "My Vault"}
                        </Link>
                        <Link
                            to="/trusted-contacts"
                            className="flex items-center py-3 px-4 text-lg hover:bg-[#2d3748] transition-all"
                        >
                            <FaUserAlt className="mr-2" />
                            {!isCollapsed && "Trusted Contacts"}
                        </Link>
                        <Link
                            to="/settings"
                            className="flex items-center py-3 px-4 text-lg hover:bg-[#2d3748] transition-all"
                        >
                            <FaCog className="mr-2" />
                            {!isCollapsed && "Settings"}
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
