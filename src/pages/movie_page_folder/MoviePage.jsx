import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Backdrop from './Backdrop';
import '../../styles/movie.css';
import MovieDetails from './MovieDetails';

const MoviePage = ({
  fetchResults,
  authStatus,
  fetchRequest,
  newDataGained,
  setNewDataGained,
  setNavTransparent,
}) => {
  const { movieId } = useParams();
  useEffect(() => {
    fetchRequest(
      'https://api.themoviedb.org/3/movie/' +
        movieId +
        '?api_key=90a83017dcd0ef93c3e5474af9093de9&append_to_response=credits'
    );
    setNavTransparent(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="movie-body min-h-[80vh] pb-5 md:mx-auto">
      <Backdrop movie={fetchResults} />
      <div className="flex flex-col px-4 md:mx-auto md:my-0 md:w-[950px]">
        <MovieDetails
          movie={fetchResults}
          authStatus={authStatus}
          setNewDataGained={setNewDataGained}
          newDataGained={newDataGained}
        />
      </div>
    </div>
  );
};
export default MoviePage;
