import React, { useState } from 'react';
import FavouriteButton from '../../components/movie_actions/FavouriteButton';
import WatchedButton from '../../components/movie_actions/WatchedButton';
import { Link } from 'react-router-dom';

const ResultPoster = ({ movie, setNewDataGained }) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <div
      className="
        hover:border-3
        relative 
        hover:cursor-pointer 
        hover:rounded
        md:ml-1
        md:self-start
        "
      onMouseEnter={() => setVisibility(true)}
      onMouseLeave={() => setVisibility(false)}
      key={movie.id}
    >
      <Link to={'/movie/' + movie.id}>
        <img
          className="block max-h-[110px] max-w-[75px] rounded 
        rounded 
        border 
        border
        border-solid 
        border-pb-grey/25  shadow-[0_0_1px_1px_rgba(20,24,28,1)] shadow-inner"
          src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
          alt={movie.title}
        />
      </Link>
      {visibility ? (
        <div
          className="absolute top-[65%] z-10 flex items-center rounded p-0.5"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
        >
          <FavouriteButton movie={movie} setNewDataGained={setNewDataGained} />
          <WatchedButton movie={movie} setNewDataGained={setNewDataGained} />
        </div>
      ) : (
        ' '
      )}
    </div>
  );
};

export default ResultPoster;
