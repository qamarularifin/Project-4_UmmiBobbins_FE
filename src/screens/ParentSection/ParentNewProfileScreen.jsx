import React from "react";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const ParentNewProfileScreen = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  console.log("thisss", user);
  return (
    <div>
      <h1>parent new profile screen</h1>
    </div>
  );
};

export default ParentNewProfileScreen;
