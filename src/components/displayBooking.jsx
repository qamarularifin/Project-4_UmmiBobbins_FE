import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const DisplayBooking = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [bookings, setBookings] = useState([]);
  const [otherData, setOtherData] = useState([]);

  useEffect(async () => {
    try {
      setLoading(true);
      const results = await axios.post(
        `${BACKEND_BASE_URL}/booking/api/getbookingsbyuserid`,
        {
          userId: user._id,
        }
      );
      console.log("rrrr", results.data);
      setBookings(results.data.currentBookings);
      setOtherData(results.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }, []);

  console.log("bbb", bookings);
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking, i) => {
              return (
                <div className="bs" key={i}>
                  <p>Display Booking Column </p>
                  <p>Name: {otherData.name}</p>
                  <p>Date Start: {booking.fromDate}</p>
                  <p>Date End: {booking.toDate}</p>
                  <p>Transaction ID: {booking.transactionId}</p>
                  <p>Status: {booking.status}</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default DisplayBooking;
