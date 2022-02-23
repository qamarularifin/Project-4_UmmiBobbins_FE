import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const BabySitterDetailScreen = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const { parentname, parentid } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [parent, setParent] = useState();
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  //campak parentid i.e 688ADJjhjwr ke backend untuk dapatkan parentid object
  //selepastu backend campak complete parentid object ke frontend
  //selepastu isikan kandungan parentid ke dalam parent state
  //use effect with mount and unmount to prevent memory leak
  useEffect(() => {
    let componentMounted = true;
    const fetchData = async () => {
      const results = await axios.post(
        `${BACKEND_BASE_URL}/parent/api/getparentbyid`,
        { id: parentid }
      );
      if (componentMounted) {
        setParent(results.data);
      }
    };
    try {
      setLoading(true);
      fetchData();
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }

    return () => {
      componentMounted = false;
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault(); //using this causes it not window.location.reload() in both localhost mode and heroku mode in the backend
    try {
      await axios.post(`${BACKEND_BASE_URL}/parent/api/sendmessagetoparent`, {
        id: parentid,
        // babySitterUserId: user._id,
        messages: message,
      });

      Swal.fire(
        "Congratulations!",
        "Message successfully sent",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Oops!", "Something went wrong", "error");
    }
  };

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
              <form onSubmit={sendMessage}>
                <input
                  type="text"
                  defaultValue={`Hi I am from ${user.email}`}
                  // placeholder="Send a message to parent"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className="btn btn-primary mt-3">Send Message</button>
              </form>

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
