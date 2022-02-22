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

const ParentEditBioScreen = (props) => {
  const {
    parent,
    parentName,
    parentLocation,
    parentImage,
    parentDescription,
    setParentName,
    setParentLocation,
    setParentImage,
    setParentDescription,
  } = props;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const editSubmit = async () => {
    const editProfile = {
      name: parentName,
      location: parentLocation,
      description: parentDescription,
      image: parentImage,
    };
    try {
      setLoading(true);
      await axios.put(
        `${BACKEND_BASE_URL}/parent/api/${parent._id}/edit`,
        editProfile
      );
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          {loading && <Loader />}
          <h2 className="text-center mb-4">Edit Parent Bio</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={editSubmit}>
            <img src={parentImage} style={{ width: "300px" }} />
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
              />
            </Form.Group>

            <Form.Group id="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="number"
                // ref={""}
                required
                value={parentLocation}
                onChange={(e) => setParentLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group id="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                required
                value={parentImage}
                onChange={(e) => setParentImage(e.target.value)}
              />
            </Form.Group>

            <Form.Group id="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                required
                value={parentDescription}
                onChange={(e) => setParentDescription(e.target.value)}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Edit
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* <div>
        <form onSubmit={editSubmit}>
          <input
            type="text"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
          />
          <button>Edit</button>
        </form>
      </div> */}
    </>
  );
};

export default ParentEditBioScreen;
