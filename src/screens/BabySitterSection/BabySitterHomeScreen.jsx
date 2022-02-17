import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useContext } from "react";
import GeneralContext from "../../context/GeneralContext";
import axios from "axios";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import BabySitterParentDisplayScreen from "./BabySitterParentDisplayScreen";
import moment from "moment";
import DisplayBookingBabySitter from "../../components/DisplayBookingBabySitter";
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
  const [duplicateParents, setDuplicateParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [searchParent, setSearchParent] = useState();

  const navigate = useNavigate();

  useEffect(async () => {
    try {
      setLoading(true);
      const results = await axios.get(
        `${BACKEND_BASE_URL}/parent/api/getallparents`
      );
      console.log("results", results.data);
      setParents(results.data);
      setDuplicateParents(results.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }, []);

  const filterBySearch = () => {
    const filteredParents = duplicateParents.filter((parent) =>
      parent.name.toLowerCase().includes(searchParent.toLowerCase())
    );
    setParents(filteredParents);
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="row justify-content-center mt-5">
          Baby Sitter Home Screen
        </h1>
        <div className="col-6 col-md-4 bs">
          <input
            type="text"
            className="form-control"
            placeholder="Search Parent"
            value={searchParent}
            onChange={(e) => setSearchParent(e.target.value)}
            onKeyUp={filterBySearch}
          />
        </div>

        <div className="row justify-content-center mt-5">
          {loading ? (
            <Loader />
          ) : (
            parents.map((parent, i) => {
              return (
                <div key={i} className="col-md-9 mt-2">
                  <BabySitterParentDisplayScreen parent={parent} />
                </div>
              );
            })
          )}
        </div>
        <div
          className="col-lg-2 "
          style={{ marginTop: "207px", marginLeft: "10px" }}
        >
          <DisplayBookingBabySitter />
        </div>
      </div>
    </div>
  );
};

export default BabySitterHomeScreen;
