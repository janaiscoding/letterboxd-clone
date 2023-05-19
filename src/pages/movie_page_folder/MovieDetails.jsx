import React from "react";

import MoviePoster from "./MoviePoster";
import MovieSynopsis from "./MovieSynopsis";

const MovieDetails = ({ movie,authStatus, setNewDataGained }) => {
  return (
    <div className="flex flex-row-reverse justify-between md:flex-row md:justify-start">
      <MoviePoster movie={movie} setNewDataGained={setNewDataGained} />
      <MovieSynopsis movie={movie} authStatus={authStatus} />
    </div>
  );
};

export default MovieDetails;

// w-28
// mt-[-20%]
// md:w-56
// md:mt-0
