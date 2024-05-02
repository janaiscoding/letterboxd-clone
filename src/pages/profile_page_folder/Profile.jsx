/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import { getDoc, doc } from 'firebase/firestore';

import UserFavouriteFilms from './UserFavouriteFilms';
import UserBio from './UserBio';
import UserWatchedFilms from './UserWatchedFilms';
import UserReviews from './UserReviews';

const Profile = ({
  authStatus,
  isProfileUpdated,
  setProfileUpdated,
  newDataGained,
  setNewDataGained,
}) => {
  const { uid } = useParams();

  const [favIDs, setFavIDs] = useState([]);
  const [watchedIDs, setWatchedIDs] = useState([]);

  const [reviews, setReviews] = useState([]);
  const [favCount, setFavCount] = useState(0);
  const [watchedCount, setWatchedCount] = useState(0);

  const fetchUserMoviesDB = (uid) => {
    fetchFavouritesDB(uid);
    fetchWatchedDB(uid);
    fetchReviewsDB(uid);
    setNewDataGained(false);
  };

  const fetchReviewsDB = async (uid) => {
    const userSnap = await getDoc(doc(db, 'users', uid));
    if (userSnap.exists()) {
      let userReviews = userSnap.data().reviews;
      let tempArray = [];
      userReviews.forEach((R) => {
        tempArray.push(R);
      });
      setReviews(tempArray);
    }
  };

  const fetchFavouritesDB = async (uid) => {
    const userSnap = await getDoc(doc(db, 'users', uid));
    if (userSnap.exists()) {
      let userFavs = userSnap.data().favourites;
      let tempArray = [];
      userFavs.forEach((FM) => {
        tempArray.push(FM.movieID);
      });
      setFavIDs(tempArray);
      setFavCount(tempArray.length);
    }
  };
  const fetchWatchedDB = async (uid) => {
    const userSnap = await getDoc(doc(db, 'users', uid));
    if (userSnap.exists()) {
      let userFavs = userSnap.data().watched;
      let tempArray = [];
      userFavs.forEach((WM) => {
        tempArray.push(WM.movieID);
      });
      setWatchedIDs(tempArray);
      setWatchedCount(tempArray.length);
    }
  };
  useEffect(() => {
    fetchUserMoviesDB(uid);
  }, [uid, newDataGained]);

  return (
    <div className="site-body min-h-screen-[90vh] py-5">
      <div className="flex flex-col px-4 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px] md:py-8">
        <UserBio
          uid={uid}
          authStatus={authStatus}
          isProfileUpdated={isProfileUpdated}
          setProfileUpdated={setProfileUpdated}
          favCount={favCount}
          watchedCount={watchedCount}
          newDataGained={newDataGained}
        />
        <div className="flex flex-col md:flex-row md:justify-between">
          <div>
            <UserFavouriteFilms
              favIDs={favIDs}
              uid={uid}
              setNewDataGained={setNewDataGained}
            />
            <UserWatchedFilms
              watchedIDs={watchedIDs}
              uid={uid}
              setNewDataGained={setNewDataGained}
            />
          </div>
          <div className="">
            <UserReviews
              reviews={reviews}
              setNewDataGained={setNewDataGained}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
