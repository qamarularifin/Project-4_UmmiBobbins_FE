import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const BookingsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

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

  return (
    <div className="row">
      <div className="col-md-12">
        {loading && <Loader />}
        <table className="table table-bordered">
          <thead className="bs">
            <tr>
              <th>Booking ID</th>
              <th>Parent ID</th>
              <th>Baby Sitter ID</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Total Amount</th>
              <th>Total Days</th>
              <th>Transaction ID</th>
              <th>Booking Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings &&
              bookings.map((booking, i) => {
                return (
                  <tr key={i}>
                    <td>{booking._id}</td>
                    <td>{booking.parentId}</td>
                    <td>{booking.babySitterId}</td>
                    <td>{booking.fromDate}</td>
                    <td>{booking.toDate}</td>
                    <td>{booking.totalAmount}</td>
                    <td>{booking.totalDays}</td>
                    <td>{booking.transactionId}</td>
                    <td>{booking.status ? "Confirmed" : "Not confirmed"}</td>
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
