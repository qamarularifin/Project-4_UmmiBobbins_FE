import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import moment from "moment";
import Swal from "sweetalert2";
import StripeCheckout from "react-stripe-checkout";

import { useNavigate } from "react-router-dom";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const ParentBookingScreen = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const { babysittername, babysitterid, fromdate, todate } = useParams(); //lowercase fromdate and todate is correct
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [babySitter, setBabySitter] = useState();
  const [totalAmount, setTotalAmount] = useState();

  const [parentName, setParentName] = useState("");

  // useParams for the dates //  use moment to calculate no. of days
  const formattedFromDate = moment(fromdate, "DD-MM-YYYY"); //formatted needed for .diff function
  const formattedToDate = moment(todate, "DD-MM-YYYY"); //formatted needed for .diff function

  const totalDays =
    moment.duration(formattedToDate.diff(formattedFromDate)).asDays() + 1;

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

      /////////
      /////////
      //get parentname by user id
      const parentName = await axios.post(
        `${BACKEND_BASE_URL}/parent/api/getparentbyuserid`,
        { userId: user._id }
      );
      setParentName(parentName.data.name);

      /////////
      //////////

      setTotalAmount(totalDays * results.data.ratePerDay);
      setBabySitter(results.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }, []);

  //if dont want to use stripe, remove the token
  const bookBabySitter = async (token) => {
    // if slots already booked, will trigger error
    for (let baby of babySitter.currentBookings) {
      if (
        (baby.fromDate <= fromdate && fromdate <= baby.toDate) ||
        (baby.fromDate <= todate && todate <= baby.toDate)

        // moment(fromdate).isBetween(baby.fromDate, baby.toDate, "[)")
        // moment(todate).isBetween(baby.fromDate, baby.toDate, "()")
      ) {
        return Swal.fire(
          "Oops!",
          "Someone has book this timeslot!",
          "error"
        ).then((result) => {
          navigate("/dashboard");
        });
      }
    }

    const bookingDetails = {
      parentUserId: JSON.parse(localStorage.getItem("currentUser"))._id, //need to be parentid and not current parent user id
      babySitterId: babysitterid, //right side is real stringified object id
      parentName: parentName,
      babySitterName: babysittername,
      fromDate: formattedFromDate,
      toDate: formattedToDate,
      totalAmount: totalAmount,
      totalDays: totalDays,
      token,
    };
    try {
      setLoading(true);
      const results = await axios.post(
        `${BACKEND_BASE_URL}/booking/api/bookbabysitter`,
        bookingDetails
      );
      localStorage.setItem("currentBookings", JSON.stringify(results.data)); //this stores currentbookings in the localstorage
      setLoading(false);
      Swal.fire(
        "Congratulations!",
        "Your booking is successful",
        "success"
      ).then((result) => {
        navigate("/dashboard");
      });
      console.log(results.data);
    } catch (error) {
      console.log(error);
      Swal.fire("Oops!", "Something went wrong", "error").then((result) => {
        navigate("/dashboard");
      });
    }
  };

  const returnHome = () => {
    navigate("/dashboard");
  };

  return (
    <div className="row justify-content-center mt-5">
      <h1 className="row justify-content-center mt-5">Parent Booking Screen</h1>
      {loading ? (
        <Loader />
      ) : babySitter ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-9">
              <img src={babySitter.image} className="bigimg" />
              <p className="mt-3">Name: {babySitter.name}</p>
              <p>Location: {babySitter.location}</p>
              <p>Rate Per Day: $ {babySitter.ratePerDay}</p>
              <p>Description: {babySitter.description}</p>
              <p>
                Dates to book: {fromdate} to {todate}
              </p>
              <p>Total Amount: $ {totalAmount}</p>
              {/* if dont want to use stripe, replace StripeCheckout with div an uncomment button onclick */}

              <StripeCheckout
                amount={totalAmount * 100}
                token={bookBabySitter}
                currency="SGD"
                stripeKey="pk_test_51KQT8BIuVbRoacy6ZqPWF6H2vLwTn4ilOP93aQrGOYRFph9pLOtsdvr3Se3ZNJoikICNXhmcp6PM4h64YYO69ibi00XZUjL2Tv"
              >
                <button
                  className="btn btn-primary"
                  style={{ float: "right" }}
                  // onClick={bookBabySitter}
                >
                  Proceed to book
                </button>
              </StripeCheckout>

              <button
                className="btn btn-primary mr-3"
                style={{ float: "right" }}
                onClick={returnHome}
              >
                Return to Homepage
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
