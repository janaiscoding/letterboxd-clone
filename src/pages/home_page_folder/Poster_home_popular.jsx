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
    <div className="block m-2" key={movie.id}>
      <img
        className="border rounded block"
        onClick={goToMovie}
        src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
        alt={movie.title}
        width={150}
        height={225}
      />
      <span className="absolute overflow-hidden border border-solid rouded border-pb-grey/25 shadow-inner shadow-[0_0_1px_1px_rgba(20,24,28,1)] hover:cursor-pointer hover:border-4 hover:border-pb-grey hover:rounded"></span>
      {/* <FavouriteButton movie={movie} />
      <WatchedButton movie={movie} /> */}
    </div>
  );
};

export default PosterHomePopular;
