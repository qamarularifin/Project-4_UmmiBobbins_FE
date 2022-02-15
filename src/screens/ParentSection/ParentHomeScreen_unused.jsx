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
import DisplayBookingParent from "../../components/DisplayBookingParent";

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

      const res = await axios.get(
        `${BACKEND_BASE_URL}/booking/api/getallbookings`
      );

      console.log("results", results.data);
      setBabySitters(results.data);
      setDuplicateBabySitters(res.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }, []);

  const filterByDate = (dates) => {
    //setting the dates to database
    setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
    setToDate(moment(dates[1]).format("DD-MM-YYYY"));

    let tempFromDate = [];
    let tempToDate = [];

    for (let babySitter of duplicateBabySitters) {
      tempFromDate.push(babySitter.fromDate);
      tempToDate.push(babySitter.toDate);
    }
    console.log("fromdate", fromDate);
    console.log("todate", toDate);
    console.log("tempfromdate", tempFromDate);
    console.log("temptodate", tempToDate);

    if (tempFromDate.includes(fromDate) && tempToDate.includes(toDate)) {
      console.log("yay");
    } else {
      console.log("Nay");
    }

    // setBabySitters(filteredData);
  };

  ///////////////////////////////
  //////////// Other method but also doesnt work
  // function setFilter(dates) {
  //   //dates we choose
  //   // var selectedFrom = moment(dates[0]).format("DD-MM-YYYY");
  //   // var selectedTo = moment(dates[1]).format("DD-MM-YYYY");

  //   setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
  //   setToDate(moment(dates[1]).format("DD-MM-YYYY"));

  //   var temp = [];

  //   for (var babySitter of babySitters) {
  //     if (babySitter.currentBookings.length === 0) {
  //       temp.push(babySitter);
  //     } else {
  //       for (var booking of babySitter.currentBookings) {
  //         if (
  //           fromDate.isBetween(booking.fromDate, booking.toDate) ||
  //           toDate.isBetween(booking.fromDate, booking.toDate) ||
  //           moment(booking.fromDate).isBetween(fromDate, toDate) ||
  //           moment(booking.toDate).isBetween(fromDate, toDate)
  //         ) {
  //           setDuplicateBabySitters(temp);
  //         } else {
  //           temp.push(babySitter);
  //         }
  //       }
  //     }
  //   }
  // }
  /////////////
  /////////////

  return (
    <div className="container">
      <div className="row mt-5">
        <h1 className="row justify-content-center mt-1">Parent Home Screen</h1>
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* <div className="col justify-content-center mt-5"> */}
            <div className="col-lg-10">
              <div className="row-md-3 mt-3 bs" style={{ marginLeft: "18%" }}>
                <RangePicker
                  // showTime={{ format: "HH" }}
                  format="DD-MM-YYYY"
                  onChange={filterByDate}
                />
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
            </div>
            <div className="col-lg-2">
              <DisplayBookingParent />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ParentHomeScreen;
