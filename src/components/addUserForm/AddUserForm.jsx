import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Form validation library

import { auth, db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus } from "@fortawesome/free-solid-svg-icons";

import countriesData from "./countriesData.json";
import citiesData from "./citiesData.json";
import "./addUserForm.css";

import { useNavigate } from "react-router-dom";

// Importing Firestore functions
import { getDocs, query, where, collection } from "firebase/firestore";

const AddUserForm = () => {
    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setCountries(countriesData.map((country => country.name)));
        setCities(citiesData.map(city => city.name));
    }, []);

    const ValidationSchema = Yup.object({
        employeeID: Yup.number().typeError("Employee ID must be a number").required("Employee ID is required"),
        name: Yup.string().required("Name is required"),
        contactNumber: Yup.number().typeError("Contact Number must be a number"),
        age: Yup.number().typeError("Age must be a number").min(16, "Age must be at least 16").required("Age is required"),
        city: Yup.string().required("Currently residing city is required"),
        homeCountry: Yup.string().required("Home country is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Validation code is required")
    });

    const handleSubmit = async (values, { resetForm }) => {
        const { email, password, employeeID, contactNumber, ...userData } = values;

        // Checking if the validation code is correct
        if (password !== import.meta.env.VITE_USER_ADD_VALIDATION_CODE) {
            alert("Invalid validation code. Please enter the correct code.");
            return;
        }

        try {
            // Checking for existing user with the same email
            const emailQuery = query(collection(db, "users"), where("email", "==", email));
            const emailSnapshot = await getDocs(emailQuery);
            if (!emailSnapshot.empty) {
                alert("Email is already in use.");
                return;
            }

            // Checking for existing user with the same employeeID
            const idQuery = query(collection(db, "users"), where("employeeID", "==", employeeID));
            const idSnapshot = await getDocs(idQuery);
            if (!idSnapshot.empty) {
                alert("Employee ID is already in use.");
                return;
            }

            // Checking for existing user with the same contact number
            const contactQuery = query(collection(db, "users"), where("contactNumber", "==", contactNumber));
            const contactSnapshot = await getDocs(contactQuery);
            if (!contactSnapshot.empty) {
                alert("Contact number is already in use.");
                return;
            }

            // Creating user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Adding user data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                ...userData,
                email: user.email,
                uid: user.uid,
                employeeID: employeeID,
                contactNumber: contactNumber
            });

            // Mapping employee ID to email
            await setDoc(doc(db, "IDtoEmail", employeeID), {
                email: user.email
            });

            console.log("User added successfully");
            resetForm();
            navigate('/user-added');
        } catch (error) {
            console.error("Error adding user: ", error);
        }
    };


    return (
        <Formik
            initialValues={{
                employeeID: "",
                name: "",
                contactNumber: "",
                age: "",
                city: "",
                homeCountry: "",
                email: "",
                password: ""
            }}
            validationSchema={ValidationSchema}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form action="POST" className="add-user-form">

                    <div className="add-user-form-input-area">
                        <label className="add-user-form-input-label">Employee ID</label>
                        <Field className="add-user-form-input-box" type="text" name="employeeID" />
                        <ErrorMessage name="employeeID" component="div" className="add-user-form-input-error" />
                    </div>

                    <div className="add-user-form-input-area">
                        <label className="add-user-form-input-label">Name</label>
                        <Field className="add-user-form-input-box" type="text" name="name" />
                        <ErrorMessage name="name" component="div" className="add-user-form-input-error" />
                    </div>

                    <div className="add-user-form-input-outer-area">
                        <div className="add-user-form-input-area">
                            <label className="add-user-form-input-label">Contact Number</label>
                            <Field className="add-user-form-input-outer-input-box" type="text" name="contactNumber" />
                            <ErrorMessage name="contactNumber" component="div" className="add-user-form-input-error" />
                        </div>

                        <div className="add-user-form-input-area">
                            <label className="add-user-form-input-label">Age</label>
                            <Field className="add-user-form-input-outer-input-box" type="text" name="age" />
                            <ErrorMessage name="age" component="div" className="add-user-form-input-error" />
                        </div>
                    </div>

                    <div className="add-user-form-input-outer-area">

                        <div className="add-user-form-input-area">
                            <label className="add-user-form-input-label">Currently Residing City</label>
                            <Field className="add-user-form-input-outer-input-box" as="select" name="city">
                                <option value="">Select City</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="city" component="div" className="add-user-form-input-error" />
                        </div>

                        <div className="add-user-form-input-area">
                            <label className="add-user-form-input-label">Home Country</label>
                            <Field className="add-user-form-input-outer-input-box" as="select" name="homeCountry">
                                <option value="">Select Country</option>
                                {countries.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="homeCountry" component="div" className="add-user-form-input-error" />
                        </div>
                    </div>

                    <div className="add-user-form-input-outer-area">
                        <div className="add-user-form-input-area">
                            <label className="add-user-form-input-label">Email</label>
                            <Field className="add-user-form-input-outer-input-box" type="email" name="email" />
                            <ErrorMessage name="email" component="div" className="add-user-form-input-error" />
                        </div>

                        <div className="add-user-form-input-area">
                            <label className="add-user-form-input-label">Validation Code</label>
                            <Field className="add-user-form-input-outer-input-box" type="password" name="password" />
                            <ErrorMessage name="password" component="div" className="add-user-form-input-error" />
                        </div>
                    </div>

                    <button className="add-user-form-btn" type="submit"><FontAwesomeIcon icon={faUser} /> <FontAwesomeIcon icon={faPlus} /> Add User</button>

                </Form>
            )}
        </Formik>
    );
}

export default AddUserForm;
