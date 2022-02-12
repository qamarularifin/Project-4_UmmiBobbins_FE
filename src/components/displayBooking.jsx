import React from "react";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL

const DisplayBooking = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));


    return (
    
            <div>
                <p>Display Booking Column</p>
                <p>Name</p>
                <p>Date Start</p>
                <p>Date End</p>
                <p>Transaction ID</p>
                <p>Status</p>
            </div>

        
    )
};
                                                                                                                                                                                                                                                                               
export default DisplayBooking;