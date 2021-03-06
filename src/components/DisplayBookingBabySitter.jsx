import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";
import { Tabs } from "antd";
import { Tag, Divider } from "antd";
import Swal from "sweetalert2";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const DisplayBookingBabySitter = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [bookings, setBookings] = useState([]);

  //use effect with mount and unmount to prevent memory leak
  useEffect(() => {
    let componentMounted = true;
    const fetchData = async () => {
      const results = await axios.post(
        `${BACKEND_BASE_URL}/booking/api/getbabysitterbookingsbyuserid`,
        { userId: user._id }
      );
      if (componentMounted) {
        setBookings(results.data.currentBookings);
      }
    };
    try {
      setLoading(true);
      fetchData();
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }

    return () => {
      componentMounted = false;
    };
  }, []);

  // not using as only have cancelled and confirmed
  // const confirmBooking = async (bookingId) => {
  //   try {
  //     setLoading(true);
  //     await axios.post(`${BACKEND_BASE_URL}/booking/api/confirmbooking`, {
  //       bookingId: bookingId,
  //     });
  //     setLoading(false);
  //     Swal.fire("Congratulations!", "Booking is confirmed", "success").then(
  //       (result) => {
  //         window.location.reload();
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //     Swal.fire("Oops", "Confirmation failed", "error");
  //   }
  // };

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
                <div key={i} className="cs">
                  <p>Name: {booking.parentName}</p>
                  <p>Date Start: {booking.fromDate}</p>
                  <p>Date End: {booking.toDate}</p>
                  {/* <p>Booking ID: {booking._id}</p> */}
                  <p>Transaction ID: {booking.transactionId}</p>
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
                    {/* {booking.status === "pending" && (
                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={() => confirmBooking(booking._id)}
                        >
                          Confirm Booking
                        </button>
                      </div>
                    )} */}
                    <br />
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
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default DisplayBookingBabySitter;
