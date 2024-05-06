import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase';

const ReviewItem = ({ review, handleDelete }) => {
  const [fixedUserURL, setFixedUserURL] = useState('');
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    // Hardcoded fix for the bad demo img when i used the discord CDN :/
    if (review.userURL.includes('discord')) {
      setFixedUserURL(
        'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=3098&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      );
    } else {
      setFixedUserURL(review.userURL);
    }

    // can show delete button
    if (auth.currentUser) {
      setIsAuthor(auth.currentUser.uid === review.uid);
    }
  }, [review]);

  return (
    <div className="flex gap-3 border-t border-solid border-b-grey py-2">
      <Link to={'/profile/' + review.uid}>
        <img
          src={fixedUserURL}
          width={40}
          height={40}
          className="max-h-[40px] max-w-[40px] rounded-full hover:cursor-pointer"
          alt={'profile avatar of' + review.userName}
        />
      </Link>
      <div className="flex w-full flex-col">
        <div className="flex justify-between gap-1 text-sm text-sh-grey">
          <div className="flex gap-1">
            <p>Reviewed by </p>
            <Link
              to={'/profile/' + review.uid}
              className="text-p-white hover:text-hov-blue"
            >
              {review.userName}{' '}
            </Link>
          </div>
          {isAuthor && (
            <p
              className="hover:cursor-pointer"
              onClick={() => handleDelete(review)}
            >
              Delete
            </p>
          )}
        </div>{' '}
        <p className="text-sh-grey">{review.review}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
