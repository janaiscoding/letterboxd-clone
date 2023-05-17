/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ProfilePoster from "./ProfilePoster";
const UserWatchedFilms = ({ apiKey, watchedIDs, setNewDataGained }) => {
  const [firstFour, setFirstFour] = useState([]);
  useEffect(() => {
    if (watchedIDs.length > 0) {
      const firstFour = watchedIDs.reverse().filter((id, index) => index < 6);
      setFirstFour(firstFour);
    }else {
        setFirstFour([])
    }
  }, [watchedIDs]);

  return (
    <>
      <div
        className="flex 
      justify-between 
      section-heading
      text-sh-grey 
      text-xs
      border-b 
      border-solid 
      border-b-grey 
      mb-2
      md:min-w-[600px]"
      >
        <p>WATCHED FILMS</p>
      </div>
      <div
        className="flex 
        gap-1
        flex-wrap 
        justify-between
      md:flex-row 
      md:flex-nowrap
      mb-10"
      >
        {firstFour.length === 0
          ? <p className="text-sh-grey text-base pt-2">Go to any movie you like and press that eye icon!</p>
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
