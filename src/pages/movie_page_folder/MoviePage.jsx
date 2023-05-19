import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Backdrop from "./Backdrop";
import "../../styles/movie.css";
import MovieDetails from "./MovieDetails";

const MoviePage = ({ fetchResults,authStatus, fetchRequest, setNewDataGained,setNavTransparent }) => {
  const { movieId } = useParams();
  useEffect(() => {
    fetchRequest(
      " https://api.themoviedb.org/3/movie/" +
        movieId +
        "?api_key=90a83017dcd0ef93c3e5474af9093de9&append_to_response=credits"
    );
    console.log('im on movie page')
    setNavTransparent(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="movie-body pb-5 md:mx-auto">
      <Backdrop movie={fetchResults} />
      <div className="flex flex-col px-4 md:w-[950px] md:my-0 md:mx-auto">
        <MovieDetails
          movie={fetchResults}
          authStatus={authStatus}
          setNewDataGained={setNewDataGained}
        />
      </div>
    </div>
  );
};
export default MoviePage;
