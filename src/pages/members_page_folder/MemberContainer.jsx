import React from "react";
import { Link } from "react-router-dom";

const MemberContainer = ({ user }) => {
  return (
    <div className="flex my-3">
      <Link to={"/profile/" + user.uid}>
        <img
          src={user.photoUrl}
          alt="your user profile"
          width={85}
          height={85}
          className="rounded-[50px] border-solid border border-[#678] hover:border-sh-grey hover:cursor-pointer md:w-[100px] md:h-[100px] "
        />
      </Link>
      <div className=" ml-4 mt-3 md:flex md:flex-col md:items-start md:gap-1 ">
        <div className="md:flex-row md:gap-2 w-full md:flex">
          <Link
            to={"/profile/" + user.uid}
            className="sans-serif text-p-white font-bold text-2xl"
          >
            {user.name}
          </Link>
        </div>
        <div>
          <Link to={"/profile/favourites/" + user.uid} className="text-sh-grey flex gap-1 text-base">
            Favourite{" "}
            <span className="text-p-white font-bold">
              {user.favourites.length}{" "}
            </span>
          </Link>
          <Link to={"/profile/watched/" + user.uid} className="text-sh-grey text-base">
            Watched{" "}
            <span className="text-p-white font-bold">
              {user.watched.length}{" "}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MemberContainer;
