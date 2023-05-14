/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Poster from "../components/Poster";
import { useParams } from "react-router-dom";
const Results = ({ results, handleSearchReq}) => {
  const { query} = useParams()
  useEffect(()=>{
    handleSearchReq(query)
  },[]) 
  return (
    <div>
      my results
      {results.length === 0
        ? "no search input"
        : results.results.map((movie) => (
            <Poster key={movie.id} movie={movie} />
          ))}
    </div>
  );
};

export default Results;
