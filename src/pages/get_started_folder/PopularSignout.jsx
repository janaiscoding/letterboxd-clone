import React, { useEffect, useState } from 'react';
import PosterHomeSignout from './PosterHomeSignout';
import '../../styles/poster.css';

const PopularSignout = ({ populars }) => {
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
              <PosterHomeSignout key={movie.id} movie={movie} />
            ))}
      </div>
    </>
  );
};

export default PopularSignout;
