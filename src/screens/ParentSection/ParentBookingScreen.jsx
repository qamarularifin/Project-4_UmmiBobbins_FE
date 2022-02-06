import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import moment from "moment";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const ParentBookingScreen = () => {
  const { babysitterid } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [babySitter, setBabySitter] = useState();
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
      console.log("results", results.data);
      setBabySitter(results.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }, []);

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
