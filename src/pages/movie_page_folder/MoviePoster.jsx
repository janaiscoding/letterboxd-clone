import React, { useState } from 'react';
import FavouriteButton from '../../components/movie_actions/FavouriteButton';
import WatchedButton from '../../components/movie_actions/WatchedButton';
const MoviePoster = ({ movie, setNewDataGained }) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <div
      className="   
      hover:border-3
      relative
      block 
      hover:cursor-pointer 
      hover:rounded
      md:ml-1
      md:self-start
      "
      onMouseEnter={() => setVisibility(true)}
      onMouseLeave={() => setVisibility(false)}
      key={movie.id}
    >
      <img
        className="block  
        h-40 
        w-28
        rounded 
        border border-solid border-pb-grey/25 shadow-[0_0_1px_1px_rgba(20,24,28,1)] shadow-inner md:h-80 md:w-56"
        src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
        alt={movie.title}
      />
      {visibility ? (
        <div
          className="
                absolute
                left-[35%]
                top-[85%] 
                z-10
                flex
                hidden
                items-center
                rounded     
                p-0.5   
                md:flex
                "
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
        >
          <FavouriteButton movie={movie} setNewDataGained={setNewDataGained} />
          <WatchedButton movie={movie} setNewDataGained={setNewDataGained} />
        </div>
      ) : (
        ' '
      )}
      <div
        className="
                absolute
                left-[5%]
                top-[75%]
                z-10 
                flex
                items-center
                rounded
                p-0.5
                md:hidden
                "
        style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      >
        <FavouriteButton movie={movie} setNewDataGained={setNewDataGained} />
        <WatchedButton movie={movie} setNewDataGained={setNewDataGained} />
      </div>
    </div>
  );
};
export default MoviePoster;
