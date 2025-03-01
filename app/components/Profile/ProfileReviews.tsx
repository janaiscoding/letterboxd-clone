import React from "react";
import { ProfileReview } from "./ProfileReview";
import { UserReview } from "app/profile/User";

export const ProfileReviews = ({ reviews }: { reviews: UserReview[] }) => {
  return (
    <div>
      <div className="section-heading text-sh-grey border-b-grey mx-2 mb-2 flex justify-between border-b border-solid text-xs">
        <p>REVIEWS</p>
      </div>
      <div className="mb-10 flex flex-col justify-between gap-2 md:flex-nowrap">
        {reviews.length === 0 ? (
          <p className=" text-sh-grey mx-2 pt-2 text-base">
            This user hasn't reviewed any movies yet.
          </p>
        ) : (
          reviews
            .reverse()
            .slice(0, 6)
            .map((review, i) => (
              <ProfileReview
                key={i}
                movieID={review.movieID}
                review={review.review}
              />
            ))
        )}
      </div>
    </div>
  );
};
