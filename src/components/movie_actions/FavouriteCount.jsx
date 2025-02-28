/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import removeFavIcon from "./remFav.png";
import Image from "next/image";

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
      <div className="text-p-white flex flex-col items-center py-2 text-center text-xl">
        <Image
          src={removeFavIcon}
          width={30}
          height={20}
          alt="favourite icon"
          aria-label="heart favorite icon"
        />
        <span>{number}</span>
      </div>
    </>
  );
};

export default FavouriteCount;
