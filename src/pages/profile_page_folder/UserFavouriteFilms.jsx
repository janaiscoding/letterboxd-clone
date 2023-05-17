/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ProfilePoster from "./ProfilePoster";
const UserFavouriteFilms = ({ apiKey, favIDs,setNewDataGained }) => {
  const [firstSix, setFirstSix] = useState([]);
  useEffect(() => {
    console.log(favIDs.length);
    if (favIDs.length > 0) {
      console.log("true");
      const firstSix = favIDs.reverse().filter((id, index) => index < 6);
      setFirstSix(firstSix);
    }
    console.log(firstSix, 'first six');
  }, [favIDs]);

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
        <p>FAVORITE FILMS</p>
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
export default UserFavouriteFilms;
