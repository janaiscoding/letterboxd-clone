import React, { useEffect, useState } from 'react';
import UserProfileReview from './UserProfileReview';

const UserReviews = ({ reviews, setNewDataGained }) => {
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
        className="section-heading 
        mx-2
        mb-2 
        flex
        justify-between 
        border-b
        border-solid 
        border-b-grey 
        text-xs 
        text-sh-grey"
      >
        <p>REVIEWS</p>
      </div>
      <div
        className="mb-10 
        flex
        flex-col
        justify-between 
        gap-2
        md:flex-nowrap"
      >
        {firstSix.length === 0 ? (
          <p className=" mx-2 pt-2 text-base text-sh-grey">
            This user hasn't reviewed any movies yet.
          </p>
        ) : (
          firstSix.map((R, index) => (
            <UserProfileReview
              setNewDataGained={setNewDataGained}
              key={index}
              movieID={R.movieID}
              review={R.review}
            />
          ))
        )}
      </div>
    </>
  );
};

export default UserReviews;
