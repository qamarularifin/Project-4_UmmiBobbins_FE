import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import GeneralContext from "../../context/GeneralContext";
import axios from "axios";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const ForgotPassword = () => {
  const { userContext } = useContext(GeneralContext);
  const [email, setEmail, name, setName, password, setPassword, role, setRole] =
    userContext;

  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const navigate = useNavigate();
  return (
    <>
      <Card
        style={{ marginLeft: "15px", marginTop: "100px", maxWidth: "500px" }}
      >
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {loading && <Loader />}

          <Form onSubmit={handleSubmit}>
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

            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Reset Password
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

export default ForgotPassword;
