import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import React, { useEffect, useState } from "react";
import ReviewItem from "../UI_components/ReviewItem";

const Reviews = ({ movie }) => {
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
      console.log("no such data for this movie");
    }
    console.log(reviews);
  };

  useEffect(() => {
    getReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie]);

  return (
    <>
      my review wrapper
      <button onClick={getReviews}>Refresh reviews</button>
      {reviews.length > 0
        ? reviews.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))
        : "There are no reviews on this movie yet"}
    </>
  );
};

export default Reviews;
