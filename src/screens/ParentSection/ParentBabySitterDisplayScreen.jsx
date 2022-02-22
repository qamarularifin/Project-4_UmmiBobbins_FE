import React, { useState } from "react";
import { Modal, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tag, Divider } from "antd";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useContext } from "react";
import GeneralContext from "../../context/GeneralContext";

const ParentBabySitterDisplayScreen = (props) => {
  const { babySitter, fromDate, toDate } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log("ttt", babySitter._id); show all babysitters

  const { favouriteContext } = useContext(GeneralContext);
  const [favParent, dispatchFavParent] = favouriteContext;

  return (
    <div className="row bs">
      <div className="col-md-9 mt-2">
        <img src={babySitter.image} className="bigimg" />
        <p className="mt-3">Name: {babySitter.name}</p>
        <p>Location: {babySitter.location}</p>
        {/* <p>Rate Per Day: $ {babySitter.ratePerDay}</p> */}
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

          {/* ////////////////////favourite////////////////  working ///// DONT DELETE*/}
          {/* {favParent.some((p) => p._id === babySitter._id) ? (
            <Button
              variant="contained"
              size="medium"
              color="error"
              startIcon={<FavoriteIcon />}
              onClick={() => {
                dispatchFavParent({
                  type: "REMOVEFROMFAV",
                  payload: babySitter._id,
                });
              }}
            >
              DEL
            </Button>
          ) : (
            <Button
              variant="contained"
              size="medium"
              color="success"
              startIcon={<FavoriteBorderIcon />}
              onClick={() => {
                dispatchFavParent({
                  type: "ADDTOFAV",

                  payload: {
                    _id: babySitter._id,
                    image: babySitter.image,
                    name: babySitter.name,
                    description: babySitter.description,
                    currentBookings: babySitter.currentBookings,
                  },
                });
              }}
            >
              Fav
            </Button>
          )} */}

          {/* ////////////////////////////////////////favourite end//////////////// */}

          <p className="mt-2">Dates Unavailable: </p>
          {babySitter.currentBookings.map((booking, i) => {
            return (
              <>
                <div key={i} className="row">
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

          <img src={babySitter.image} style={{ width: "300px" }} />
          <p className="mt-3">Location postal code: {babySitter.location}</p>
          <p>Rate Per Day: $ {babySitter.ratePerDay}</p>
          <p>Description: {babySitter.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ParentBabySitterDisplayScreen;
