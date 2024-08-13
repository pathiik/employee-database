import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import UserDataTab from "../userDataTab/UserDataTab";
import './allUsers.css';

const AllUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const userData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(userData);
            } catch (error) {
                setError("Failed to load users. Please try again later.");
                console.error("Error fetching users: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <>
            {users.map(user => (
                <UserDataTab
                    key={user.id}
                    name={user.name}
                    employeeID={user.employeeID}
                    email={user.email}
                    contactNumber={user.contactNumber}
                />
            ))}
        </>
    );
}

export default AllUsersPage;
