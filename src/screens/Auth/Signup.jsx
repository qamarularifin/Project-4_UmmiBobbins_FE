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
import { Tabs } from "antd";
import { Tag, Divider } from "antd";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
const { TabPane } = Tabs;

const Signup = () => {
  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Parent" key="1">
          <SignupParent />
        </TabPane>
        <TabPane tab="Babysitter" key="2">
          <SignupBabySitter />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Signup;

///////////////////////////////////////////////////////////////////////////////////////////////////
// Sign up parent
///////////////////////////////////////////////////////////////////////////////////////////////////
export const SignupParent = () => {
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
    // setName("");
  }, []);

  const signupUser = async (event) => {
    event.preventDefault(); // prevents refreshing app
    try {
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match");
      }
      setLoading(true);
      const response = await fetch(`${BACKEND_BASE_URL}/user/api/signup`, {
        method: "POST",

        body: JSON.stringify({
          email: email,
          password: password,
          role: "parent",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.status === "ok") {
        navigate("/");
      }
      // console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up as Parent</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {loading && <Loader />}

          <Form onSubmit={signupUser}>
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
            Already have an account? <Link to="/">Log In</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
// Sign up Babysitter
///////////////////////////////////////////////////////////////////////////////////////////////////

export const SignupBabySitter = () => {
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
    // setName("");
  }, []);

  const signupUser = async (event) => {
    event.preventDefault(); // prevents refreshing app
    try {
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match");
      }
      setLoading(true);
      const response = await fetch(`${BACKEND_BASE_URL}/user/api/signup`, {
        method: "POST",

        body: JSON.stringify({
          email: email,
          password: password,
          role: "babysitter",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.status === "ok") {
        navigate("/");
      }
      // console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up as Babysitter</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {loading && <Loader />}
          <Form onSubmit={signupUser}>
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
            Already have an account? <Link to="/">Log In</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
