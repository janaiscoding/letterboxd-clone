import React from "react";
import { Link } from "react-router-dom";

const UserCounts = ({
  favCount,
  watchedCount,
  uid,
}) => {

  return (
    <div className="flex p-3">
      <Link to={'/profile/favourites/'+uid } className="flex flex-col items-center justify-center px-3 
                  hover:text-hov-blue
                  text-p-white
            hover:cursor-pointer">
        <h1 className=" font-bold text-2xl">{favCount}</h1>
        <p className=" sans-serif text-xs ">
          FAVOURITES
        </p>
      </Link>
      <Link to={'/profile/watched/'+uid } className="flex flex-col items-center justify-center border-l border-[#6677884f] border-solid px-3
            hover:text-hov-blue
            text-p-white
      hover:cursor-pointer">
        <h1 className="font-bold text-2xl">{watchedCount}</h1>
        <p className="sans-serif text-xs">
          WATCHED
        </p>
      </Link>
    </div>
  );
};
export default UserCounts;
