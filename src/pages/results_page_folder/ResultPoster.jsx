import React, { useState } from "react";
import FavouriteButton from "../../components/movie_actions/FavouriteButton";
import WatchedButton from "../../components/movie_actions/WatchedButton";
import { Link } from "react-router-dom";

const ResultPoster = ({ movie, setNewDataGained }) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <div
      className="
        md:self-start
        hover:cursor-pointer 
        hover:border-3 
        hover:rounded
        md:ml-1
        relative
        "
      onMouseEnter={() => setVisibility(true)}
      onMouseLeave={() => setVisibility(false)}
      key={movie.id}
    >
      <Link to={"/movie/"+movie.id}>
      <img
        className="border rounded block border 
        border-solid 
        rounded 
        border-pb-grey/25
        shadow-inner 
        shadow-[0_0_1px_1px_rgba(20,24,28,1)]  max-h-[110px] max-w-[75px]"
        src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
        alt={movie.title}
      /></Link>
      {visibility ? (
        <div
          className="rounded absolute flex items-center p-0.5 top-[65%] z-10"
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

export default ResultPoster;
