import React from "react";
import { Link } from "react-router-dom";
import ResultPoster from "./ResultPoster";

const ResultComp = ({
  movie,
  setNewDataGained
}) => {
  return (
    <div
      className="flex gap-4 my-2
      border-b 
    border-solid 
    border-b-grey 
    pb-2"
    >
      <ResultPoster movie={movie} setNewDataGained={setNewDataGained} />
      <div className="flex flex-col">
        <Link
          to={"/movie/" + movie.id}
          className="text-p-white font-bold text-xl"
        >
          {" "}
          {movie.title}
        </Link>
        <div className="flex">
          <p className="text-normal text-sh-grey"> {movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultComp;
