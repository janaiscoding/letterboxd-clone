import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MoviePagePoster from "../../components/UI_components/MoviePagePoster";
import FavouriteButton from "../../components/movie_actions/FavouriteButton";
import WatchedButton from "../../components/movie_actions/WatchedButton";
import ReviewsComp from "../../components/movie_actions/ReviewsComp";

const MoviePage = ({
  apiKey,
  fetchResults,
  fetchRequest,
  setNewDataGained,
}) => {
  const { movieId } = useParams();

  useEffect(() => {
    fetchRequest(
      "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + apiKey
    );
      console.log('im on movie page')  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  return (
    <>
      This is the movie page for what i have picked
      <MoviePagePoster
        movie={fetchResults}
        setNewDataGained={setNewDataGained}
      />
      <FavouriteButton
        movie={fetchResults}
        setNewDataGained={setNewDataGained}
      />
      <WatchedButton movie={fetchResults} setNewDataGained={setNewDataGained} />
      <ReviewsComp movie={fetchResults} />
    </>
  );
};
export default MoviePage;
