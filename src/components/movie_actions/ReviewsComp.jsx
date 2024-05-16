import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/firebase';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import ReviewItem from '../UI_components/ReviewItem';
import SignInAll from '../auth/auth_methods/SignInAll';

const ReviewsComp = ({ movie, authStatus }) => {
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleReviewSubmit = async (e, review) => {
    e.preventDefault();

    if (!review || !auth.currentUser) {
      createPopup('error');
      return;
    }

    await addReviewToUser(review)
      .then(async () => {
        await onAddMovieReview(review);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // refetch reviews
        getReviews();
        // cleanup input
        setReview('');
      });
  };

  const addReviewToUser = async (review) => {
    const userId = auth.currentUser.uid;
    const userRef = doc(db, 'users', userId);

    await updateDoc(userRef, {
      reviews: arrayUnion({
        movieID: movie.id,
        review: review,
      }),
    });
  };

  /**
   * Checks if a movie is already stored in DB. If not, it will create a new movie document
   * and then it will add the review
   * @param {*} review
   */
  const onAddMovieReview = async (review) => {
    const movieDoc = await getDoc(doc(db, 'movies/' + movie.id));

    if (movieDoc.exists()) {
      await addMovieReview(review);
    } else {
      await addNewMovieDocWithReview(review);
    }
  };

  const addMovieReview = async (review) => {
    const movieRef = doc(db, 'movies/' + movie.id);

    await updateDoc(movieRef, {
      reviews: arrayUnion({
        movieID: movie.id,
        userName: auth.currentUser.displayName,
        userURL: auth.currentUser.photoURL,
        review: review,
        uid: auth.currentUser.uid,
      }),
    })
      .then(() => {
        createPopup('success');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addNewMovieDocWithReview = async (review) => {
    await setDoc(doc(db, 'movies/' + movie.id), {
      reviews: [
        {
          movieID: movie.id,
          review: review,
          userName: auth.currentUser.displayName,
          userURL: auth.currentUser.photoURL,
          uid: auth.currentUser.uid,
        },
      ],
    });
  };

  const getReviews = async () => {
    const movieDoc = await getDoc(doc(db, 'movies/' + movie.id));

    if (movieDoc.exists()) {
      const movieReviews = movieDoc.data().reviews;
      if (!movieReviews) {
        setReviews([]);
      } else {
        setReviews(movieReviews.reverse());
      }
    } else {
      setReviews([]);
    }
  };

  const handleDelete = async (review) => {
    // On the user document, we only store minimal info, and we need a ref. to that to delete as well
    const userProfileReview = {
      movieID: review.movieID,
      review: review.review,
    };

    const movieRef = doc(db, 'movies', review.movieID.toString());
    const userRef = doc(db, 'users', review.uid);

    await updateDoc(movieRef, {
      reviews: arrayRemove(review),
    })
      .then(() => {
        createPopup('delete');
        // refetch the latest reviews ^^
        getReviews();
      })
      .catch((err) => {
        console.log(err);
        createPopup('error');
      });

    await updateDoc(userRef, {
      reviews: arrayRemove(userProfileReview),
    }).catch((err) => {
      console.error(err);
    });
  };

  // just a generic popup element that should be replaced with a better handler here.
  const createPopup = (action) => {
    const popupAlert = document.createElement('div');

    popupAlert.classList.add('popup-review');
    if (action === 'error') {
      popupAlert.innerText = `Your review cannot be empty!`;
    } else if (action === 'success') {
      popupAlert.innerText = 'Your review was successfully added!';
    } else if (action === 'delete') {
      popupAlert.innerText = `Your review was successfully deleted!`;
    } else {
      popupAlert.innerText = `Your review could not be deleted!`;
    }
    document.body.append(popupAlert);
    setTimeout(() => {
      popupAlert.remove();
    }, 1000);
  };

  useEffect(() => {
    getReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie, authStatus, setReviews]);

  return (
    <>
      <div className="flex flex-col justify-between gap-2">
        {reviews.length > 0 ? (
          reviews
            .slice()
            .reverse()
            .map((review, index) => (
              <ReviewItem
                key={index}
                review={review}
                handleDelete={handleDelete}
              />
            ))
        ) : authStatus ? (
          <p className="pt-2 text-base text-sh-grey">Write the first review!</p>
        ) : (
          <p className="pt-2 text-base text-sh-grey">
            Login and write the first review!
          </p>
        )}
        {authStatus ? (
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => handleReviewSubmit(e, review)}
          >
            <input
              className="active-outline-none rounded bg-h-grey p-3 text-drop-black focus:outline-none"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <button
              type="submit"
              className="rounded bg-c-grey p-1 text-base text-l-white hover:bg-sh-grey hover:text-b-blue"
            >
              Send Review
            </button>
          </form>
        ) : (
          <SignInAll />
        )}
      </div>
      <div></div>
    </>
  );
};

export default ReviewsComp;
