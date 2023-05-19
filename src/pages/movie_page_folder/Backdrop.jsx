import React, { useEffect, useState } from "react";
const Backdrop = ({ movie }) => {
  const [background, setBackground] = useState("");
  const [bgExists, setBgExists] = useState(false);
  useEffect(() => {
    movie.backdrop_path === null ? setBgExists(false) : setBgExists(true);
    setBackground("https://image.tmdb.org/t/p/original/" + movie.backdrop_path);
  }, [movie]);
  return (
    <>
      {bgExists ? (
        <div
          className="movie-backdrop block md:h-[500px] md:mt-[-5%] md:max-h-[500px] md:w-[950px] md:m-auto max-h-[250px] h-[250px]"
          style={{ backgroundImage: `url(${background})` }}
        ></div>
      ) : (
        ""
      )}
    </>
  );
};

export default Backdrop;
