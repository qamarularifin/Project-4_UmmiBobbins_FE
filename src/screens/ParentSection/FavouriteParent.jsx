import React from "react";
import { useContext } from "react";
import GeneralContext from "../../context/GeneralContext";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Tag, Divider } from "antd";

const FavouriteParent = () => {
  const { favouriteContext } = useContext(GeneralContext);
  const [favParent, dispatchFavParent] = favouriteContext;

  console.log("ffff", favParent);

  const favItem = favParent.map((ele, i) => {
    return (
      <div key={i}>
        <p>Favourite Parent</p>
        <img src={ele.image} style={{ width: "300px" }} />
        <p>Name: {ele.name}</p>
        <p>Description: {ele.description}</p>

        {/* <p className="mt-2">Dates Unavailable: </p>

        <p>
          <Tag color="red">
            From: {ele.currentBookings[0].fromDate} To:
            {ele.currentBookings[0].toDate}
          </Tag>
        </p> */}

        <Button
          variant="contained"
          size="small"
          color="error"
          startIcon={<FavoriteIcon />}
          onClick={() => {
            dispatchFavParent({ type: "REMOVEFROMFAV", payload: ele._id });
          }}
        >
          Del
        </Button>
      </div>
    );
  });

  return (
    <div>
      {favItem.length < 1 ? (
        <h1 className="fav-empty">Favourite is Empty!</h1>
      ) : (
        favItem
      )}
    </div>
  );
};

export default FavouriteParent;
