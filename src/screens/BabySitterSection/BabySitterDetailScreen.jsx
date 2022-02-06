import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import moment from "moment";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const BabySitterDetailScreen = () => {
  const { parentid } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [babySitter, setBabySitter] = useState();
  return <div></div>;
};

export default BabySitterDetailScreen;
