/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import remWatched from "./remWatched.png";
import Image from "next/image";
const WatchedCount = ({ movie }) => {
  const [number, setNumber] = useState(0);
  const getRandomNumber = (min, max) => {
    setNumber(Math.floor(Math.random() * (max - min) + min));
  };
  useEffect(() => {
    getRandomNumber(1000, 7000);
  }, [movie]);
  return (
    <>
      <div className="text-p-white flex flex-col items-center py-2 text-center text-xl">
        <Image
          src={remWatched}
          width={30}
          height={20}
          alt="eye icon"
          aria-label="watched icon for number of watches"
        />
        <span>{number}</span>
      </div>
    </>
  );
};

export default WatchedCount;
