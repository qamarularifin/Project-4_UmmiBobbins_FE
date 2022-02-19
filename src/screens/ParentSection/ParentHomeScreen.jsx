import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useContext } from "react";
import GeneralContext from "../../context/GeneralContext";
import axios from "axios";
import Loader from "../../components/Loader";
// import Error from "../../components/Error";
import ParentBabySitterDisplayScreen from "./ParentBabySitterDisplayScreen";
import moment from "moment";
import DisplayBookingParent from "../../components/DisplayBookingParent";
import Ant_DatePicker from "../../components/Antd_datePicker"; // revised datepicker
import MyMap from "../../components/Map";


const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const ParentHomeScreen = (props) => {
  // const user = JSON.parse(localStorage.getItem("currentUser"));

  // const {
  //   quote,
  //   setQuote,
  //   tempQuote,
  //   setTempQuote,
  //   updateQuote,
  //   handleLogout,
  // } = props;

  const { userContext } = useContext(GeneralContext);
  const [name, setName, email, setEmail, password, setPassword, role, setRole] =
    userContext;

  const [babySitters, setBabySitters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateBabySitters, setDuplicateBabySitters] = useState([]); //need [] because its a list
  const [searchFlag, setSearchFlag] = useState(false);

  const [searchBabySitter, setSearchBabySitter] = useState();

  // const navigate = useNavigate();

  const getAllSitters = async () => {
    setLoading(true);
    await axios
      .get(`${BACKEND_BASE_URL}/babysitter/api/getallbabysitters`)
      .then((res) => {
        if (res.status === 200) {
          setBabySitters(res.data);
          setDuplicateBabySitters(res.data);
          setLoading(false);
        } else {
          console.log(error);
          setLoading(false);
        }
      });
  };
  useEffect(() => {
    getAllSitters();
  }, [fromDate]); // re-render filter results when from date filter state has changed

  const filterBySearch = () => {
    const filteredBabySitters = duplicateBabySitters.filter((babySitter) =>
      babySitter.name.toLowerCase().includes(searchBabySitter.toLowerCase())
    );
    setBabySitters(filteredBabySitters);
  };

  const handleCallback = (pickerData) => {
    setFromDate(pickerData[0]);
    setToDate(pickerData[1]);
    setSearchFlag(true);
  };

  const RenderSearchTerms = () => {
    const from = fromDate;
    const to = toDate;
    return (
      <div><p>Showing availablity for {from} to {to}</p></div>
    );
  };

  const renderBbSitters = babySitters.map((babySitter, i) => {
    let preventRender = false;
    babySitter.currentBookings.map((booking, j) => {  // to check individual sitter booking array
      const bookingFrom = moment(
        booking.fromDate
      );
      const bookingTo = moment(
        booking.toDate,
        "DD-MM-YYYY",
        true
      ).format();
      if (
        (bookingFrom._i >= fromDate && bookingFrom._i <= toDate) || 
        (bookingTo._i >= fromDate && bookingTo._i <= toDate)
      ) {
        preventRender = true;  // this sets the preventRender flag to not render current sitter in iteration
      } else {
        // console.log("No Clash");
      }
    })
    if (!preventRender)
    return (
      <div className="row justify-content-center mt-5">
        <div key={i} className="col-md-8 mt-2">
          <ParentBabySitterDisplayScreen
            babySitter={babySitter}
            fromDate={fromDate}
            toDate={toDate}
          />
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row mt-5">
        <h1 className="row justify-content-center mt-3">Parent Home Screen</h1>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="col-lg-10">
              <div className="row-md-3 mt-3 bs" style={{ marginLeft: "18%" }}>
                <Ant_DatePicker parentCallback={handleCallback} />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Baby Sitter"
                  value={searchBabySitter}
                  onChange={(e) => setSearchBabySitter(e.target.value)}
                  onKeyUp={filterBySearch}
                />
              </div>
              <div>
                Search results: {searchFlag ? <RenderSearchTerms /> : <p>all</p>}
              </div>

              <div className="col-md-5"></div>
              <div>{renderBbSitters}</div>
            </div>
            <div
              className="col-lg-2 "
              style={{ marginTop: "207px", marginLeft: "-160px" }}
            >
              <DisplayBookingParent />
            </div>
            <div 
              id="map"
              style={{ height: "180px" }}>
              <MyMap />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ParentHomeScreen;