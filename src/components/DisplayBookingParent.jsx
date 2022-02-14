import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";
import { Tabs } from "antd";
import { Tag, Divider } from "antd";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const DisplayBooking = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [bookings, setBookings] = useState([]);

  useEffect(async () => {
    try {
      setLoading(true);
      const results = await axios.post(
        `${BACKEND_BASE_URL}/booking/api/getparentbookingsbyuserid`,
        {
          userId: user._id,
        }
      );

      setBookings(results.data.currentBookings);

      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }, []);

  return (
    <>
      <div className="row bs">
        <div className="col-md-6">
          {loading && <Loader />}
          <p>Display Booking Column </p>
          {bookings &&
            bookings.map((booking, i) => {
              return (
                <div className="bs" key={i}>
                  <p>Name: {booking.babySitterName}</p>
                  <p>Date Start: {booking.fromDate}</p>
                  <p>Date End: {booking.toDate}</p>
                  <p>Transaction ID: {booking.transactionId}</p>
                  <p>
                    Status:{" "}
                    {booking.status === "pending" ? (
                      <Tag color="red">Pending</Tag>
                    ) : (
                      <Tag color="green">Confirmed</Tag>
                    )}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default DisplayBooking;
