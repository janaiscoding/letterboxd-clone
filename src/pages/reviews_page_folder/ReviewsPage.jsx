import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Review from './Review';

const ReviewsPage = ({ setNewDataGained }) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviewsfromDB = async () => {
    const moviesSnap = await getDocs(collection(db, 'movies'));
    let tempArray = [];

    moviesSnap?.forEach((doc) => {
      const movieReviews = doc.data().reviews;
      movieReviews?.forEach((review) => {
        tempArray.push(review);
      });
    });

    setReviews(tempArray);
  };

  useEffect(() => {
    fetchReviewsfromDB();
  }, []);

  return (
    <div className="site-body min-h-[80vh] py-5">
      <div className="flex flex-col px-4 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px]">
        <div className="section-heading mb-3 flex justify-between text-xs text-sh-grey">
          <p>REVIEWS OF CLONNERBOXD</p>
          {reviews.length > 0 && <p>{reviews.length} total reviews</p>}
        </div>
        <>
          {reviews
            .slice()
            .reverse()
            .map((review, i) => (
              <Review
                key={i}
                review={review}
                setNewDataGained={setNewDataGained}
              />
            ))}
        </>
      </div>
    </div>
  );
};
export default ReviewsPage;
