/* eslint-disable react-hooks/exhaustive-deps */
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import ProfilePoster from './ProfilePoster';

const ProfileFavourites = ({ newDataGained, setNewDataGained }) => {
  const { uid } = useParams();

  const [favIDs, setFavIDs] = useState([]);
  const [userName, setUserName] = useState('');
  const fetchUserMoviesDB = (uid) => {
    fetchFavouritesDB(uid);
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

  const fetchFavouritesDB = async (uid) => {
    const userSnap = await getDoc(doc(db, 'users', uid));
    if (userSnap.exists()) {
      let userFavs = userSnap.data().favourites;
      let tempArray = [];
      userFavs.forEach((FM) => {
        tempArray.push(FM.movieID);
      });
      setFavIDs(tempArray);
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
            {userName}'s FAVOURITE MOVIES
          </Link>
        </div>

        <div className="flex flex-wrap">
          {favIDs.length > 0 &&
            favIDs.map((id) => (
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

export default ProfileFavourites;
