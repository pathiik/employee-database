import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";


const UserAddedPage = () => {
    return (
        <>
            <Header />
            <div className="container">
                <h1>User Added</h1>
                <h2>User has been added to the database.</h2>
                <Link className="homepage-btn" to="/">Go to Home Page</Link>
            </div>
            <Footer />
        </>
    );
}

export default UserAddedPage;