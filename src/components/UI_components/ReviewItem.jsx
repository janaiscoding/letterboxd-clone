import React from "react";
import { Link } from "react-router-dom";

const ReviewItem = ({ review }) => {
  return (
    <div className="flex gap-3 py-2 border-t border-solid border-b-grey">
      <Link to={"/profile/" + review.uid}>
        <img
          src={review.userURL}
          width={40}
          height={40}
          className="rounded-[20px] max-h-[40px] hover:cursor-pointer"
          alt={review.userName + `review`}
        />
      </Link>
      <div className="flex flex-col">
        <p className="text-sm text-sh-grey pb-3">
          Reviewed by{" "}
          <Link
            to={"/profile/" + review.uid}
            className="text-p-white hover:text-hov-blue"
          >
            {review.userName}{" "}
          </Link>
        </p>{" "}
        <p className="text-sh-grey">{review.review}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
