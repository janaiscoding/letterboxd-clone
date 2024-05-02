import React from 'react';
import { Link } from 'react-router-dom';

const UserCounts = ({ favCount, watchedCount, uid }) => {
  return (
    <div className="flex p-3">
      <Link
        to={'/profile/favourites/' + uid}
        className="flex flex-col items-center justify-center px-3 
                  text-p-white
                  hover:cursor-pointer
            hover:text-hov-blue"
      >
        <h1 className=" text-2xl font-bold">{favCount}</h1>
        <p className=" sans-serif text-xs ">FAVOURITES</p>
      </Link>
      <Link
        to={'/profile/watched/' + uid}
        className="flex flex-col items-center justify-center border-l border-solid border-[#6677884f] px-3
            text-p-white
            hover:cursor-pointer
      hover:text-hov-blue"
      >
        <h1 className="text-2xl font-bold">{watchedCount}</h1>
        <p className="sans-serif text-xs">WATCHED</p>
      </Link>
    </div>
  );
};
export default UserCounts;
