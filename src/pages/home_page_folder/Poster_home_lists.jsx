import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PosterHomeLists = ({ movie, index }) => {
  const [fixedIndex, setFixedIndex] = useState();
  useEffect(() => {
    switch (index) {
      case 0:
        setFixedIndex(15);
        break;
      case 1:
        setFixedIndex(14);
        break;
      case 2:
        setFixedIndex(13);
        break;
      case 3:
        setFixedIndex(12);
        break;
      case 4:
        setFixedIndex(11);
        break;
      default:
        setFixedIndex(99);
    }
  }, [index]);
  return (
    <div
      className="
      relative
    mr-[-25px] 
    w-fit 
    rounded 
    border
    border-solid
    border-pb-grey/25 
    shadow-[0_0_1px_1px_rgba(20,24,28,1)] 
    shadow-inner"
      style={{ zIndex: fixedIndex }}
    >
      <Link to={'/movie/' + movie.id}>
        <img
          className="rounded border md:h-[100px] md:w-[70px]"
          src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
          alt={movie.title}
          loading="lazy"
        />
      </Link>
    </div>
  );
};

export default PosterHomeLists;
