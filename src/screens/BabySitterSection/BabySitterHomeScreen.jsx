import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useContext } from "react";
import GeneralContext from "../../context/GeneralContext";
import axios from "axios";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import BabySitterParentDetailScreen from "./BabySitterParentDetailScreen";
import moment from "moment";
// import "antd/dist/antd.css";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const BabySitterHomeScreen = (props) => {
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

  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const navigate = useNavigate();

  useEffect(async () => {
    try {
      setLoading(true);
      const results = await axios.get(`${BACKEND_BASE_URL}/parent/api/`);
      console.log("results", results.data);
      setParents(results.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }, []);

  return (
    <div className="container">
      <h1>Baby Sitter Home Screen</h1>
      <div className="row mt-5">
        <div className="row justify-content-center mt-5">
          {loading ? (
            <Loader />
          ) : parents.length > 1 ? (
            parents.map((parent, i) => {
              return (
                <div key={i} className="col-md-9 mt-2">
                  <BabySitterParentDetailScreen parent={parent} />
                </div>
              );
            })
          ) : (
            <Error message="No Parents found!" />
          )}
        </div>
      </div>
    </div>
  );
};

export default BabySitterHomeScreen;
