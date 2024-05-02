import React, { useEffect, useState } from 'react';
const Backdrop = ({ movie }) => {
  const [background, setBackground] = useState('');
  const [bgExists, setBgExists] = useState(false);
  useEffect(() => {
    movie.backdrop_path === null ? setBgExists(false) : setBgExists(true);
    setBackground('https://image.tmdb.org/t/p/original/' + movie.backdrop_path);
  }, [movie]);
  return (
    <>
      {bgExists ? (
        <div
          className="movie-backdrop block h-[250px] max-h-[250px] md:m-auto md:mt-[-5%] md:h-[500px] md:max-h-[500px] md:w-[950px]"
          style={{ backgroundImage: `url(${background})` }}
        ></div>
      ) : (
        ''
      )}
    </>
  );
};

export default Backdrop;
