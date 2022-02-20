import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const BabySitterDetailScreen = () => {
  const { parentname, parentid } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [parent, setParent] = useState();
  const navigate = useNavigate();

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
      // console.log("results", results.data);
      setParent(results.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }, []);

  const returnHome = () => {
    navigate("/dashboard");
  };

  return (
    <div className="row justify-content-center mt-5">
      <h1 className="row justify-content-center mt-5">
        Baby Sitter Detail Screen
      </h1>
      {loading ? (
        <Loader />
      ) : parent ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-9">
              <img src={parent.image} className="bigimg" />
              <p className="mt-3">Name: {parent.name}</p>
              <p>Location: {parent.location}</p>
              <p>Description: {parent.description}</p>
              <button
                className="btn btn-primary mr-3"
                style={{ float: "right" }}
                onClick={returnHome}
              >
                Return to Homepage
              </button>
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
