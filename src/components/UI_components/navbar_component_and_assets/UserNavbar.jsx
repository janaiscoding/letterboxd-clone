import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../../firebase/firebase';

const UserNavbar = ({
  authStatus,
  profilePic,
  userName,
  arrowDown,
  setShowDropdown,
}) => {
  const [uid, setUid] = useState();
  useEffect(() => {
    if (authStatus) {
      setUid(auth.currentUser.uid);
    }
  }, [authStatus]);
  return (
    <div
      className="mx-1 mt-2 flex items-center"
      onMouseEnter={() => setShowDropdown(true)}
    >
      <img
        src={profilePic}
        alt={userName}
        width={24}
        height={24}
        className="max-h-[24px] max-w-[24px] rounded-full"
      />
      <Link
        to={'/profile/' + uid}
        className="sans-serif mx-1 text-xs font-bold uppercase tracking-widest text-sh-grey hover:text-p-white"
      >
        {userName}
      </Link>
      <span>
        <img src={arrowDown} alt="arrow down indicator icon" className="ml-1" />
      </span>
    </div>
  );
};
export default UserNavbar;
