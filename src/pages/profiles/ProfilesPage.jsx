import React from "react";
import { Link } from "react-router-dom";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUser, faPlus } from "@fortawesome/free-solid-svg-icons";

import './profilesPage.css';

const ProfilesPage = () => {
    return (
        <>
            <Header />
            <main className="profiles-page-main">
                <section className="profiles-buttons-section">
                    <Link className="profiles-page-btn" to="/users">
                        <span className="profile-page-btn-icon"><FontAwesomeIcon icon={faUsers} /></span>
                        <span className="profile-page-btn-text">See All Users</span>
                    </Link>
                    <Link className="profiles-page-btn" to="/add-user">
                        <span className="profile-page-btn-icon"><FontAwesomeIcon icon={faUser} /> <FontAwesomeIcon icon={faPlus} /></span>
                        <span className="profile-page-btn-text">Add User</span>
                    </Link>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default ProfilesPage;