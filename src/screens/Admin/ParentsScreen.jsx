import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const ParentsScreen = () => {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(async () => {
    try {
      const results = await axios.get(
        `${BACKEND_BASE_URL}/parent/api/getallparents`
      );
      console.log(results.data);
      setParents(results.data);
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
              <th>Parent ID</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Description</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {parents &&
              parents.map((parent, i) => {
                return (
                  <tr key={i}>
                    <td>{parent._id}</td>
                    <td>{parent.userId}</td>
                    <td>{parent.name}</td>
                    <td>{parent.location}</td>
                    <td>{parent.description}</td>
                    <td>{parent.image}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParentsScreen;
