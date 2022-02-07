import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import GeneralContext from "../../context/GeneralContext";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const ParentNewProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  console.log("thisss", user);

  const handleSubmit = async (event) => {
    event.preventDefault(); //need this else will not navigate to dashboard page
    const res = await fetch(
      `${BACKEND_BASE_URL}/parent/api/new-profile/${user._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          created: true,
        }),
      }
    );

    if (res.status !== 200) {
      console.error("failed to fetch item");

      return;
    }
    const data = await res.json();
    navigate("/dashboard");
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Create New Parent Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            {/* <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                // ref={""}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group id="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                // ref={""}
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group id="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                // ref={""}
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group> */}
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default ParentNewProfileScreen;
