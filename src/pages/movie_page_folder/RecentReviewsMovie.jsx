import React from "react";
import ReviewsComp from "../../components/movie_actions/ReviewsComp";

const RecentReviewsMovie = ({ movie }) => {
  return (
    <>
      <div
        className="flex 
        justify-between 
        section-heading
        mt-3"
      >
        <p className="py-1 text-sh-grey text-xs hover:cursor-pointer hover:text-hov-blue">
          RECENT REVIEWS
        </p>
      </div>{" "}
      <ReviewsComp movie={movie} />
    </>
  );
};
export default RecentReviewsMovie;
