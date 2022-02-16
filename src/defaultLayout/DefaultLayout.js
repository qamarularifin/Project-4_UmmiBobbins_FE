import React from "react";
import "../App.css";
import {
  Form,
  Button,
  FormControl,
  Container,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import Logout from "../components/Logout";
import { useNavigate, Link } from "react-router-dom";

const DefaultLayout = (props) => {
  const session = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/dashboard">
          <i className="fa">Ummi Bobbins</i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* for hamburger icon */}
          <span className="navbar-toggler-icon">
            <i className="fa fa-bars" style={{ color: "white" }}></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-3">
            {session ? (
              <>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-user mr-2"></i>
                    {session.email}
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link to="/admin" className="dropdown-item">
                      Admin
                    </Link>

                    {/* <a className="dropdown-item" href="/admin">
                      Admin
                    </a> */}
                    <Link to="/update-profile" className="dropdown-item">
                      Account Settings
                    </Link>
                    {/* <a className="dropdown-item" href="/update-profile">
                      Account Settings
                    </a> */}
                    <Link to="/datepicker" className="dropdown-item">
                      DatePicker Testing
                    </Link>
                    <a className="dropdown-item" href="/" onClick={logout}>
                      Logout
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item active">
                  <a className="nav-link" href="/signup">
                    Sign Up
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Log In
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <div>{props.children}</div>
    </div>
  );
};

export default DefaultLayout;
