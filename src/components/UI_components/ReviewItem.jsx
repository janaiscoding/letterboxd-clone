import React from 'react';
import { Link } from 'react-router-dom';

const ReviewItem = ({ review }) => {
  return (
    <div className="flex gap-3 border-t border-solid border-b-grey py-2">
      <Link to={'/profile/' + review.uid}>
        <img
          src={review.userURL}
          width={40}
          height={40}
          className="max-h-[40px] max-w-[40px] rounded-full hover:cursor-pointer"
          alt={review.userName + `review`}
        />
      </Link>
      <div className="flex flex-col">
        <p className="pb-3 text-sm text-sh-grey">
          Reviewed by{' '}
          <Link
            to={'/profile/' + review.uid}
            className="text-p-white hover:text-hov-blue"
          >
            {review.userName}{' '}
          </Link>
        </p>{' '}
        <p className="text-sh-grey">{review.review}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
