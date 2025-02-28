import React, { useState } from "react";
import { Link } from "react-router-dom";
import FavouriteCount from "../../components/movie_actions/FavouriteCount";
import WatchedCount from "../../components/movie_actions/WatchedCount";
import Image from "next/image";

const PosterHomeSignout = ({ movie }) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <div
      className="hover:border-3 
    border-pb-grey/25
    hover:border-p-green 
    relative 
    mb-[2%] 
    w-[32.33%]
    rounded 
    border 
    border-solid 
    shadow-[0_0_1px_1px_rgba(20,24,28,1)] 
    shadow-inner
    hover:cursor-pointer
    hover:rounded
    md:ml-1
    "
      onMouseEnter={() => setVisibility(true)}
      onMouseLeave={() => setVisibility(false)}
      key={movie.id}
    >
      <Link to={"/movie/" + movie.id}>
        {/* @todo - verify image */}
        <Image
          width={10}
          height={10}
          className="block rounded border"
          src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
          alt={movie.title}
          loading="lazy"
        />
      </Link>
      {visibility ? (
        <div
          className="
        absolute
        left-[15%]
        top-[30px] 
        z-10
        flex
        hidden
        w-[70%]
        flex-col
        items-center
        rounded
        py-[20px] 
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
