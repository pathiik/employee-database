import React from "react";
import { Link } from "react-router-dom";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import './error404Page.css';

const PageNotFound = () => {
    return (
        <>
            <Header />
            <div className="container">
                <main className="error404-page-main">
                    <h1>Error 404</h1>
                    <h2>Page Not Found</h2>
                    <p>Sorry, the page you are looking for does not exist.</p>
                    <Link className="error404-homepage-btn" to="/">Go to Home Page</Link>
                </main>
            </div>
            <Footer />
        </>
    );
}

export default PageNotFound;
