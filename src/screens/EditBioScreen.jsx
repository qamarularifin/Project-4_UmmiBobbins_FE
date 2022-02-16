import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import ParentEditBioScreen from "./ParentSection/ParentEditBioScreen";
import BabySitterEditBioScreen from "./BabySitterSection/BabySitterEditBioScreen";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const EditBioScreen = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <>
      {user.role === "parent" ? (
        <ParentEditBioScreen />
      ) : (
        <BabySitterEditBioScreen />
      )}
    </>
  );
};

export default EditBioScreen;
