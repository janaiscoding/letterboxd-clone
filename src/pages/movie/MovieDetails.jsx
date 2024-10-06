import React from 'react';

import MoviePoster from './MoviePoster';
import MovieSynopsis from './MovieSynopsis';

const MovieDetails = ({ movie, authStatus, setNewDataGained }) => {
  return (
    <div className="mt-[-20%] flex flex-col justify-between gap-3 md:mt-[-10%] md:flex-row md:flex-row md:justify-start">
      <MoviePoster movie={movie} setNewDataGained={setNewDataGained} />
      <MovieSynopsis movie={movie} authStatus={authStatus} />
    </div>
  );
};

export default MovieDetails;
