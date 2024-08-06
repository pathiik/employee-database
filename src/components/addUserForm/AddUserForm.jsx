import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Form validation library

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus } from "@fortawesome/free-solid-svg-icons";

import countriesData from "./countriesData.json";
import citiesData from "./citiesData.json";
import "./addUserForm.css";
import UserAddedPage from "../../pages/addUserPage/UserAddedPage";

import { useNavigate } from "react-router-dom";

const AddUserForm = () => {

    const navigate = useNavigate();

    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        setCountries(countriesData.map((country => country.name)));
        setCities(citiesData.map(city => city.name));
    }, []);

    const ValidationSchema = Yup.object({
        employeeID: Yup.number().typeError("Employee ID must be a number").required("Employee ID is required"),
        name: Yup.string().required("Name is required"),
        contactNumber: Yup.number().typeError("Contact Number must be a number"),
        age: Yup.number().typeError("Age must be a number").min(16, "Age must be at least 16").required("Age is required"),
        email: Yup.string().email("Invalid email"),
        city: Yup.string().required("Currently residing city is required"),
        homeCountry: Yup.string().required("Home country is required"),
    })

    return (
        <Formik
            initialValues={{
                employeeID: "",
                name: "",
                contactNumber: "",
                age: "",
                position: "",
                email: "",
                city: "",
                homeCountry: "",
            }}
            validationSchema={ValidationSchema}
            onSubmit={(values, { resetForm }) => {
                console.log(values);
                resetForm();
                navigate('/user-added')
            }}
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
                    </div>

                    <div className="add-user-form-input-outer-area">
                        <div className="add-user-form-input-area">
                            <label className="add-user-form-input-label">Email</label>
                            <Field className="add-user-form-input-outer-input-box" type="email" name="email" />
                            <ErrorMessage name="email" component="div" className="add-user-form-input-error" />
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

                    <button className="add-user-form-btn" type="submit"><FontAwesomeIcon icon={faUser} /> <FontAwesomeIcon icon={faPlus} /> Add User</button>

                </Form>
            )}
        </Formik>
    )
}

export default AddUserForm;