import React from "react";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL

const DisplayBooking = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));


    return (
    
            // <div className="col-md-9">
            // </div>
                <h2>Display Booking Column</h2>
        
    )
};

export default DisplayBooking;