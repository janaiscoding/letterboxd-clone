import React, { useState } from "react";
import { Link } from "react-router-dom";
import FavouriteCount from "../../components/movie_actions/FavouriteCount";
import WatchedCount from "../../components/movie_actions/WatchedCount";

const PosterHomeSignout = ({ movie }) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <div
      className="w-[32.33%] 
    mb-[2%]
    border 
    border-solid 
    rounded 
    border-pb-grey/25
    shadow-inner 
    shadow-[0_0_1px_1px_rgba(20,24,28,1)] 
    hover:cursor-pointer 
    hover:border-3 
    hover:border-p-green
    hover:rounded
    md:ml-1
    relative
    "
      onMouseEnter={() => setVisibility(true)}
      onMouseLeave={() => setVisibility(false)}
      key={movie.id}
    >
      <Link to={"/movie/" + movie.id}>
        <img
          className="border rounded block"
          src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
          alt={movie.title}
        />
      </Link>
      {visibility ? (
        <div
          className="
        rounded
        absolute
        flex 
        flex-col
        items-center
        py-[20px]
        left-[15%]
        top-[30px]
        w-[70%]
        z-10
        hidden 
        md:block
        "
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <WatchedCount movie={movie} />
          <FavouriteCount movie={movie} />
        </div>
      ) : (
        " "
      )}
    </div>
  );
};

export default PosterHomeSignout;
