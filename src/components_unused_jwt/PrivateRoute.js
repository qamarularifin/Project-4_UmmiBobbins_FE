import React from "react"
import { Route, Navigate } from "react-router-dom"


const PrivateRoute = ({children}) => {
  const token = localStorage.getItem("token")
  //console.log("token", token)

  return (

            // if there is currentUser, render the component, else redirect to login page
            token ? children : <Navigate to="/login" />
  );
};

export default PrivateRoute;
