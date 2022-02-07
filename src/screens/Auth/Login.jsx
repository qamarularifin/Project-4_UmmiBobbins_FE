import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import GeneralContext from "../../context/GeneralContext";
import axios from "axios";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const Login = () => {
  const { userContext } = useContext(GeneralContext);
  const [email, setEmail, name, setName, password, setPassword, role, setRole] =
    userContext;

  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
    // setName("")
  }, []);

  // //get parent by id
  // useEffect(async () => {
  //   try {
  //     // setLoading(true);
  //     const results = await axios.post(
  //       `${BACKEND_BASE_URL}/parent/api/getparentbyid`,
  //       {
  //         id: parentid,
  //       }
  //     );
  //     console.log("results", results.data);
  //     setParent(results.data);
  //     // setLoading(false);
  //   } catch (error) {
  //     // setError(true);
  //     console.log(error);
  //     // setLoading(false);
  //   }
  // }, []);

  const loginUser = async (event) => {
    event.preventDefault(); // prevents refreshing app
    const response = await fetch(`${BACKEND_BASE_URL}/user/api/login`, {
      method: "POST",

      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.userData) {
      //check if session exists
      localStorage.setItem("currentUser", JSON.stringify(data.userData)); //this stores session in the localstorage
      setError("");
      setLoading(true);
      // navigate("/parent/new-profile")

      //if new user, will navigate to either parent or babysitter create profile page based on role
      const user = JSON.parse(localStorage.getItem("currentUser"));
      console.log("oooo", user);
      if (user.role === "parent" && user.created === false) {
        navigate("/parent/new-profile");
      } else if (user.role === "babysitter" && user.created === false) {
        navigate("/babysitter/new-profile");
      }

      // else if (
      //   (user.role === "parent" && user.created === true) ||
      //   (user.role === "babysitter" && user.created === true)
      // )
      else {
        //dashboard acts as a middleman to render parent homescreen or babysitter homescreen
        navigate("/dashboard");
      }
    } else {
      setError("Failed to sign in");
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={loginUser}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Login
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup"> Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Login;
