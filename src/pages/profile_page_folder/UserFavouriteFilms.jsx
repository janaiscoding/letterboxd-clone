/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ProfilePoster from './ProfilePoster';
import { Link } from 'react-router-dom';
const UserFavouriteFilms = ({ uid, favIDs, setNewDataGained }) => {
  const [firstFour, setFirstFour] = useState([]);
  useEffect(() => {
    if (favIDs.length > 0) {
      const firstFour = favIDs.reverse().filter((id, index) => index < 4);
      setFirstFour(firstFour);
    } else {
      setFirstFour([]);
    }
  }, [favIDs]);

  return (
    <>
      <Link
        to={'/profile/favourites/' + uid}
        className="align-start 
      section-heading 
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
        <p>FAVORITE FILMS</p>
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
            This user has no favourite movies yet.
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
export default UserFavouriteFilms;
