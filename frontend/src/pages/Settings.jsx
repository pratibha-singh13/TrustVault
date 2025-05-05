import React, { useState } from "react";

const Settings = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("http://localhost:5000/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const { message } = await response.json();
                setMessage(message);
                return;
            }

            setMessage("Settings updated successfully!");
        } catch (err) {
            setMessage("Failed to update settings.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                    Update
                </button>
            </form>
            {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
    );
};

export default Settings;