import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const ParentBabySitterDetailScreen = (props) => {
  const { babySitter } = props;
  return (
    <div className="row bs">
      <div className="col-md-4">
        <p>Name: {babySitter.name}</p>
        <p>Location: {babySitter.location}</p>
      </div>
    </div>
  );
};

export default ParentBabySitterDetailScreen;
