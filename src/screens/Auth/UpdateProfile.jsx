import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import GeneralContext from "../../context/GeneralContext";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const UpdateProfile = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
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
    userId,
    setUserId,
    role,
    setRole,
  ] = userContext;

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [tempEmail, setTempEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");

  // this is to update field and in this case is the Quote
  const handleSubmit = async (event) => {
    event.preventDefault(); // prevents whole page from refreshing
    //validation
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const res = await fetch(
      `${BACKEND_BASE_URL}/user/api/dashboard/update-profile/${user._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: tempEmail,
          password: tempPassword,
        }),
      }
    );

    if (res.status !== 200) {
      console.error("failed to fetch item");

      return;
    }
    const data = await res.json();
    console.log("gggg", data);

    setEmail(tempEmail);
    setPassword(tempPassword);
    navigate("/dashboard");
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={email}
                onChange={(e) => setTempEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                //  defaultValue={password}
                placeholder="Enter new password"
              />
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                onChange={(e) => setTempPassword(e.target.value)}
                // defaultValue={passwordConfirm}
                placeholder="Confirm new password"
              />
            </Form.Group>

            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/dashboard">Cancel</Link>
      </div>
    </>
  );
};

export default UpdateProfile;
