import React from "react";
import { useNavigate } from "react-router-dom";
import FavouriteButton from "../../components/movie_actions/FavouriteButton";
import WatchedButton from "../../components/movie_actions/WatchedButton";

const PosterHomePopular = ({ movie }) => {
  const navigate = useNavigate();

  const goToMovie = () => {
    console.log("redirecting to movie page");
    navigate("/movie/" + movie.id);
  };

  return (
    <div key={movie.id}>
      <h1 onClick={goToMovie}>{movie.title}</h1>
      <img
        src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
        alt={movie.title}
        width={200}
        onClick={goToMovie}
      />
      <FavouriteButton movie={movie} />
      <WatchedButton movie={movie} />
    </div>
  );
};

export default PosterHomePopular;
