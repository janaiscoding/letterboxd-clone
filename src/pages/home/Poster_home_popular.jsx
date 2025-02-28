import React, { useState } from "react";
import { Link } from "react-router-dom";
import FavouriteButton from "../../components/movie_actions/FavouriteButton";
import WatchedButton from "../../components/movie_actions/WatchedButton";
import Image from "next/image";

const PosterHomePopular = ({ movie, setNewDataGained }) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <div
      className="hover:border-3 
    border-pb-grey/25
    hover:border-pb-grey 
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
        <Image
          width={300}
          height={300}
          className="block rounded border"
          src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
          alt={movie.title}
        />
      </Link>
      {visibility ? (
        <div
          className="
        absolute
        left-[25%]
        top-[80%] 
        z-10
        flex
        items-center     
        rounded   
        p-0.5
        "
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <FavouriteButton movie={movie} setNewDataGained={setNewDataGained} />
          <WatchedButton movie={movie} setNewDataGained={setNewDataGained} />
        </div>
      ) : (
        " "
      )}
    </div>
  );
};

export default PosterHomePopular;
