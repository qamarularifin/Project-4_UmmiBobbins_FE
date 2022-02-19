import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tag, Divider } from "antd";

const ParentBabySitterDisplayScreen = (props) => {
  const { babySitter, fromDate, toDate } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs">
      <div className="col-md-9 mt-2">
        <p>Name: {babySitter.name}</p>
        <img src={babySitter.image} className="bigimg" />
        <p>Location: {babySitter.location}</p>
        <p>Rate Per Day: $ {babySitter.ratePerDay}</p>
        <p>Description: {babySitter.description}</p>

        <div>
          {fromDate && toDate && (
            <Link
              to={`/book/${babySitter.name}/${babySitter._id}/${fromDate}/${toDate}`}
            >
              <button className="btn btn-primary m-2">Book Now</button>
            </Link>
          )}
          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
          <p className="mt-2">Dates Unavailable: </p>
          {babySitter.currentBookings.map((booking, i) => {
            return (
              <>
                <div key={i} className="row" >
                  <p>
                    <Tag color="red">
                      From: {booking.fromDate} To: {booking.toDate}
                    </Tag>
                  </p>
                </div>
              </>
            );
          })}
        </div>
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
