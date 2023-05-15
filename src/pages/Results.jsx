/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Poster from "../components/UI_components/Poster";
import { useParams } from "react-router-dom";
const Results = ({ apiKey, fetchResults, fetchRequest }) => {
  const { query } = useParams();
  useEffect(() => {
    fetchRequest(
      "https://api.themoviedb.org/3/search/movie?api_key=" +
        apiKey +
        "&query=" +
        query
    );
  }, []);
  return (
    <div>
      my results
      {fetchResults.length === 0
        ? "no search input"
        : fetchResults.results.map((movie) => (
            <Poster key={movie.id} movie={movie} />
          ))}
    </div>
  );
};

export default Results;
