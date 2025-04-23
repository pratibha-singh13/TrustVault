import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const dashboardData = [
    { title: "Total Assets", value: "12", color: "#7c3aed" },
    { title: "Vault Size", value: "1.4 GB", color: "#06b6d4" },
    { title: "Trusted Contacts", value: "3", color: "#10b981" },
];

export default function Dashboard() {
    return (
        <main className="min-h-screen px-4 py-8 bg-[#f0f4f8] dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 transition-all duration-300">
            <div className="max-w-6xl mx-auto">
                <motion.h1
                    className="text-3xl md:text-4xl font-semibold mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Welcome back to TrustVault 👋
                </motion.h1>

                {/* Cards */}
                <section className="grid gap-6 md:grid-cols-3">
                    {dashboardData.map((item, index) => (
                        <motion.div
                            key={index}
                            className="rounded-2xl shadow-md p-6"
                            style={{ backgroundColor: item.color }}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <h2 className="text-xl font-medium text-white">{item.title}</h2>
                            <p className="text-3xl mt-2 font-bold text-white">{item.value}</p>
                        </motion.div>
                    ))}
                </section>

                {/* Quick Actions */}
                <section className="mt-10">
                    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="flex gap-4 flex-wrap">
                        <Link
                            to="/vault"
                            className="px-6 py-3 rounded-full bg-[#7c3aed] text-white font-medium hover:bg-purple-800 transition-all"
                        >
                            Go to Vault
                        </Link>
                        <Link
                            to="/add-asset"
                            className="px-6 py-3 rounded-full bg-[#06b6d4] text-white font-medium hover:bg-cyan-700 transition-all"
                        >
                            Add New Asset
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
