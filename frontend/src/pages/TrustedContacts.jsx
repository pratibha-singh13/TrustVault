import React, { useEffect, useState } from "react";

const TrustedContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/trusted-contacts", {
                    credentials: "include",
                });

                if (!response.ok) {
                    const { message } = await response.json();
                    setError(message);
                    return;
                }

                const data = await response.json();
                setContacts(data);
            } catch (err) {
                setError("Failed to fetch trusted contacts.");
            }
        };

        fetchContacts();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/trusted-contacts/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!response.ok) {
                const { message } = await response.json();
                setError(message);
                return;
            }

            setContacts(contacts.filter((contact) => contact.id !== id));
        } catch (err) {
            setError("Failed to delete contact.");
        }
    };

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!contacts.length) {
        return <p>No trusted contacts found.</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Trusted Contacts</h1>
            <ul className="mt-4 space-y-2">
                {contacts.map((contact) => (
                    <li key={contact.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-semibold">{contact.name}</h2>
                            <p>{contact.email}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(contact.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrustedContacts;