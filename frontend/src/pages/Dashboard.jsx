import React, { useEffect, useState } from "react";

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/dashboard", {
                    credentials: "include", // Include cookies in the request
                });

                if (!response.ok) {
                    const { message } = await response.json();
                    setError(message);
                    return;
                }

                const data = await response.json();
                setDashboardData(data);
            } catch (err) {
                setError("Failed to fetch dashboard data.");
            }
        };

        fetchDashboardData();
    }, []);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!dashboardData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-blue-100 rounded-lg">
                    <h2 className="text-lg font-semibold">Total Assets</h2>
                    <p className="text-2xl">{dashboardData.totalAssets}</p>
                </div>
                <div className="p-4 bg-green-100 rounded-lg">
                    <h2 className="text-lg font-semibold">Vault Size</h2>
                    <p className="text-2xl">{dashboardData.vaultSize}</p>
                </div>
                <div className="p-4 bg-yellow-100 rounded-lg">
                    <h2 className="text-lg font-semibold">Trusted Contacts</h2>
                    <p className="text-2xl">{dashboardData.trustedContacts}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;