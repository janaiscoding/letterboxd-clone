import React, { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import Reviews from "./Reviews";

const ReviewsComp = ({ movie }) => {
  const [review, setReview] = useState("");
  const [isReviewed, setReviewed] = useState(false);

  const onReview = async (movie, review) => {
    if (auth.currentUser === null) {
      alert("login to use this feature");
    } else if (review === "") {
      // handler so you dont send empty reviews
      alert("your review message cannot be empty");
    } else {
      await checkMovieReviewedDB(movie).then(async () => {
        isReviewed
          ? console.log("revd")
          : await addReviewDB(review).then(async () => {
              await checkMovieCollection(movie, review);
            });
      });
    }
  };
  const checkMovieReviewedDB = async (movie) => {
    const userId = auth.currentUser.uid;
    const userDoc = await getDoc(doc(db, "users", userId));
    const userRevs = userDoc.data().reviews;
    setReviewed(userRevs.some((RM) => RM.movieID === movie.id));
  };

  const addReviewDB = async (review) => {
    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      reviews: arrayUnion({
        movieID: movie.id,
        review: review,
      }),
    }).then(() => {
      auth.currentUser.uid === "omVEdBhoCJQr2imTBjMF8Plmiyi2"
        ? setReviewed(false)
        : setReviewed(true);
    });
  };

  const checkMovieCollection = async (movie, review) => {
    const movieDoc = await getDoc(doc(db, "movies/" + movie.id));
    movieDoc.exists()
      ? await addNewReview(movie, review)
      : await addMovieToCollDB(movie, review);
  };

  const addNewReview = async (movie, review) => {
    const user = auth.currentUser;
    const movieRef = doc(db, "movies/" + movie.id);
    await updateDoc(movieRef, {
      reviews: arrayUnion({
        movieID: movie.id,
        userName: user.displayName || "Testing Account",
        userURL: user.photoURL || "img url",
        review: review,
      }),
    })
      .then(() => {
        console.log("added new review", movie.id, review);
        //add a popup here ?
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addMovieToCollDB = async (movie, review) => {
    const user = auth.currentUser;
    await setDoc(doc(db, "movies/" + movie.id), {
      reviews: [
        {
          movieID: movie.id,
          review: review,
          userName: user.displayName || "Test",
          userURL: user.photoURL || "img url",
        },
      ],
    });
  };
  return (
    <>
      <input
        type="text"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <Reviews movie={movie} review={review} onReview={onReview} />
    </>
  );
};

export default ReviewsComp;
