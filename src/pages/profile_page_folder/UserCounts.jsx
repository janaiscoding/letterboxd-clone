import React from "react";

const UserCounts = ({
  favCount,
  watchedCount,

}) => {

  return (
    <div className="flex p-3">
      <div className="flex flex-col items-center justify-center px-3 hover:cursor-pointer">
        <h1 className="text-p-white font-bold text-2xl">{favCount}</h1>
        <p className="text-sh-grey sans-serif text-xs hover:text-hov-blue hover:cursor-pointer">
          FAVOURITES
        </p>
      </div>
      <div className="flex flex-col items-center justify-center border-l border-[#6677884f] border-solid px-3 hover:cursor-pointer">
        <h1 className="text-p-white font-bold text-2xl">{watchedCount}</h1>
        <p className="text-sh-grey sans-serif text-xs hover:text-hov-blue hover:cursor-pointer">
          WATCHED
        </p>
      </div>
    </div>
  );
};
export default UserCounts;
