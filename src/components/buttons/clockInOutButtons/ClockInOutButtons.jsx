import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import "./clockInOutButtons.css";


const ClockInOutButtons = () => {
    return (
        <div className="clock-in-out-buttons">
            <button className='clock-btns clock-in-btn'>
                <span className="clock-button-icons"><FontAwesomeIcon icon={faClock} /> <FontAwesomeIcon icon={faPlus} /></span>
                <span className="clock-button-text">Clock In</span>
            </button>
            <button className='clock-btns clock-out-btn'>
                <span className="clock-button-icons"><FontAwesomeIcon icon={faClock} /> <FontAwesomeIcon icon={faMinus} /></span>
                <span className="clock-button-text">Clock Out</span>
            </button>
        </div>
    );
}

export default ClockInOutButtons;