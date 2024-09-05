import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './userDetails.css';

const UserDetails = () => {
    const navigate = useNavigate();

    const { employeeID } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // State for user details
    const [userName, setUserName] = useState('');
    const [userContactNumber, setUserContactNumber] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userCity, setUserCity] = useState('');
    const [userHomeCountry, setUserHomeCountry] = useState('');
    const [userEmail, setUserEmail] = useState('');

    // State for editable fields
    const [editName, setEditName] = useState('');
    const [editContactNumber, setEditContactNumber] = useState('');
    const [editAge, setEditAge] = useState('');
    const [editCity, setEditCity] = useState('');
    const [editHomeCountry, setEditHomeCountry] = useState('');
    const [editEmail, setEditEmail] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log("Fetching user with employeeID:", employeeID);

                const q = query(collection(db, "users"), where("employeeID", "==", employeeID));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data();
                    console.log("User data found:", userData);
                    setUser(userData);

                    setUserName(userData.name);
                    setUserContactNumber(userData.contactNumber);
                    setUserAge(userData.age);
                    setUserCity(userData.city);
                    setUserHomeCountry(userData.homeCountry);
                    setUserEmail(userData.email);

                    setEditName(userData.name);
                    setEditContactNumber(userData.contactNumber);
                    setEditAge(userData.age);
                    setEditCity(userData.city);
                    setEditHomeCountry(userData.homeCountry);
                    setEditEmail(userData.email);
                } else {
                    // No user found page needs to be created
                    setError("User not found. No user found with employeeID: " + employeeID);
                    // navigate("/users-not-found");
                    console.error("No user found with employeeID:", employeeID);
                }
            } catch (error) {
                setError("Failed to load user. Please try again later.");
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [employeeID]);

    const handleSave = async () => {
        const userCode = prompt("Enter the validation code to save changes:");
        if (userCode !== import.meta.env.VITE_USER_ADD_VALIDATION_CODE) {
            alert("Validation code is incorrect. Please try again.");
            return;
        }

        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            const docToUpdate = querySnapshot.docs.find(doc => doc.data().employeeID === employeeID);

            if (docToUpdate) {
                const userDoc = doc(db, "users", docToUpdate.id);
                await updateDoc(userDoc, {
                    name: editName,
                    contactNumber: editContactNumber,
                    age: editAge,
                    city: editCity,
                    homeCountry: editHomeCountry,
                    email: editEmail,
                });

                setUserName(editName);
                setUserContactNumber(editContactNumber);
                setUserAge(editAge);
                setUserCity(editCity);
                setUserHomeCountry(editHomeCountry);
                setUserEmail(editEmail);

                setIsEditing(false);
            } else {
                setError("Document not found. Please check the employee ID.");
            }
        } catch (error) {
            setError("Failed to save changes. Please try again later.");
            console.error("Error updating document: ", error);
        }
    };

    const handleDelete = async () => {
        if (!user) return;
        const userCode = prompt("Enter the validation code to delete the user:");
        if (userCode !== import.meta.env.VITE_USER_ADD_VALIDATION_CODE) {
            alert("Validation code is incorrect. Please try again.");
            return;
        }

        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const docToDelete = querySnapshot.docs.find(doc => doc.data().employeeID === employeeID);

                if (docToDelete) {
                    const userDoc = doc(db, "users", docToDelete.id);
                    await deleteDoc(userDoc);
                    alert("User deleted successfully.");
                    setUser(null);
                    navigate("/users");
                } else {
                    setError("Document not found. Please check the employee ID.");
                }
            } catch (error) {
                setError("Failed to delete user. Please try again later.");
                console.error("Error deleting document: ", error);
            }
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!user) {
        return <div className="error">User not found.</div>;
    }

    return (
        <>
            <div className="user-details-all">
                <div className="user-details-in">
                    <div className="user-details__name"><span>Name:</span> {userName}</div>
                    <div className="user-details__contactNumber"><span>Contact Number:</span> {userContactNumber}</div>
                    <div className="user-details__age"><span>Age:</span> {userAge}</div>
                    <div className="user-details__city"><span>City:</span> {userCity}</div>
                    <div className="user-details__homeCountry"><span>Home Country:</span> {userHomeCountry}</div>
                    <div className="user-details__email"><span>Email:</span> {userEmail}</div>
                </div>
                <div className="user-details-controls">
                    <button className="user-details-controls__edit" onClick={() => setIsEditing(true)}>Edit</button>
                    <button className="user-details-controls__delete" onClick={handleDelete}>Delete</button>
                </div>
            </div>

            {isEditing && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit User Details</h2>
                        <label htmlFor="edit__name">Name:</label>
                        <input
                            id='edit__name'
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                        />
                        <label htmlFor="edit__contactNumber">Contact Number:</label>
                        <input
                            id='edit__contactNumber'
                            type="text"
                            value={editContactNumber}
                            onChange={(e) => setEditContactNumber(e.target.value)}
                        />
                        <label htmlFor="edit__age">Age:</label>
                        <input
                            id='edit__age'
                            type="text"
                            value={editAge}
                            onChange={(e) => setEditAge(e.target.value)}
                        />
                        <label htmlFor="edit__city">City:</label>
                        <input
                            id='edit__city'
                            type="text"
                            value={editCity}
                            onChange={(e) => setEditCity(e.target.value)}
                        />
                        <label htmlFor="edit__homeCountry">Home Country:</label>
                        <input
                            id='edit__homeCountry'
                            type="text"
                            value={editHomeCountry}
                            onChange={(e) => setEditHomeCountry(e.target.value)}
                        />
                        <label htmlFor="edit__email">Email:</label>
                        <input
                            id='edit__email'
                            type="email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                        />
                        <div className="modal-controls">
                            <button className="save-button" onClick={handleSave}>Save</button>
                            <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserDetails;
