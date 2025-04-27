// src/pages/TrustedContacts.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaUserShield } from "react-icons/fa";

const TrustedContacts = () => {
    const contacts = [
        { name: "John Doe", email: "john@example.com" },
        { name: "Jane Smith", email: "jane@example.com" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen p-6 bg-[#fff0f6] dark:bg-[#1e1e2f] text-gray-900 dark:text-gray-100"
        >
            <div className="flex items-center gap-3 mb-6">
                <FaUserShield className="text-3xl text-pink-600 dark:text-pink-300" />
                <h1 className="text-3xl font-bold text-pink-600 dark:text-pink-300">Trusted Contacts</h1>
            </div>

            <div className="space-y-4">
                {contacts.map((contact, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-xl shadow transition-shadow"
                    >
                        <div>
                            <h2 className="text-lg font-medium">{contact.name}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-300">{contact.email}</p>
                        </div>
                        <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 text-sm transition">
                            Remove
                        </button>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default TrustedContacts;
