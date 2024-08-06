import React from "react";
import { useState, useEffect } from 'react';
import './footer.css';


const Footer = () => {

    const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    const [date, setDate] = useState(new Date().toLocaleDateString());

    useEffect(() => {
        var timer = setInterval(() => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })), 1000);
        var dateTimer = setInterval(() => setDate(new Date().toLocaleDateString()), 1000);
        return function cleanup() {
            clearInterval(timer);
            clearInterval(dateTimer);
        }
    })

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-in">
                    <div className="footer-in-title">
                        <h4>&copy; 2024 Employee Database</h4>
                    </div>
                    <div className="footer-in-info">
                        <p>{date}</p>
                        <p>{time}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;