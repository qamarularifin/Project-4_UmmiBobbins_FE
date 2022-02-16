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

// import { DatePicker } from "antd";
import Ant_DatePicker from "../../components/Antd_datePicker";  // revised datepicker

// const { RangePicker } = DatePicker;

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

  const [searchBabySitter, setSearchBabySitter] = useState();

  const navigate = useNavigate();

  useEffect(async () => {
    try {
      setLoading(true);
      const results = await axios.get(
        `${BACKEND_BASE_URL}/babysitter/api/getallbabysitters`
      );

      // console.log("results", results.data);
      setBabySitters(results.data);
      setDuplicateBabySitters(results.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }, []);

  // dont use this, will cause filtering not accurate
  // useEffect(() => {
  //   setDuplicateBabySitters(babySitters);
  // }, [babySitters]);

  const filterByDate = (dates) => {
    //setting the dates to database
    setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
    setToDate(moment(dates[1]).format("DD-MM-YYYY"));

    //////////////
    ///// Range picker to hide booked babysitter which has more than 1 booking doesnt work. So commented it out
    ////////////
    // let tempBabySitters = [];
    // for (let babySitter of duplicateBabySitters) {
    //   let availability = false;
    //   // check if theres any bookings

    //   //check if the fromdate and todate (which is dates[0] and dates[1]) does not lie between the range of currentbooking fromdate and todate

    //   for (let booking of babySitter.currentBookings) {
    //     // unable to work if choose outside of booked range but consists of booked dates
    //     // unable to hide more than 1 same booked babysitter
    //     if (babySitter.currentBookings.length > 0) {
    //       //if dates you choose not within booked dates
    //       if (
    //         !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
    //           booking.fromDate,
    //           booking.toDate
    //         ) ||
    //         !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
    //           booking.fromDate,
    //           booking.toDate
    //         )
    //       ) {
    //         //check if user entered fromdate and todate i.e, (moment(date[0]), moment(date[1])) is not equal to booked fromdate and todate from database
    //         if (
    //           moment(dates[0]).format("DD-MM-YYYY") !== booking.fromDate && //from date entered not equal booked fromdate
    //           moment(dates[0]).format("DD-MM-YYYY") !== booking.toDate && //from date entered not equal to booked todate
    //           moment(dates[1]).format("DD-MM-YYYY") !== booking.fromDate && //to date entered not equal to booked fromdate
    //           moment(dates[1]).format("DD-MM-YYYY") !== booking.toDate //to date entered not equal to booked todate
    //         ) {
    //           // if all conditions above is true, means room is available, then set availability to true
    //           availability = true;
    //         }
    //       }
    //     }
    //   }

    //   // if babysitter available or no current bookings
    //   if (availability || babySitter.currentBookings.length === 0) {
    //     tempBabySitters.push(babySitter);
    //   }
    //   console.log("temp", tempBabySitters);
    //   console.log("length", babySitter.currentBookings.length);
    //   // set the rooms with the temprooms so that those booked rooms will not appear in the rooms state
    //   // tempBabySitters is the filtered results
    //   setBabySitters(tempBabySitters);
    // }
  };

  ///////////////////////////////
  //////////// Other method but also doesnt work
  // function setFilter(values) {
  //   //dates we choose
  //   setFromDate(moment(values[0]).format("DD-MM-YYYY"));
  //   setToDate(moment(values[1]).format("DD-MM-YYYY"));
  //   // let selectedFrom = moment(values[0], "DD-MM-YYYY");
  //   // let selectedTo = moment(values[1], "DD-MM-YYYY");
  //   let temp = [];

  //   for (let babySitter of babySitters) {
  //     if (babySitter.currentBookings.length === 0) {
  //       //if no booking, show all
  //       temp.push(babySitter);
  //     } else {
  //       for (let booking of babySitter.currentBookings) {
  //         if (
  //           moment(values[0])
  //             .format("DD-MM-YYYY")
  //             .isBetween(booking.fromDate, booking.toDate) ||
  //           moment(values[1])
  //             .format("DD-MM-YYYY")
  //             .isBetween(booking.fromDate, booking.toDate) ||
  //           moment(booking.fromDate).isBetween(
  //             moment(values[0]).format("DD-MM-YYYY"),
  //             moment(values[1]).format("DD-MM-YYYY")
  //           ) ||
  //           moment(booking.toDate).isBetween(
  //             moment(values[0]).format("DD-MM-YYYY"),
  //             moment(values[1]).format("DD-MM-YYYY")
  //           )
  //         ) {
  //         } else {
  //           //if available, show
  //           temp.push(babySitter);
  //         }
  //       }
  //     }
  //   }
  //   setBabySitters(temp);
  // }
  /////////////
  /////////////

  const filterBySearch = () => {
    const filteredBabySitters = duplicateBabySitters.filter((babySitter) =>
      babySitter.name.toLowerCase().includes(searchBabySitter.toLowerCase())
    );
    setBabySitters(filteredBabySitters);
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <h1 className="row justify-content-center mt-3">Parent Home Screen</h1>
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* <div className="col justify-content-center mt-5"> */}
            <div className="col-lg-10">
              <div className="row-md-3 mt-3 bs" style={{ marginLeft: "18%" }}>
                <Ant_DatePicker 
                onChange={filterByDate}
                /> 
                {/* <RangePicker
                  // showTime={{ format: "HH" }}
                  format="DD-MM-YYYY"
                  onChange={filterByDate}
                /> */}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Baby Sitter"
                  value={searchBabySitter}
                  onChange={(e) => setSearchBabySitter(e.target.value)}
                  onKeyUp={filterBySearch}
                />
              </div>

              <div className="col-md-5"></div>
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
            <div
              className="col-lg-2 "
              style={{ marginTop: "207px", marginLeft: "-160px" }}
            >
              <DisplayBookingParent />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ParentHomeScreen;
