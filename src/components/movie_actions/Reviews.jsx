import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import React, { useEffect, useState } from "react";
import ReviewItem from "../UI_components/ReviewItem";

const Reviews = ({ movie, review, onReview }) => {
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    let tempArray = [];
    const movieDoc = await getDoc(doc(db, "movies/" + movie.id));
    if (movieDoc.exists()) {
      const movieReviews = movieDoc.data().reviews;
      movieReviews.forEach((review) => {
        tempArray.push(review);
      });
      setReviews(tempArray);
    } else {
      setReviews([]);
    }
  };
  const handleReviewEvent = async (movie, review) => {
    await onReview(movie, review).then(() => {
      getReviews();
    });
  };

  useEffect(() => {
    getReviews();
    console.log("this also changes everytime i get new reviews, right?");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie, setReviews]);

  return (
    <>
      my review wrapper
      <button onClick={() => handleReviewEvent(movie, review)}>
        Send Review
      </button>
      {reviews.length > 0
        ? reviews
            .slice(0)
            .reverse()
            .map((review, index) => <ReviewItem key={index} review={review} />)
        : "There are no reviews on this movie yet"}
    </>
  );
};

export default Reviews;
