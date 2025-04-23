// Topbar.jsx
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Topbar = ({ toggleSidebar }) => {
    return (
        <div className="w-full bg-[#2d3748] text-white flex items-center justify-between p-4">
            <button
                className="lg:hidden text-white text-2xl"
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
            >
                <FaBars />
            </button>
            <div className="text-lg font-bold">TrustVault Dashboard</div>
            <div>
                <Link
                    to="/profile"
                    className="text-white hover:text-[#edf2f7] transition-colors"
                >
                    Profile
                </Link>
            </div>
        </div>
    );
};

export default Topbar;
