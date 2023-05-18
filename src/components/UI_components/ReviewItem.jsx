import React from "react";

const ReviewItem = ({ review }) => {
  return (
    <div className="flex gap-3 py-2 border-t border-solid border-b-grey">
      <img
        src={review.userURL}
        width={40}
        height={40}
        className="rounded-[20px] max-h-[40px]"
        alt={review.userName + `review`}
      />
      <div className="flex flex-col">
        <p className="text-sm text-sh-grey pb-3">
          Reviewed by{" "}
          <span className="text-p-white hover:cursor-pointer">
            {review.userName}{" "}
          </span>
        </p>{" "}
        <p className="text-sh-grey">{review.review}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
