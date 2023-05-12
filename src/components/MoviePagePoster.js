import React from "react";

const MoviePagePoster = ({ movie }) => {
  return (
    <div key={movie.id}>
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

export default MoviePagePoster;
