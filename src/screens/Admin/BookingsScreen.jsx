import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Tag, Divider } from "antd";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const BookingsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(async () => {
    try {
      const results = await axios.get(
        `${BACKEND_BASE_URL}/booking/api/getallbookings`
      );
      console.log(results.data);
      setBookings(results.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  }, []);

  const deleteBooking = async (bookingId, parentId, babySitterId) => {
    await axios.post(`${BACKEND_BASE_URL}/booking/api/deletebooking`, {
      bookingId,
      parentId,
      babySitterId,
    });

    window.location.reload();
  };

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
    <div className="row table-responsive">
      <div className="col-md-12">
        {loading && <Loader />}
        <table className="table table-bordered bs">
          <thead className="bs">
            <tr>
              <th>Booking ID</th>
              <th>Parent ID</th>
              <th>Parent Name</th>
              <th>Baby Sitter ID</th>
              <th>Baby Sitter Name</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Total Amount</th>
              <th>Total Days</th>
              <th>Transaction ID</th>
              <th>Booking Status</th>
              <th>Cancel Booking</th>
              <th>Delete Booking</th>
            </tr>
          </thead>
          <tbody>
            {bookings &&
              bookings.map((booking, i) => {
                return (
                  <tr key={i}>
                    <td>{booking._id}</td>
                    <td>{booking.parentId}</td>
                    <td>{booking.parentName}</td>
                    <td>{booking.babySitterId}</td>
                    <td>{booking.babySitterName}</td>
                    <td>{booking.fromDate}</td>
                    <td>{booking.toDate}</td>
                    <td>{booking.totalAmount}</td>
                    <td>{booking.totalDays}</td>
                    <td>{booking.transactionId}</td>
                    <td>
                      {booking.status === "pending" ? (
                        <Tag color="orange">Pending</Tag>
                      ) : booking.status === "confirmed" ? (
                        <Tag color="green">Confirmed</Tag>
                      ) : (
                        <Tag color="red">Cancelled</Tag>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => cancelBooking(booking._id)}
                      >
                        Cancel
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          deleteBooking(
                            booking._id,
                            booking.parentId,
                            booking.babySitterId
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsScreen;
