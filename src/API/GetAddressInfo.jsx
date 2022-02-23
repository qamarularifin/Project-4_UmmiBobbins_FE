import React, { useState, useEffect } from "react";




const options = {
  // method: "GET",
  // headers: {
  //   "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  //   "x-rapidapi-key": "d7f260b877msh7dc875b681f3a81p1edc5fjsn0affd1eac96e",
  // },
};

const GetAddressInfo = (props) => {
  // console.log(props.recipeID);
  // const ID = props.recipeID+"/information";
  let postalCode = props.postalCode;
  console.log("APi postal: ", postalCode);
  const URL =
  `https://developers.onemap.sg/commonapi/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
  
  const fetchData = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    const response = await fetchData();
    // setData(response);
    console.log(response);
    props.parentCallback(response.results[0]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {/* <h1>Recipes:</h1> */}
      {/* <div>{JSON.stringify(data)}</div> */}
    </div>
  );
};

export default GetAddressInfo;