import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useContext } from "react";
import GeneralContext from "../../context/GeneralContext";
import axios from "axios";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import ParentBabySitterDetailScreen from "./ParentBabySitterDetailScreen";
import moment from "moment";
// import "antd/dist/antd.css";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

// import Logout from "../Logout"

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const navigate = useNavigate();

  useEffect(async () => {
    try {
      setLoading(true);
      const results = await axios.get(`${BACKEND_BASE_URL}/babysitter/api/`);
      console.log("results", results.data);
      setBabySitters(results.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }, []);

  return (
    <div className="container">
      <h1>Parent Home Screen</h1>
      <div className="row mt-5">
        <div className="row justify-content-center mt-5">
          {loading ? (
            <Loader />
          ) : babySitters.length > 1 ? (
            babySitters.map((babySitter, i) => {
              return (
                <div key={i} className="col-md-9 mt-2">
                  <ParentBabySitterDetailScreen babySitter={babySitter} />
                </div>
              );
            })
          ) : (
            <Error message="No Babysitter found!" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentHomeScreen;
