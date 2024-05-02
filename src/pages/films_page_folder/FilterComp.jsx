import React from 'react';
import { Link } from 'react-router-dom';
import ResultPoster from '../results_page_folder/ResultPoster';

const FilterComp = ({ movie, setNewDataGained }) => {
  return (
    <div
      className="my-2 
      flex
      flex-col
      gap-4
       border-b
      border-solid 
    border-b-grey 
    pb-2 
    md:flex-row"
    >
      <ResultPoster movie={movie} setNewDataGained={setNewDataGained} />
      <div className="flex flex-col">
        <Link
          to={'/movie/' + movie.id}
          className="text-xl font-bold text-p-white"
        >
          {' '}
          {movie.title}
        </Link>
        <div className="flex">
          <p className="text-normal text-sh-grey"> {movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default FilterComp;
