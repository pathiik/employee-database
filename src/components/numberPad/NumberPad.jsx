import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

import "./numberPad.css";

const NumberPad = ({ onClick }) => {
    const [number, setNumber] = useState("");

    const handleNumberClick = (num) => {
        setNumber(prevNumber => prevNumber + num);
    };

    const handleClear = () => {
        setNumber("");
    };

    const handleDelete = () => {
        setNumber(prevNumber => prevNumber.slice(0, -1));
    };

    const handleSubmit = () => {
        if (onClick) {
            onClick(number);
        }
        setNumber("");
    };

    return (
        <section className="number-pad-section">
            <div className="number-input-area">
                <input className="number-input-box" type="text" readOnly value={number} />
            </div>
            <div className="number-pad-buttons-area">
                <div className="number-pad-buttons">
                    {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map(num => (
                        <button className="number-btn" key={num} onClick={() => handleNumberClick(num.toString())}>{num}</button>
                    ))}
                </div>
                <div className="number-pad-function-buttons">
                    <button className="function-btn" onClick={handleDelete}><FontAwesomeIcon icon={faCircleXmark} /></button>
                    <button className="function-btn" id="number-pad-delete-btn" onClick={handleClear}>Delete</button>
                    <button className="function-btn" id="number-pad-submit-btn" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </section>
    );
}

export default NumberPad;
