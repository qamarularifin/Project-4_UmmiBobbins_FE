import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useContext } from "react";
import GeneralContext from "../../context/GeneralContext";
import axios from "axios";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import ParentBabySitterDisplayScreen from "./ParentBabySitterDisplayScreen";
import moment from "moment";

import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const ParentHomeScreen = (props) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const {
    quote,
    setQuote,
    tempQuote,
    setTempQuote,
    updateQuote,
    handleLogout,
  } = props;

  const { userContext } = useContext(GeneralContext);
  const [name, setName, email, setEmail, password, setPassword, role, setRole] =
    userContext;

  const [babySitters, setBabySitters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateBabySitters, setDuplicateBabySitters] = useState([]); //need [] because its a list

  const navigate = useNavigate();

  useEffect(async () => {
    try {
      setLoading(true);
      const results = await axios.get(
        `${BACKEND_BASE_URL}/babysitter/api/getallbabysitters`
      );

      console.log("results", results.data);
      setBabySitters(results.data);
      setDuplicateBabySitters(results.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }, []);

  const filterByDate = (dates) => {
    setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
    setToDate(moment(dates[1]).format("DD-MM-YYYY"));

    let tempBabySitters = [];
    let availability = false;
    for (const babySitter of duplicateBabySitters) {
      // check if theres any bookings
      if (babySitter.currentBookings.length > 0) {
        //check if the fromdate and todate (which is dates[0] and dates[1]) does not lie between the range of currentbooking fromdate and todate

        for (const booking of babySitter.currentBookings) {
          // unable to work if choose outside of booked range but consists of booked dates
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            )
          ) {
            //check if user entered fromdate and todate i.e, (moment(date[0]), moment(date[1])) is not equal to booked fromdate and todate from database
            if (
              moment(dates[0]).format("DD-MM-YYYY") !== booking.fromDate && //from date entered not equal booked fromdate
              moment(dates[0]).format("DD-MM-YYYY") !== booking.toDate && //from date entered not equal to booked todate
              moment(dates[1]).format("DD-MM-YYYY") !== booking.fromDate && //to date entered not equal to booked fromdate
              moment(dates[1]).format("DD-MM-YYYY") !== booking.toDate //to date entered not equal to booked todate
            ) {
              // if all conditions above is true, means room is available, then set availability to true
              availability = true;
            }
          }
        }
      }
      // if babysitter available or no current bookings
      if (availability === true || babySitter.currentBookings.length === 0) {
        tempBabySitters.push(babySitter);
      }
      // set the rooms with the temprooms so that those booked rooms will not appear in the rooms state
      setBabySitters(tempBabySitters);
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <h1 className="row justify-content-center mt-1">Parent Home Screen</h1>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="col-md-3 mt-3 bs" style={{ marginLeft: "18%" }}>
              <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
            </div>
            <div className="row justify-content-center mt-5">
              {babySitters.map((babySitter, i) => {
                return (
                  <div key={i} className="col-md-8 mt-2">
                    <ParentBabySitterDisplayScreen
                      babySitter={babySitter}
                      fromDate={fromDate}
                      toDate={toDate}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ParentHomeScreen;
