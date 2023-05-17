import React, { useEffect, useState } from "react";
import UserProfileReview from "./UserProfileReview";

const UserReviews = ({ apiKey, reviews, setNewDataGained }) => {
  const [firstSix, setFirstSix] = useState([]);
  useEffect(() => {
    if (reviews.length > 0) {
      const firstSix = reviews.reverse().filter((id, index) => index < 6);
      setFirstSix(firstSix);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews]);

  return (
    <>
      <div
        className="flex 
        mx-2
        justify-between 
        section-heading
        text-sh-grey 
        text-xs
        border-b 
        border-solid 
        border-b-grey 
        my-2"
      >
        <p>YOUR REVIEWS</p>
      </div>
      <div
        className="flex 
        flex-col
        gap-2
        justify-between 
        md:flex-row 
        md:flex-nowrap
        mb-10"
      >
        {firstSix.length === 0
          ? <p className="text-sh-grey text-base pt-2">Go to a movie to write a review, and come back here!</p>
          : firstSix.map((R) => (
              <UserProfileReview
                setNewDataGained={setNewDataGained}
                apiKey={apiKey}
                key={R.movieID}
                movieID={R.movieID}
                review={R.review}
              />
            ))}
      </div>
    </>
  );
};

export default UserReviews;
