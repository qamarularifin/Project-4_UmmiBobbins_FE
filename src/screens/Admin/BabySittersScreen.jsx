import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const BabySittersScreen = () => {
  const [babySitters, setBabySitters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(async () => {
    try {
      const results = await axios.get(
        `${BACKEND_BASE_URL}/babysitter/api/getallbabysitters`
      );
      console.log(results.data);
      setBabySitters(results.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  }, []);

  return (
    <div className="row table-responsive">
      <div className="col-md-12">
        {loading && <Loader />}
        <table className="table table-bordered">
          <thead className="bs">
            <tr>
              <th>Babysitter ID</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Description</th>
              <th>Rate Per Day</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {babySitters &&
              babySitters.map((babySitter, i) => {
                return (
                  <tr key={i}>
                    <td>{babySitter._id}</td>
                    <td>{babySitter.userId}</td>
                    <td>{babySitter.name}</td>
                    <td>{babySitter.location}</td>
                    <td>{babySitter.description}</td>
                    <td>$ {babySitter.ratePerDay}</td>
                    <td>{babySitter.image}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BabySittersScreen;
