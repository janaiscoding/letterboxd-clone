import React, { useState } from 'react';
import { auth } from '../../../firebase/firebase';
import { updateProfile } from 'firebase/auth';
import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const ChangeUserInfo = ({ setProfileUpdated }) => {
  const [newName, setNewName] = useState('');
  const [newBio, setNewBio] = useState('');
  const [newPfp, setNewPfp] = useState('');

  const navigate = useNavigate();
  /**
   * Use this when the manually set avatar for the demo is not available anymore
   * Update photoURL with a new one and updates Firebase store
   */
  const updatePFP = () => {
    updateProfile(auth.currentUser, {
      photoURL:
        'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=3098&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    });
  };

  const deleteDemoReviews = async () => {
    const moviesToCleanUp = []; // for performing the movies below
    const userRef = doc(db, 'users', 'omVEdBhoCJQr2imTBjMF8Plmiyi2');
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      userDoc.data().reviews.forEach(async (review) => {
        moviesToCleanUp.push(review.movieID);

        await updateDoc(userRef, {
          reviews: arrayRemove(review),
        });
      });
    }

    moviesToCleanUp.forEach(async (movieID) => {
      const movieRef = doc(db, 'movies', movieID.toString());
      const movieDoc = await getDoc(movieRef);

      movieDoc.data().reviews.forEach(async (review) => {
        await updateDoc(movieRef, {
          reviews: arrayRemove(review),
        });
      });
    });
  };

  const updateUserName = () => {
    if (newName === '') {
      createPopup('error');
    } else {
      updateProfile(auth.currentUser, {
        displayName: newName,
      })
        .then(() => {
          changeLoggedUsername(auth.currentUser.uid);
          createPopup('name-change');
          setProfileUpdated(true);
          setNewName('');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const changeLoggedUsername = async (uid) => {
    const userSnap = doc(db, 'users', uid);
    await updateDoc(userSnap, {
      name: newName,
    }).then(() => {
      createPopup('name-change');
      setProfileUpdated(true);
      setNewName('');
    });
  };

  const updateUserBio = async (uid) => {
    const userSnap = doc(db, 'users', uid);
    await updateDoc(userSnap, {
      bio: newBio,
    }).then(() => {
      createPopup('bio-change');
      setProfileUpdated(true);
      setNewBio('');
    });
  };

  const goToProfile = (uid) => {
    navigate('/profile/' + uid);
  };

  const createPopup = (action) => {
    const popupAlert = document.createElement('div');
    popupAlert.classList.add('popup');
    if (action === 'name-change') {
      popupAlert.innerText = `Your new username was updated successfully!`;
    } else if (action === 'error') {
      popupAlert.innerText = `Your username cannot be empty!`;
    } else if (action === 'bio-change') {
      popupAlert.innerText = `You new bio was updated successfully!`;
    }
    document.body.append(popupAlert);
    setTimeout(() => {
      popupAlert.remove();
    }, 1000);
  };

  return (
    <>
      {/* <h1 onClick={deleteDemoReviews}>DELETE ALL REVIEWS FOR DEMO</h1> */}
      <div className="section-heading m-auto mb-3 flex w-[50%] justify-between border-b border-solid border-b-grey text-xs text-sh-grey">
        <p className="text-sm uppercase hover:text-hov-blue">
          CHANGE YOUR USERNAME
        </p>{' '}
      </div>
      <div
        className="m-auto 
        flex
        w-[50%]
      flex-col
      gap-3 md:flex-row"
      >
        <input
          value={newName}
          type="text"
          onChange={(e) => setNewName(e.target.value)}
        />
        <button
          className="sans-serif rounded bg-[#567] px-3 py-2 text-xs font-bold text-p-white"
          onClick={updateUserName}
        >
          Update name
        </button>
      </div>
      <div className="section-heading  m-auto mb-3 mt-4 flex  w-[50%]  justify-between  border-b border-solid  border-b-grey  text-xs  text-sh-grey">
        <p className="text-sm hover:text-hov-blue">CHANGE YOUR BIO</p>{' '}
      </div>
      <div
        className="m-auto 
        flex
        w-[50%]
      flex-col
      gap-3 md:flex-row"
      >
        <input
          value={newBio}
          type="text"
          onChange={(e) => setNewBio(e.target.value)}
        />
        <button
          className="sans-serif rounded bg-[#567] px-3 py-2 text-xs font-bold text-p-white"
          onClick={() => updateUserBio(auth.currentUser.uid)}
        >
          Update bio
        </button>
      </div>
      <div className="mt-10 flex items-center justify-center">
        <button
          className="sans-serif rounded bg-[#567] px-3 py-2 text-xs font-bold text-p-white"
          onClick={() => goToProfile(auth.currentUser.uid)}
        >
          Go back to profile
        </button>
        {/* <button onClick={updatePFP}>Update Avatar</button> */}
      </div>
    </>
  );
};

export default ChangeUserInfo;
