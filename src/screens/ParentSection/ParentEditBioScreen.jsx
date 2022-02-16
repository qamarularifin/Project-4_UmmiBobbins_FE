import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import GeneralContext from "../../context/GeneralContext";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const ParentEditBioScreen = () => {
  const { parentid } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  //   useEffect(async () => {
  //     try {
  //       setLoading(true);
  //       const results = await axios.get(
  //         `${BACKEND_BASE_URL}/parent/api/${parentid}`
  //       );
  //       setName(results.data.name);
  //       setLocation(results.data.location);
  //       setDescription(results.data.description);
  //       setImage(results.data.image);

  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       console.log(error);
  //     }
  //   }, []);

  const editSubmit = async () => {
    // const editProfile = {
    //   name: name,
    //   location: location,
    //   description: description,
    //   image: image,
    // };
    // try {
    //   setLoading(true);
    //   await axios.put(
    //     `${BACKEND_BASE_URL}/parent/api/${parentid}/edit`,
    //     editProfile
    //   );
    //   setLoading(false);
    // } catch (error) {
    //   setLoading(false);
    //   console.log(error);
    // }
  };
  return (
    <>
      <Card>
        <Card.Body>
          {loading && <Loader />}
          <h2 className="text-center mb-4">Edit Parent Bio</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={editSubmit}>
            <Form.Group id="name">
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
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>

            <Form.Group id="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Edit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default ParentEditBioScreen;
