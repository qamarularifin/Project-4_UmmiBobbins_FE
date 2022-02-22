import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const BabySitterParentDisplayScreen = (props) => {
  const { parent } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs">
      <div className="col-md-9 ">
        <img src={parent.image} className="bigimg" />
        <p className="mt-3">Name: {parent.name}</p>
        <p>Location: {parent.location}</p>
        <p>Description: {parent.description}</p>
        {/* <Link to={`/detail/${parent.name}/${parent._id}`}>
          <button className="btn btn-primary m-2">Message</button>
        </Link> */}

        <button className="btn btn-primary" onClick={handleShow}>
          View Details
        </button>
      </div>

      {/* Modal pop up to show details */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{parent.name}</Modal.Title>
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
          <img src={parent.image} style={{ width: "300px" }} />
          <p className="mt-3">Location postal code: {parent.location}</p>

          <p>Description: {parent.description}</p>
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

export default BabySitterParentDisplayScreen;
