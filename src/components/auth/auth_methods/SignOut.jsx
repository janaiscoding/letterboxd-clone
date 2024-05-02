import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../../../firebase/firebase';
import { useNavigate, useLocation } from 'react-router-dom';

// this will work on any auth type
const SignOut = ({ setDDMobOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        setDDMobOpen(false);
        if (location.pathname.contains('profile')) {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <p className="block px-4 pt-2 md:p-0" onClick={onSignOut}>
        Sign Out
      </p>
    </>
  );
};

export default SignOut;
