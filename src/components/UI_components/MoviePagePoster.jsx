import React, { useState, useEffect } from "react";
import PlaceholderImg from "../../assets/apple-icon.png";

const MoviePagePoster = ({ movie }) => {
  const [image, setImage] = useState(PlaceholderImg);
  // console.log(movie, "from poster");
  useEffect(() => {
    if (movie.poster_path === null) {
      setImage(PlaceholderImg);
    } else {
      setImage("https://image.tmdb.org/t/p/w500/" + movie.poster_path);
    }
  }, [movie]);

  return (
    <div key={movie.id}>
      <h1>{movie.title}</h1>
      <img src={image} alt={movie.title} width={200} />
    </div>
  );
};

export default MoviePagePoster;
