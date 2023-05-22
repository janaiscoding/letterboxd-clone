/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ProfilePoster from "./ProfilePoster";
import { Link } from "react-router-dom";
const UserFavouriteFilms = ({uid, apiKey, favIDs, setNewDataGained }) => {
  const [firstFour, setFirstFour] = useState([]);
  useEffect(() => {
    if (favIDs.length > 0) {
      const firstFour = favIDs.reverse().filter((id, index) => index < 4);
      setFirstFour(firstFour);
    }else {
        setFirstFour([])
    }
  }, [favIDs]);

  return (
    <>
      <Link to={'/profile/favourites/'+uid }
        className="flex 
      align-start 
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
        <p>FAVORITE FILMS</p>
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
          ?  <p className="text-sh-grey text-base pt-2">This user has no favourite movies yet.</p>
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
export default UserFavouriteFilms;
