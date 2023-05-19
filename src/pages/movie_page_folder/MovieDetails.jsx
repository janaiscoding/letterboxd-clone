import React from "react";

import MoviePoster from "./MoviePoster";
import MovieSynopsis from "./MovieSynopsis";

const MovieDetails = ({
  movie,
  authStatus,
  setNewDataGained,
}) => {
  return (
    <div className="backdrop-helper flex flex-col  md:flex-row justify-between md:flex-row md:justify-start">
      <MoviePoster movie={movie} setNewDataGained={setNewDataGained} />
      <MovieSynopsis movie={movie} authStatus={authStatus} />
    </div>
  );
};

export default MovieDetails;
