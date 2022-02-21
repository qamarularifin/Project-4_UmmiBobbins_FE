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

const BabySitterEditBioScreen = (props) => {
  const {
    babySitter,
    babySitterName,
    babySitterLocation,
    babySitterImage,
    babySitterDescription,
    babySitterRatePerDay,
    setBabySitterName,
    setBabySitterLocation,
    setBabySitterImage,
    setBabySitterDescription,
    setBabySitterRatePerDay,
  } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  //the useeffect does not fill up the states the first time
  // useEffect(async () => {
  //   try {
  //     setLoading(true);
  //     const results = await axios.get(
  //       `${BACKEND_BASE_URL}/babysitter/api/${babySitter._id}`
  //     );
  //     setName(results.data.name);
  //     setLocation(results.data.location);
  //     setDescription(results.data.description);
  //     setImage(results.data.image);

  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // }, []);

  const editSubmit = async () => {
    const editProfile = {
      name: babySitterName,
      location: babySitterLocation,
      description: babySitterDescription,
      image: babySitterImage,
      ratePerDay: babySitterRatePerDay,
    };
    try {
      setLoading(true);
      await axios.put(
        `${BACKEND_BASE_URL}/babysitter/api/${babySitter._id}/edit`,
        editProfile
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          {loading && <Loader />}
          <h2 className="text-center mb-4">Edit Baby Sitter Bio</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={editSubmit}>
            <img src={babySitterImage} style={{ width: "200px" }} />
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                // ref={""}
                required
                value={babySitterName}
                onChange={(e) => setBabySitterName(e.target.value)}
              />
            </Form.Group>

            <Form.Group id="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="number"
                // ref={""}
                required
                value={babySitterLocation}
                onChange={(e) => setBabySitterLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group id="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                required
                value={babySitterImage}
                onChange={(e) => setBabySitterImage(e.target.value)}
              />
            </Form.Group>

            <Form.Group id="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                required
                value={babySitterDescription}
                onChange={(e) => setBabySitterDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="rateperday">
              <Form.Label>Rate Per Day</Form.Label>
              <Form.Control
                type="number"
                required
                value={babySitterRatePerDay}
                onChange={(e) => setBabySitterRatePerDay(e.target.value)}
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

export default BabySitterEditBioScreen;
