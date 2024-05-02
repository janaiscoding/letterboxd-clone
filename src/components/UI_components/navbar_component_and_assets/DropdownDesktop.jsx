import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dropdownLinksData from './navbar_assets/dropdownLinksData';
import SignOut from '../../auth/auth_methods/SignOut';
import '../../../styles/dropdown.css';
import { auth } from '../../../firebase/firebase';

const DropdownDesktop = ({
  authStatus,
  userName,
  profilePic,
  arrowDown,
  setShowDropdown,
}) => {
  const dropdownList = dropdownLinksData;
  const [uid, setUid] = useState('');

  useEffect(() => {
    if (authStatus) {
      setUid(auth.currentUser.uid);
    }
  }, [authStatus]);
  return (
    <>
      <div
        className="z-50 flex flex-col self-start rounded-sm bg-drop-grey pb-2 pt-2"
        onMouseLeave={() => setShowDropdown(false)}
      >
        <div className="z-50 mx-1 flex items-center">
          <img
            src={profilePic}
            alt={userName}
            width={24}
            height={24}
            className="z-50 max-h-[24px] max-w-[24px] rounded-full"
          />
          <Link
            to={'/profile/' + uid}
            className="sans-serif hover:cursor mx-1 text-xs font-bold uppercase tracking-widest text-p-white hover:text-p-white"
          >
            {userName}
          </Link>
          <span>
            <img
              src={arrowDown}
              alt="arrow down indicator icon  z-50"
              className="ml-1"
            />
          </span>
        </div>
        <ul
          className="z-50 rounded-sm bg-drop-grey text-drop-black"
          onMouseLeave={() => setShowDropdown(false)}
        >
          <li className="divider"></li>
          <li>
            <Link
              className="sans-serif z-50 block px-4 py-1 text-xs tracking-normal hover:cursor-pointer hover:bg-dd-blue  hover:text-p-white"
              to={'/profile/' + uid}
            >
              Profile
            </Link>
          </li>
          {dropdownList.map((L) => (
            <li key={L.id}>
              <Link
                to={L.link}
                className="sans-serif z-50 block px-4 py-1 text-xs tracking-normal  hover:bg-dd-blue  hover:text-p-white"
              >
                {L.name}
              </Link>
            </li>
          ))}
          <li className="divider">
            <Link
              to="/settings"
              className="sans-serif block px-4 py-1 text-xs hover:bg-dd-blue  hover:text-p-white"
            >
              Settings
            </Link>
          </li>
          <li className="sans-serif px-4 py-1 text-xs hover:cursor-pointer  hover:bg-dd-blue hover:text-p-white">
            <SignOut />
          </li>
        </ul>
      </div>
    </>
  );
};

export default DropdownDesktop;
