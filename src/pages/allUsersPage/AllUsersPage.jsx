import React from "react";
import Header from "../../components/header/Header";
import AllUsers from "../../components/allUsers/AllUsers";
import Footer from "../../components/footer/Footer";

import "./allUsersPage.css";

const AllUsersPage = () => {
    return (
        <>
            <Header />
            <div className="container">
                <main className="all-users-page-main">
                    <div className="all-users-data">
                        <h1>All Users</h1>
                        <AllUsers />
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
}

export default AllUsersPage;
