import React, { useRef, useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import GeneralContext from "../../context/GeneralContext";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const Signup = () => {
  const { userContext } = useContext(GeneralContext);
  const [
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    role,
    setRole,
  ] = userContext;
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setName("");
  }, []);

  const signupUser = async (event) => {
    event.preventDefault(); // prevents refreshing app

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    const response = await fetch(`${BACKEND_BASE_URL}/user/api/signup`, {
      method: "POST",

      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        role: role,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.status === "ok") {
      navigate("/login");
    }
    console.log(data);
  };

  const handleSelect = (e) => {
    console.log(e);
    setRole(e);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={signupUser}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                ref={nameRef}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

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

            <DropdownButton
              title="Select Role"
              id="dropdown-menu-align-right"
              onSelect={handleSelect}
            >
              <Dropdown.Item eventKey="parent">Parent</Dropdown.Item>
              <Dropdown.Item eventKey="babysitter">BabySitter</Dropdown.Item>

              <Dropdown.Divider />
            </DropdownButton>
            <h4>{role}</h4>

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

            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Sign Up
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Signup;
