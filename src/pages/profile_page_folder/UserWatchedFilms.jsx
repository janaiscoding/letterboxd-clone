/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ProfilePoster from "./ProfilePoster";
const UserWatchedFilms = ({ apiKey, watchedIDs, setNewDataGained }) => {
  const [firstSix, setFirstSix] = useState([]);
  useEffect(() => {
    if (watchedIDs.length > 0) {
      console.log("true");
      const firstSix = watchedIDs.reverse().filter((id, index) => index < 6);
      setFirstSix(firstSix);
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
      mb-2"
      >
        <p>WATCHED FILMS</p>
      </div>
      <div
        className="flex 
      flex-wrap 
      justify-between 
      md:flex-row 
      md:flex-nowrap
      mb-10"
      >
        {firstSix.length === 0
          ? ""
          : firstSix.map((id) => (
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
