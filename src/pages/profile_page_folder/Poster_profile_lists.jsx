import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PosterProfileLists = ({ movie, index }) => {
  const [fixedIndex, setFixedIndex] = useState();
  useEffect(() => {
    switch (index) {
      case 0:
        setFixedIndex(15);
        break;
      case 1:
        setFixedIndex(14);
        break;
      case 2:
        setFixedIndex(13);
        break;
      case 3:
        setFixedIndex(12);
        break;
      case 4:
        setFixedIndex(11);
        break;
      default:
        setFixedIndex(99)
    }
  }, [index]);
  return (
    <div
      className="
    md:w-[70px]
    md:h-[100px]
    border 
    border-solid 
    rounded 
    mr-[-25px]
    border-pb-grey/25
    shadow-inner 
    shadow-[0_0_1px_1px_rgba(20,24,28,1)] 
    relative"
      style={{ zIndex: fixedIndex }}
    >
      <Link to={"/movie/" + movie.id}>
        <img
          className="border rounded hover:scale-125"
          src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
          alt={movie.title}
        />
      </Link>
    </div>
  );
};

export default PosterProfileLists;
