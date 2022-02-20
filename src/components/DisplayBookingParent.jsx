import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";
import { Tabs } from "antd";
import { Tag, Divider } from "antd";
import Swal from "sweetalert2";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const DisplayBookingParent = () => {
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

  const cancelBooking = async (bookingId) => {
    try {
      setLoading(true);
      await axios.post(`${BACKEND_BASE_URL}/booking/api/cancelbooking`, {
        bookingId: bookingId,
      });
      setLoading(false);
      Swal.fire(
        "Congratulations!",
        "Booking cancelled successfully",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("Oops", "Cancelled failed", "error");
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6" style={{ width: "100%" }}>
          {loading && <Loader />}
          <b>Display Booking Column </b>
          {bookings &&
            bookings.map((booking, i) => {
              return (
                <div className="bs" key={i}>
                  <p>Name: {booking.babySitterName}</p>
                  <p>Date Start: {booking.fromDate}</p>
                  <p>Date End: {booking.toDate}</p>
                  <p>Transaction ID: {booking.transactionId}</p>
                  <p>booking id: {booking._id}</p>

                  <p>
                    Status:
                    {booking.status === "pending" ? (
                      <Tag color="orange" className="ml-2">
                        Pending
                      </Tag>
                    ) : booking.status === "confirmed" ? (
                      <Tag color="green" className="ml-2">
                        Confirmed
                      </Tag>
                    ) : (
                      <Tag color="red" className="ml-2">
                        Cancelled
                      </Tag>
                    )}
                  </p>
                  <div>
                    {booking.status === "confirmed" && (
                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={() => cancelBooking(booking._id)}
                        >
                          Cancel Booking
                        </button>
                      </div>
                    )}
                    {booking.status === "cancelled" && (
                      <p>Please contact 64589232 for immediately refund.</p>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default DisplayBookingParent;
