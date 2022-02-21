import React from "react";
import { useContext } from "react";
import GeneralContext from "../../context/GeneralContext";

const FavouriteParent = () => {
  const { favouriteContext } = useContext(GeneralContext);
  const [fav, dispatchFav] = favouriteContext;

  const favItem = fav.map((ele, i) => {
    return (
      <div>
        <img src={ele.image} />
        <p>name: {ele.name}</p>
      </div>
    );
  });

  return <div></div>;
};

export default FavouriteParent;
