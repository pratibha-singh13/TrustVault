// src/pages/MyVault.jsx
import React from "react";
import { motion } from "framer-motion";
import { RiSafeLine } from "react-icons/ri"; // ✅ Imported a valid vault icon

const MyVault = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen p-6 bg-[#f9f5ff] dark:bg-[#0f172a] text-gray-800 dark:text-gray-100"
        >
            <h1 className="text-3xl font-bold mb-6 text-purple-700 dark:text-purple-300 flex items-center gap-2">
                <RiSafeLine className="text-purple-500 dark:text-purple-300" />
                My Vault
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer"
                    >
                        <h2 className="text-xl font-semibold mb-2">Asset {item}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Details about the asset.</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default MyVault;
