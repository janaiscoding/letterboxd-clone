import React from 'react';
import MovieDetailReviews from '../../components/movie_actions/MovieDetailReviews';

const RecentReviews = ({ movie, authStatus }) => {
  return (
    <>
      <div
        className="section-heading 
        mt-3 
        flex
        justify-between"
      >
        <p className="py-1 text-xs text-sh-grey hover:cursor-pointer hover:text-hov-blue">
          RECENT REVIEWS
        </p>
      </div>{' '}
      <MovieDetailReviews movie={movie} authStatus={authStatus} />
    </>
  );
};
export default RecentReviews;
