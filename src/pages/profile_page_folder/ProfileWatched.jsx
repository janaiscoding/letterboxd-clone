/* eslint-disable react-hooks/exhaustive-deps */
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import ProfilePoster from './ProfilePoster';
const ProfileWatched = ({ newDataGained, setNewDataGained }) => {
  const { uid } = useParams();

  const [watchedIDs, setWatchedIDs] = useState([]);
  const [userName, setUserName] = useState('');
  const fetchUserMoviesDB = (uid) => {
    fetchWatchedDB(uid);
    setNewDataGained(false);
  };
  const fetchUsername = async (uid) => {
    const userSnap = await getDoc(doc(db, 'users', uid));
    if (userSnap.exists()) {
      setUserName(userSnap.data().name);
    } else {
      alert('This user does not exist!');
    }
  };

  const fetchWatchedDB = async (uid) => {
    const userSnap = await getDoc(doc(db, 'users', uid));
    if (userSnap.exists()) {
      let userWatched = userSnap.data().watched;
      let tempArray = [];
      userWatched.forEach((WM) => {
        tempArray.push(WM.movieID);
      });
      setWatchedIDs(tempArray);
    }
  };

  useEffect(() => {
    fetchUserMoviesDB(uid);
    fetchUsername(uid);
  }, [uid, newDataGained]);

  return (
    <div className="min-h-[90vh] px-4 py-5">
      <div className=" flex flex-col font-['Graphik'] md:mx-auto md:my-0 md:w-[950px] ">
        <div
          className="section-heading 
      mb-3 
      flex 
      justify-between 
      border-b
      border-solid 
      border-b-grey 
      text-xs 
      text-sh-grey"
        >
          <Link
            to={'/profile/' + uid}
            className="text-sm uppercase hover:cursor-pointer hover:text-hov-blue"
          >
            {userName}'s WATCHED MOVIES
          </Link>
        </div>

        <div className="flex flex-wrap">
          {watchedIDs.length > 0 &&
            watchedIDs.map((id) => (
              <ProfilePoster
                key={id.id}
                movieID={id}
                setNewDataGained={setNewDataGained}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileWatched;
