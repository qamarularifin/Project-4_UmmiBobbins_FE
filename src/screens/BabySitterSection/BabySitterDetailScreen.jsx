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
  const [parent, setParent] = useState();

  //campak parentid i.e 688ADJjhjwr ke backend untuk dapatkan parentid object
  //selepastu backend campak complete parentid object ke frontend
  //selepastu isikan kandungan parentid ke dalam parent state
  useEffect(async () => {
    try {
      setLoading(true);
      const results = await axios.post(
        `${BACKEND_BASE_URL}/parent/api/getparentbyid`,
        {
          id: parentid,
        }
      );
      console.log("results", results.data);
      setParent(results.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }, []);
  return (
    <div className="m-5">
      <h1>Baby Sitter Detail Screen</h1>
      {loading ? (
        <Loader />
      ) : parent ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-9">
              <p>Name: {parent.name}</p>
              <p>Location: {parent.location}</p>
            </div>
          </div>
        </div>
      ) : (
        <Error message="Detail data error" />
      )}
    </div>
  );
};

export default BabySitterDetailScreen;
