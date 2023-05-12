import React from "react";
import { useNavigate } from "react-router-dom";

const Poster = ({ movie }) => {
  const navigate = useNavigate();
  const goToMovie = () => {
    console.log("redirecting to movie page");
    navigate("/" + movie.id);
  };
  return (
    <div key={movie.id} onClick={goToMovie}>
      <h1>
        Movie Title: {movie.title} made in {movie.release_date}
      </h1>
      <img
        src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
        alt={movie.title}
        width={200}
      />
    </div>
  );
};

export default Poster;
