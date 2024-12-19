import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../../../firebase/firebase';
import { useNavigate, useLocation } from 'react-router-dom';

// Sign out component for all authentication types
// will also redirect to the homepage if on a profile page
const SignOut = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onSignOut = () => {
    signOut(auth);

    if (location.pathname.includes('profile')) {
      navigate('/');
    }
  };

  return (
    <p className="block px-4 pt-2 md:p-0" onClick={onSignOut}>
      Sign Out
    </p>
  );
};

export default SignOut;
