import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import ReviewItem from "../UI_components/ReviewItem";
import SignInAll from "../auth/auth_methods/SignInAll";

const ReviewsComp = ({ movie, authStatus }) => {
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
          ? console.log("sent review to movie!")
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
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    const movieDoc = await getDoc(doc(db, "movies/" + movie.id));
    if (movieDoc.exists()) {
      const movieReviews = movieDoc.data().reviews;
      const firstFour = movieReviews.reverse().filter((id, index) => index < 4);
      setReviews(firstFour);
    } else {
      setReviews([]);
    }
  };
  const handleReviewEvent = async (movie, review) => {
    await onReview(movie, review).then(() => {
      getReviews();
      setReview("");
    });
  };
  useEffect(() => {
    getReviews();
    console.log("inside reviews comp");
    console.log(authStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie, authStatus, setReviews]);

  return (
    <>
      <div className="flex flex-col justify-between gap-2">
        {reviews.length > 0 ? (
          reviews
            .slice()
            .reverse()
            .map((review, index) => <ReviewItem key={index} review={review} />)
        ) : authStatus ? (
          <p className="text-sh-grey text-base pt-2">Write the first review!</p>
        ) : (
          <p className="text-sh-grey text-base pt-2">Login and write the first review!</p>
        )}
        {authStatus ? (
          <>
            <input
              className="p-3 rounded bg-h-grey focus:outline-none active-outline-none text-drop-black"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <button
              className="bg-c-grey rounded text-l-white text-base hover:bg-sh-grey hover:text-b-blue p-1"
              onClick={() => handleReviewEvent(movie, review)}
            >
              Send Review
            </button>
          </>
        ) : (
          <SignInAll />
        )}
      </div>
      <div></div>
    </>
  );
};

export default ReviewsComp;
