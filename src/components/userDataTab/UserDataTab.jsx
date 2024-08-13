import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./userDataTab.css";

const UserDataTab = ({ name, employeeID, email, contactNumber }) => {
    return (
        <div className="user-data-tab">
            <div className="user-data-info">
                <div className="user-data-info-left">
                    <FontAwesomeIcon className="user-data-info-icon" icon={faUser} />
                    <div className="user-data-info-mid-details user-data-info-mid-id">
                        <p><strong>{employeeID}</strong></p>
                    </div>
                </div>
                <div className="user-data-info-mid">
                    
                    <div className="user-data-info-mid-details user-data-info-mid-name">
                        <p className="faded-text">Name</p>
                        <p>{name}</p>
                    </div>
                    <div className="user-data-info-mid-details user-data-info-mid-email">
                        <p className="faded-text">Email</p>
                        <p>{email}</p>
                    </div>
                    <div className="user-data-info-mid-details user-data-info-mid-contact">
                        <p className="faded-text">Contact Number</p>
                        <p>{contactNumber}</p>
                    </div>
                </div>

                {/* TODO: Link to user profile page */}
                <div className="user-data-info-right" title={`User ${employeeID}`}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </div>
            </div>

        </div>
    );
}

export default UserDataTab;
