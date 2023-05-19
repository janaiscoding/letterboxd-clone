/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Poster from "../../components/UI_components/Poster";
import { useParams } from "react-router-dom";
import ResultPoster from "./ResultPoster";
const Results = ({ apiKey, fetchResults, fetchRequest }) => {
  const { query } = useParams();
  const [resultsLength, setResultsLength] = useState("");
  const [results, setResults] = useState([]);
  const getResults = () => {
    if (fetchResults.results !== undefined) {
      setResultsLength(fetchResults.results.length);
      setResults(fetchResults.results);
      console.log();
    }
  };
  useEffect(() => {
    fetchRequest(
      "https://api.themoviedb.org/3/search/movie?api_key=" +
        apiKey +
        "&query=" +
        query
    );

    getResults();
  }, []);
  return (
    <div>
      <p>
        Found {resultsLength} results for {query}
      </p>
      {results === undefined ? (
        <p>Nothing found!</p>
      ) : (
        results.map((movie) => <ResultPoster key={movie.id} movie={movie} />)
      )}
    </div>
  );
};

export default Results;
