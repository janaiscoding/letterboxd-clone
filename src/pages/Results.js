import React from "react";
import Poster from "../components/Poster";

const Results = ({ results }) => {
  return (
    <div>
      {results.length === 0
        ? "no search input"
        : results.results.map((movie) => (
            <Poster key={movie.id} movie={movie} />
          ))}
    </div>
  );
};

export default Results;
