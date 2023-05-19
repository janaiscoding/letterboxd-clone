import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ResultPoster from "./ResultPoster";

const ResultComp = ({
  movie,
  setNewDataGained,
  fetchRequest,
  fetchResults,
}) => {
  const [director, setDirector] = useState();
  const getDirector = () => {
    if (fetchResults.credits !== undefined) {
      const crew = fetchResults.credits.crew;
      const dir = crew.find(({ job }) => job === "Director");
      setDirector(dir.name);
    }
  };
  useEffect(() => {
    fetchRequest(
      " https://api.themoviedb.org/3/movie/" +
        movie.id +
        "?api_key=90a83017dcd0ef93c3e5474af9093de9&append_to_response=credits"
    );
    getDirector();
  });
  return (
    <div
      className="flex gap-4 my-2
      border-b 
    border-solid 
    border-b-grey 
    pb-2"
    >
      <ResultPoster movie={movie} setNewDataGained={setNewDataGained} />
      <div className="flex flex-col justify-between">
        <Link
          to={"/movie/" + movie.id}
          className="text-p-white font-bold text-xl"
        >
          {" "}
          {movie.title}
        </Link>
        <div className="flex">
          <p className="text-normal text-sh-grey">Directed by</p>
          <p className="text-sh-grey max-w-full text-center rounded text-xs p-1 bg-c-grey hover:cursor-pointer hover:text-p-white">
            {director}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultComp;
