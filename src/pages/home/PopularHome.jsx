import React, { useEffect, useState } from 'react';
import PosterHomePopular from './Poster_home_popular';
import '../../styles/poster.css';

const PopularHome = ({ populars, setNewDataGained }) => {
  const [firstSix, setFirstSix] = useState([]);
  useEffect(() => {
    if (populars.results !== undefined) {
      const firstSix = populars.results.filter((movie, index) => index < 6);
      setFirstSix(firstSix);
    }
  }, [populars]);

  return (
    <>
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
        <p className="text-sm hover:cursor-pointer hover:text-hov-blue">
          POPULAR ON CLONNERBOXD
        </p>{' '}
        <p className="text-[11px] hover:cursor-pointer hover:text-hov-blue">
          MORE
        </p>
      </div>

      <div
        className="mb-10 
      flex 
      flex-wrap 
      justify-between 
      md:flex-row
      md:flex-nowrap"
      >
        {firstSix.length === 0
          ? 'no populars available atm'
          : firstSix.map((movie) => (
              <PosterHomePopular
                key={movie.id}
                movie={movie}
                setNewDataGained={setNewDataGained}
              />
            ))}
      </div>
    </>
  );
};

export default PopularHome;
