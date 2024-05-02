/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ProfilePoster from './ProfilePoster';
import { Link } from 'react-router-dom';
const UserWatchedFilms = ({ uid, watchedIDs, setNewDataGained }) => {
  const [firstFour, setFirstFour] = useState([]);
  useEffect(() => {
    if (watchedIDs.length > 0) {
      const firstFour = watchedIDs.reverse().filter((id, index) => index < 4);
      setFirstFour(firstFour);
    } else {
      setFirstFour([]);
    }
  }, [watchedIDs]);

  return (
    <>
      <Link
        to={'/profile/watched/' + uid}
        className="section-heading 
       mb-2 
      flex
      justify-between 
      border-b
      border-solid 
      border-b-grey 
      text-xs 
      text-sh-grey
      hover:text-hov-blue
      md:min-w-[600px]"
      >
        <p>WATCHED FILMS</p>
        <p> SEE ALL</p>
      </Link>
      <div
        className="mb-5 
        flex
        flex-wrap 
      gap-1 
      md:flex-row
      md:flex-nowrap"
      >
        {firstFour.length === 0 ? (
          <p className="pt-2 text-base text-sh-grey">
            This user has no watched movies yet.
          </p>
        ) : (
          firstFour.map((id) => (
            <ProfilePoster
              key={id}
              movieID={id}
              setNewDataGained={setNewDataGained}
            />
          ))
        )}
      </div>
    </>
  );
};
export default UserWatchedFilms;
