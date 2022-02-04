import React from "react"
import { Route, Navigate } from "react-router-dom"


const PrivateRoute = ({children}) => {
  const session = localStorage.getItem("currentUser")
  //console.log("token", token)

  return (

            // if there is currentUser, render the component, else redirect to login page
            session ? children : <Navigate to="/login" />
  );
};

export default PrivateRoute;
