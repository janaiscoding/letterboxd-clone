/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import removeFavIcon from "./remFav.png";

const FavouriteCount = ({ movie }) => {
    const [number, setNumber] = useState(0);
    const getRandomNumber = (min, max) => {
      setNumber(Math.floor(Math.random() * (max - min) + min));
    };
    useEffect(() => {
      getRandomNumber(500, 2000);
    }, [movie]);
  return (
    <>
      <div className="py-2 text-xl text-p-white text-center flex flex-col items-center">
        <img
          src={removeFavIcon}
          width={30}
          height={20}
          alt="add movie to favourites icon"
        />
        <span>{number}</span>
      </div>
    </>
  );
};

export default FavouriteCount;
