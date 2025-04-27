// src/pages/Settings.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiSettings } from "react-icons/fi";

const Settings = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen p-6 bg-[#e0f7fa] dark:bg-[#0a192f] text-gray-800 dark:text-gray-100"
        >
            <div className="flex items-center gap-3 mb-6">
                <FiSettings className="text-3xl text-cyan-600 dark:text-cyan-300" />
                <h1 className="text-3xl font-bold text-cyan-600 dark:text-cyan-300">Settings</h1>
            </div>

            <div className="space-y-6">
                {/* Account Settings */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-cyan-300/30 dark:hover:shadow-cyan-500/20 transition-shadow">
                    <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        Update your email, password, and profile picture.
                    </p>
                    <button className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 text-sm">
                        Manage Account
                    </button>
                </div>

                {/* Privacy Settings */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-cyan-300/30 dark:hover:shadow-cyan-500/20 transition-shadow">
                    <h2 className="text-xl font-semibold mb-2">Privacy Settings</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        Control who sees your data and adjust vault preferences.
                    </p>
                    <button className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 text-sm">
                        Manage Privacy
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Settings;
