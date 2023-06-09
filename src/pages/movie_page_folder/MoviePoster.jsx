import React, { useState } from "react";
import FavouriteButton from "../../components/movie_actions/FavouriteButton";
import WatchedButton from "../../components/movie_actions/WatchedButton";
const MoviePoster = ({ movie, setNewDataGained }) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <div
      className="   
      block
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
      <img
        className="border  
        border-solid 
        rounded
        shadow-inner 
        shadow-[0_0_1px_1px_rgba(20,24,28,1)] border-pb-grey/25 block h-40 w-28 md:h-80 md:w-56"
        src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
        alt={movie.title}
      />
      {visibility ? (
        <div
          className="
                rounded
                absolute
                flex 
                items-center
                p-0.5
                hidden
                md:flex
                top-[85%]     
                left-[35%]   
                z-10
                "
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <FavouriteButton movie={movie} setNewDataGained={setNewDataGained} />
          <WatchedButton movie={movie} setNewDataGained={setNewDataGained} />
        </div>
      ) : (
        " "
      )}
      <div
        className="
                md:hidden
                rounded
                absolute
                flex 
                items-center
                p-0.5
                top-[75%]
                left-[5%]
                z-10
                "
        style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
      >
        <FavouriteButton movie={movie} setNewDataGained={setNewDataGained} />
        <WatchedButton movie={movie} setNewDataGained={setNewDataGained} />
      </div>
    </div>
  );
};
export default MoviePoster;
