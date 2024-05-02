/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import remWatched from './remWatched.png';
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
      <div className="flex flex-col items-center py-2 text-center text-xl text-p-white">
        <img
          src={remWatched}
          width={30}
          height={20}
          alt="add movie to favourites icon"
        />
        <span>{number}</span>
      </div>
    </>
  );
};

export default WatchedCount;
