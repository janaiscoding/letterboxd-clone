import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { auth } from '../../firebase/firebase';

const UserInfo = ({ uid, isProfileUpdated, setProfileUpdated, authStatus }) => {
  const [userName, setUserName] = useState('');
  const [userPic, setUserPic] = useState('');
  const [userBio, setUserBio] = useState('');
  const [displayName, setDisplayName] = useState('');
  const fetchUsername = async (uid) => {
    const userSnap = await getDoc(doc(db, 'users', uid));
    if (userSnap.exists()) {
      setUserName(userSnap.data().name);
      setUserPic(userSnap.data().photoUrl);
      setUserBio(userSnap.data().bio);
    } else {
      alert('This user does not exist!');
    }
  };
  useEffect(() => {
    fetchUsername(uid);
    setProfileUpdated(false);
    if (authStatus) {
      setDisplayName(auth.currentUser.displayName);
    } else if (!authStatus) {
      setDisplayName('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, isProfileUpdated, authStatus]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        <img
          src={userPic}
          alt="your user profile"
          width={85}
          height={85}
          loading="lazy"
          className="rounded-[50px] border border-solid border-[#678] hover:cursor-pointer hover:border-sh-grey md:h-[100px] md:w-[100px] "
        />{' '}
        <div className=" ml-4 mt-3 md:flex md:flex-col md:items-start md:gap-1 ">
          <div className="flex w-full flex-col items-start gap-1 md:flex-row">
            <h1 className="sans-serif text-2xl font-bold text-p-white">
              {userName}
            </h1>
            {displayName === userName ? (
              <Link
                to="/settings"
                className="sans-serif rounded bg-[#567] px-3 py-2 text-xs font-bold text-p-white"
              >
                EDIT PROFILE
              </Link>
            ) : (
              ''
            )}
          </div>

          <p className="sans-serif hidden py-2 text-xs text-sh-grey md:block">
            {userBio}
          </p>
        </div>
      </div>

      <p className="sans-serif py-2 text-xs text-sh-grey md:hidden">
        {userBio}
      </p>
    </div>
  );
};

export default UserInfo;
