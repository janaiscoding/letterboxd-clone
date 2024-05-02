import React from 'react';
import ReviewsComp from '../../components/movie_actions/ReviewsComp';

const RecentReviewsMovie = ({ movie, authStatus }) => {
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
      <ReviewsComp movie={movie} authStatus={authStatus} />
    </>
  );
};
export default RecentReviewsMovie;
