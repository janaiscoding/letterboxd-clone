import React from "react";

const Results = ({ results }) => {
  return (
    <div>
      {results.length === 0
        ? "no search input"
        : results.results.map((movie) => (
            <div key={movie.id}>
              <p>
                Movie Title: {movie.title} made in {movie.release_date}
              </p>
              <p>{movie.overview}</p>
              <p>{movie.vote_average}</p>
            </div>
          ))}
    </div>
  );
};

export default Results;
