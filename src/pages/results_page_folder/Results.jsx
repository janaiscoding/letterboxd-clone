/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResultComp from "./ResultComp";
const Results = ({
  apiKey,
  fetchResults,
  fetchRequest,
  newDataGained,
  setNewDataGained,
}) => {
  const { query } = useParams();
  const [resultsLength, setResultsLength] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=" +
        apiKey +
        "&query=" +
        query,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setResults(data.results);
        setResultsLength(data.results.length);
        setNewDataGained(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [query, newDataGained]);
  return (
    <div className="site-body py-5">
      <div className="flex flex-col px-4 md:w-[950px] md:my-0 md:mx-auto font-['Graphik']">
        <div
          className="flex 
      justify-between 
      section-heading 
      text-sh-grey 
      text-xs
      border-b 
      border-solid 
      border-b-grey 
      mb-3"
        >
          <p className="text-sm uppercase">
            Found at least {resultsLength} results for {query}
          </p>{" "}
        </div>
        {results === undefined ? (
          <p>Nothing found!</p>
        ) : (
          results.map((movie) => (
            <ResultComp
              key={movie.id}
              movie={movie}
              setNewDataGained={setNewDataGained}
              newDataGained={newDataGained}
              fetchRequest={fetchRequest}
              fetchResults={fetchResults}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Results;
