import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

import ParentEditBioScreen from "./ParentSection/ParentEditBioScreen";
import BabySitterEditBioScreen from "./BabySitterSection/BabySitterEditBioScreen";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const EditBioScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("currentUser"));

  //parent
  const [parent, setParent] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentLocation, setParentLocation] = useState("");
  const [parentImage, setParentImage] = useState("");
  const [parentDescription, setParentDescription] = useState("");

  //babysitter
  const [babySitter, setBabySitter] = useState("");
  const [babySitterName, setBabySitterName] = useState("");
  const [babySitterLocation, setBabySitterLocation] = useState("");
  const [babySitterImage, setBabySitterImage] = useState("");
  const [babySitterDescription, setBabySitterDescription] = useState("");

  useEffect(async () => {
    try {
      setLoading(true);
      const parentResult = await axios.post(
        `${BACKEND_BASE_URL}/parent/api/getparentbyuserid`,
        { userId: user._id }
      );
      setParent(parentResult.data);
      setParentName(parentResult.data.name);
      setParentLocation(parentResult.data.location);
      setParentImage(parentResult.data.image);
      setParentDescription(parentResult.data.description);

      const babySitterResult = await axios.post(
        `${BACKEND_BASE_URL}/babysitter/api/getbabysitterbyuserid`,
        { userId: user._id }
      );
      setBabySitter(babySitterResult.data);
      setBabySitterName(babySitterResult.data.name);
      setBabySitterLocation(babySitterResult.data.location);
      setBabySitterImage(babySitterResult.data.image);
      setBabySitterDescription(babySitterResult.data.description);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, []);

  return (
    // <>
    //   {user.role === "parent" ? (
    //     <ParentEditBioScreen parent={parent} />
    //   ) : (
    //     <BabySitterEditBioScreen babySitter={babySitter} />
    //   )}
    // </>

    <>
      {user.role === "parent" && (
        <ParentEditBioScreen
          parent={parent}
          parentName={parentName}
          parentLocation={parentLocation}
          parentImage={parentImage}
          parentDescription={parentDescription}
          setParentName={setParentName}
          setParentLocation={setParentLocation}
          setParentImage={setParentImage}
          setParentDescription={setParentDescription}
        />
      )}
      {user.role === "babysitter" && (
        <BabySitterEditBioScreen
          babySitter={babySitter}
          babySitterName={babySitterName}
          babySitterLocation={babySitterLocation}
          babySitterImage={babySitterImage}
          babySitterDescription={babySitterDescription}
        />
      )}
    </>
  );
};

export default EditBioScreen;
