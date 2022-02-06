import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const ParentBabySitterDisplayScreen = (props) => {
  const { babySitter } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row bs ">
      <div className="col-md-9">
        <p>Name: {babySitter.name}</p>
        <p>Location: {babySitter.location}</p>

        <Link to={`/book/${babySitter._id}/`}>
          <button className="btn btn-primary m-2">Book Now</button>
        </Link>

        <button className="btn btn-primary" onClick={handleShow}>
          View Details
        </button>
      </div>

      {/* Modal pop up to show details */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{babySitter.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Carousel>
            {room.imageurls.map((indivImg, i) => {
              return (
                <Carousel.Item key={i}>
                  <img className="d-block w-100 bigimg" src={indivImg} />
                </Carousel.Item>
              );
            })}
          </Carousel> */}
          <p>{babySitter.location}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ParentBabySitterDisplayScreen;
