/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ResultComp from './ResultComp';
const Results = ({
  fetchResults,
  fetchRequest,
  newDataGained,
  setNewDataGained,
}) => {
  const { query } = useParams();
  const [resultsLength, setResultsLength] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
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
    <div className="site-body min-h-[80vh] py-5">
      <div className="flex flex-col px-4 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px]">
        <div
          className="section-heading 
      mb-3 
      flex 
      justify-between 
      border-b
      border-solid 
      border-b-grey 
      text-xs 
      text-sh-grey"
        >
          <p className="text-sm uppercase">
            Found at least {resultsLength} results for {query}
          </p>{' '}
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
