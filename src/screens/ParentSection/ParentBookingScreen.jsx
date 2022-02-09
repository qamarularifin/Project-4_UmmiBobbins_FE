import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import moment from "moment";
// import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const ParentBookingScreen = () => {
  const navigate = useNavigate();
  const { babysitterid, fromtime, totime } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [babySitter, setBabySitter] = useState();
  const [totalAmount, setTotalAmount] = useState();

  // useParams for the dates //  use moment to calculate no. of days
  const formattedFromTime = moment(fromtime, "DD-MM-YYYY");
  const formattedToTime = moment(totime, "DD-MM-YYYY");
  const totalTime =
    moment.duration(formattedToTime.diff(formattedFromTime)).asDays() + 1;

  // send data from frontend to backend with post method //right roomid is from front end and send to left roomid backend to retrieve the specific room individual data
  //!!! this is important to get the id complete object of individual room
  useEffect(async () => {
    try {
      setLoading(true);
      const results = await axios.post(
        `${BACKEND_BASE_URL}/babysitter/api/getbabysitterbyid`,
        {
          id: babysitterid,
        }
      );
      console.log("results", results.data.ratePerHour);
      setTotalAmount(totalTime * results.data.ratePerHour);
      setBabySitter(results.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }, []);

  const bookBabySitter = async () => {
    const bookingDetails = {
      parentUserId: JSON.parse(localStorage.getItem("currentUser"))._id,
      babySitterId: babysitterid,
      fromTime: formattedFromTime,
      toTime: formattedToTime,
      totalAmount: totalAmount,
      totalTime: totalTime,
    };
    try {
      const results = await axios.post(
        `${BACKEND_BASE_URL}/booking/api/bookbabysitter`,
        bookingDetails
      );
      console.log(results.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-5">
      <h1 className="row justify-content-center mt-5">Parent Booking Screen</h1>
      {loading ? (
        <Loader />
      ) : babySitter ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-9">
              <img src={babySitter.image} className="bigimg" />
              <p>Name: {babySitter.name}</p>
              <p>Location: {babySitter.location}</p>
              <p>Rate Per Hour: $ {babySitter.ratePerHour}</p>
              <button
                className="btn btn-primary"
                style={{ float: "right" }}
                onClick={bookBabySitter}
              >
                Proceed to book
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Error message="Booking data error" />
      )}
    </div>
  );
};

export default ParentBookingScreen;
