import React, { useState } from "react";
import { Link } from "react-router-dom";
import FavouriteButton from "../../components/movie_actions/FavouriteButton";
import WatchedButton from "../../components/movie_actions/WatchedButton";

const PosterHomePopular = ({ movie }) => {
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
    hover:border-pb-grey 
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
        items-center
        p-0.5
        top-[80%]     
        left-[25%]   
        z-10
        "
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <FavouriteButton movie={movie} />
          <WatchedButton movie={movie} />
        </div>
      ) : (
        " "
      )}
    </div>
  );
};

export default PosterHomePopular;
