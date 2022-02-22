import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const UsersScreen = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  // console.log(user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(async () => {
    try {
      const results = await axios.get(`${BACKEND_BASE_URL}/user/api/`);
      console.log(results.data);
      setUsers(results.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  }, []);

  const deleteUser = async (user) => {
    await axios.delete(`${BACKEND_BASE_URL}/user/api/deleteuser/${user}`);
    window.location.reload();
  };

  return (
    <div className="row table-responsive">
      <div className="col-md-12">
        {loading && <Loader />}
        <table className="table table-bordered">
          <thead className="bs">
            <tr>
              <th>User ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
              <th>Admin</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, i) => {
                return (
                  <tr key={i}>
                    <td>{user._id}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.created ? "Yes" : "No"}</td>
                    <td>{user.isAdmin ? "Yes" : "No"}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersScreen;
