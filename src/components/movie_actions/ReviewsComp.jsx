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
  const [isReviewed, setReviewed] = useState(false);

  const onReview = async (movie, review) => {
    if (auth.currentUser === null) {
      createPopup('error');
    } else if (review === '') {
      // handler so you dont send empty reviews
      createPopup('error');
    } else {
      await checkMovieReviewedDB(movie).then(async () => {
        isReviewed
          ? console.log('sent review to movie!')
          : await addReviewDB(review).then(async () => {
              await checkMovieCollection(movie, review);
            });
      });
    }
  };
  const checkMovieReviewedDB = async (movie) => {
    const userId = auth.currentUser.uid;
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userRevs = userDoc.data().reviews;
    setReviewed(userRevs.some((RM) => RM.movieID === movie.id));
  };

  const addReviewDB = async (review) => {
    const userId = auth.currentUser.uid;
    const userRef = doc(db, 'users', userId);

    await updateDoc(userRef, {
      reviews: arrayUnion({
        movieID: movie.id,
        review: review.review,
      }),
    }).then(() => {
      auth.currentUser.uid === 'omVEdBhoCJQr2imTBjMF8Plmiyi2'
        ? setReviewed(false)
        : setReviewed(true);
    });
  };

  const checkMovieCollection = async (movie, review) => {
    const movieDoc = await getDoc(doc(db, 'movies/' + movie.id));
    movieDoc.exists()
      ? await addNewReview(movie, review)
      : await addMovieToCollDB(movie, review);
  };

  const addNewReview = async (movie, review) => {
    const user = auth.currentUser;
    const movieRef = doc(db, 'movies/' + movie.id);
    await updateDoc(movieRef, {
      reviews: arrayUnion({
        movieID: movie.id,
        userName: user.displayName,
        userURL: user.photoURL,
        review: review,
        uid: user.uid, // uid = userID
      }),
    })
      .then(() => {
        createPopup('success');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addMovieToCollDB = async (movie, review) => {
    const user = auth.currentUser;
    await setDoc(doc(db, 'movies/' + movie.id), {
      reviews: [
        {
          movieID: movie.id,
          review: review,
          userName: user.displayName,
          userURL: user.photoURL,
          uid: user.uid,
        },
      ],
    });
  };
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    const movieDoc = await getDoc(doc(db, 'movies/' + movie.id));

    if (movieDoc.exists()) {
      const movieReviews = movieDoc.data().reviews;
      if (!movieReviews) {
        setReviews([]);
      } else {
        console.log(movieReviews);
        setReviews(movieReviews.reverse());
      }
    } else {
      setReviews([]);
    }
  };

  const handleReviewEvent = async (movie, review) => {
    await onReview(movie, review).then(() => {
      getReviews();
      setReview('');
    });
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
        getReviews(); // refetch reviews :)
      })
      .catch((err) => {
        console.log(err);
        createPopup('error');
      });

    await updateDoc(userRef, {
      reviews: arrayRemove(userProfileReview),
    })
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  };

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
          <>
            <input
              className="active-outline-none rounded bg-h-grey p-3 text-drop-black focus:outline-none"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <button
              className="rounded bg-c-grey p-1 text-base text-l-white hover:bg-sh-grey hover:text-b-blue"
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
