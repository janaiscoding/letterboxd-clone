/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ProfilePoster from "./ProfilePoster";
import { Link } from "react-router-dom";
const UserWatchedFilms = ({ uid, apiKey, watchedIDs, setNewDataGained }) => {
  const [firstFour, setFirstFour] = useState([]);
  useEffect(() => {
    if (watchedIDs.length > 0) {
      const firstFour = watchedIDs.reverse().filter((id, index) => index < 4);
      setFirstFour(firstFour);
    }else {
        setFirstFour([])
    }
  }, [watchedIDs]);

  return (
    <>
      <Link
      to={'/profile/watched/'+uid}
      className="flex 
       justify-start 
      section-heading
      text-sh-grey 
      text-xs
      border-b 
      border-solid 
      border-b-grey 
      mb-2
      md:min-w-[600px]
      hover:text-hov-blue"
      >
        <p>WATCHED FILMS</p>
      </Link>
      <div
        className="flex 
        gap-1
        flex-wrap 
      md:flex-row 
      md:flex-nowrap
      mb-5"
      >
        {firstFour.length === 0
          ? <p className="text-sh-grey text-base pt-2">This user has no watched movies yet.</p>
          : firstFour.map((id) => (
              <ProfilePoster
                apiKey={apiKey}
                key={id}
                movieID={id}
                setNewDataGained={setNewDataGained}
              />
            ))}
      </div>
    </>
  );
};
export default UserWatchedFilms;
