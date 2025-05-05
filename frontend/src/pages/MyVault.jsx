import React, { useEffect, useState } from "react";

const MyVault = () => {
    const [vaultEntries, setVaultEntries] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVaultEntries = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/vaults", {
                    credentials: "include",
                });

                if (!response.ok) {
                    const { message } = await response.json();
                    setError(message);
                    return;
                }

                const data = await response.json();
                setVaultEntries(data);
            } catch (err) {
                setError("Failed to fetch vault entries.");
            }
        };

        fetchVaultEntries();
    }, []);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!vaultEntries.length) {
        return <p>No vault entries found.</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">My Vault</h1>
            <ul className="mt-4 space-y-2">
                {vaultEntries.map((entry) => (
                    <li key={entry.id} className="p-4 bg-gray-100 rounded-lg">
                        <h2 className="text-lg font-semibold">{entry.title}</h2>
                        <p>{entry.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyVault;