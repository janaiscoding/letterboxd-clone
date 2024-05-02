import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import dropdownLinksData from './navbar_assets/dropdownLinksData';
import SignOut from '../../auth/auth_methods/SignOut';
import '../../../styles/dropdown.css';
import { auth } from '../../../firebase/firebase';
import SignInGoogle from '../../auth/auth_methods/SignInGoogle';
import SignInTest from '../../auth/auth_methods/SignInTest';

const DropdownMobile = ({
  authStatus,
  setUserLogin,
  userLogin,
  userName,
  profilePic,
  DDMobOpen,
  setDDMobOpen,
  dropDownRef,
}) => {
  const dropdownList = dropdownLinksData;
  const [uid, setUid] = useState('');
  const { pathname } = useLocation();
  useEffect(() => {
    if (authStatus) {
      setUserLogin(true);
      setUid(auth.currentUser.uid);
    } else {
      setUserLogin(false);
    }
    let handlerDDMob = (e) => {
      if (!dropDownRef.current.contains(e.target)) {
        setDDMobOpen(false);
      }
    };
    document.addEventListener('mousedown', handlerDDMob);
    setDDMobOpen(false);
    return () => {
      document.removeEventListener('mousedown', handlerDDMob);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus, pathname]);

  return (
    <>
      <div
        className={`mobile-dropdown-nav ${
          DDMobOpen ? 'active' : 'inactive'
        } z-999 sans-serif static absolute left-0 top-[2.3rem] w-full
        flex-col rounded-sm bg-h-blue p-2`}
      >
        {userLogin ? (
          <div className="z-50 mx-4 flex py-1">
            <div className="flex gap-1">
              <Link to={'/profile/' + uid}>
                <img
                  src={profilePic}
                  alt={userName}
                  width={24}
                  height={24}
                  className="rounded-xl"
                />
              </Link>
              <Link
                to={'/profile/' + uid}
                className=" z-50 font-semibold uppercase text-p-white hover:cursor-pointer hover:text-p-white"
              >
                {userName}
              </Link>
            </div>
            <p></p>
          </div>
        ) : (
          ''
        )}

        <ul className="sans-serif z-50 mx-3 rounded-sm bg-h-blue py-3 font-bold uppercase tracking-widest text-sh-grey">
          <li className="divider-mobile"></li>

          <li className="grid grid-cols-2 py-2">
            {dropdownList.map((L) => (
              <Link key={L.id} className={`mx-3 py-0.5`} to={L.link}>
                {L.name}
              </Link>
            ))}
          </li>
          <li className="divider-mobile"></li>
          {userLogin ? (
            <li className="z-50 mx-3 grid grid-cols-2 py-3">
              <Link to="/settings" className="z-50 block pt-2">
                Settings
              </Link>
              <SignOut setDDMobOpen={setDDMobOpen} />
            </li>
          ) : (
            <li className="z-50 grid grid-cols-2 pt-3">
              <SignInGoogle />
              <SignInTest />
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default DropdownMobile;
