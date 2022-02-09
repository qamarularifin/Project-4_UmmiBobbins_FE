import React, { useEffect, useState } from "react";
// import jwt from "jsonwebtoken"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useContext } from "react";
import GeneralContext from "../context/GeneralContext";
import BabySitterHomeScreen from "./BabySitterSection/BabySitterHomeScreen";
import ParentHomeScreen from "./ParentSection/ParentHomeScreen";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("currentUser")); // returns all the data from user // and must be within main function

  const { userContext } = useContext(GeneralContext);
  const [name, setName, email, setEmail, password, setPassword, role, setRole] =
    userContext;

  useEffect(() => {
    setName(user.name);
    setEmail(user.name);
    setPassword(user.password);
    setRole(user.role);
  }, []);

  const navigate = useNavigate();
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");

  // do i really need below??
  // route GET cash data for index page only
  const loadData = async () => {
    const res = await fetch(
      `${BACKEND_BASE_URL}/user/api/dashboard/${user._id}`
    );
    if (res.status !== 200) {
      console.error("failed to fetch item");

      return;
    }
    const data = await res.json();

    setQuote(data.quote); //without this the quote will not be rendered // will render instantly
    setEmail(data.email); //will render instantly
    setRole(data.role);
    setPassword(data.password);
  };

  // need this to render the quote if use without user.quote
  // need this also so that the quote will re-render instantly but must use without user.quote
  useEffect(() => {
    loadData();
  }, []);

  // this is to update field and in this case is the Quote
  const updateQuote = async (event) => {
    event.preventDefault(); // prevents whole page from refreshing
    const res = await fetch(
      `${BACKEND_BASE_URL}/user/api/dashboard/${user._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quote: tempQuote,
        }),
      }
    );

    if (res.status !== 200) {
      console.error("failed to fetch item");

      return;
    }
    const data = await res.json();

    setQuote(tempQuote);
    setTempQuote("");
  };

  return (
    <>
      {role === "parent" ? (
        <ParentHomeScreen
          quote={quote}
          setQuote={setQuote}
          tempQuote={tempQuote}
          setTempQuote={setTempQuote}
          updateQuote={updateQuote}
        />
      ) : (
        <BabySitterHomeScreen
          quote={quote}
          setQuote={setQuote}
          tempQuote={tempQuote}
          setTempQuote={setTempQuote}
          updateQuote={updateQuote}
        />
      )}
    </>
  );
};

export default Dashboard;
