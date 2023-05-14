import React, { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const ReviewButton = ({ movie }) => {
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
    const userDoc= await getDoc(doc(db, "users", userId));
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
      setReviewed(true);
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
        userImg: user.photoURL,
        userName: user.displayName,
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
          review: review,
          userName: user.displayName,
          userURL: user.photoURL,
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
      <button onClick={() => onReview(movie, review)}>Send Review</button>
    </>
  );
};

export default ReviewButton;
