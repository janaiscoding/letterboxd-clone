import React from "react";

const ReviewItem = ({ review }) => {
  return (
    <div>
      <h1>{review.userName} says:</h1>
      <p>{review.review}</p>
    </div>
  );
};

export default ReviewItem;
