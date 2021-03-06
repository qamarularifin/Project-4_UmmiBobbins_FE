import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import axios from "axios";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import BabySitterParentDisplayScreen from "./BabySitterParentDisplayScreen";
import moment from "moment";
import DisplayBookingBabySitter from "../../components/DisplayBookingBabySitter";
import MyMap from "../../components/Map";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const BabySitterHomeScreen = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [parents, setParents] = useState([]);
  const [duplicateParents, setDuplicateParents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [searchParent, setSearchParent] = useState();

  const navigate = useNavigate();

  //use effect with mount and unmount to prevent memory leak
  useEffect(() => {
    let componentMounted = true;
    const fetchData = async () => {
      const results = await axios.get(
        `${BACKEND_BASE_URL}/parent/api/getallparents`
      );
      if (componentMounted) {
        setParents(results.data);
        setDuplicateParents(results.data);
      }
    };
    try {
      setLoading(true);
      fetchData();
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }

    return () => {
      componentMounted = false;
    };
  }, []);

  const filterBySearch = () => {
    const filteredParents = duplicateParents.filter((parent) =>
      parent.name.toLowerCase().includes(searchParent.toLowerCase())
    );
    setParents(filteredParents);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h1 className="row justify-content-center mt-5">
          Baby Sitter Home Screen
        </h1>
        <div className="row justify-content-center mt-5 bs">
          <input
            type="text"
            className="form-control"
            placeholder="Search Parent"
            value={searchParent}
            onChange={(e) => setSearchParent(e.target.value)}
            onKeyUp={filterBySearch}
          />
        </div>

        <div className="col justify-content-center mt-5 bs">
          <b>Display Parents</b>
          {loading ? (
            <Loader />
          ) : (
            parents.map((parent, i) => {
              return (
                <div key={i} className="col justify-content-center">
                  <BabySitterParentDisplayScreen parent={parent} />
                </div>
              );
            })
          )}
        </div>
        <div className="col justify-content-center mt-5 bs">
          <DisplayBookingBabySitter />
        </div>
        <div id="map" style={{ height: "180px" }}>
            <MyMap />
        </div>
      </div>
    </div>
  );
};

export default BabySitterHomeScreen;