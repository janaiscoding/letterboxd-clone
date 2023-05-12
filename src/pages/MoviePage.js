import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MoviePagePoster from "../components/MoviePagePoster";

const MoviePage = ({ apiKey, movie, fetchRequest }) => {
  const { movieId } = useParams();
  useEffect(() => {
    fetchRequest(
      "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + apiKey,
      "discover"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      This is the movie page for what i have picked
      <MoviePagePoster movie={movie} />
    </>
  );
};
export default MoviePage;
