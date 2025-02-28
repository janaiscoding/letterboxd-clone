import Image from "next/image";
import React from "react";
import { Link } from "react-router-dom";

const MemberContainer = ({ user }) => {
  return (
    <div className="my-3 flex">
      <Link to={"/profile/" + user.uid}>
        <Image
          src={user.photoUrl}
          alt="your user profile"
          className="member__avatar hover:border-sh-grey rounded-[50px]
        border border-solid border-[#678] hover:cursor-pointer"
          width={300}
          height={300}
        />
      </Link>
      <div className=" ml-4 mt-3 md:flex md:flex-col md:items-start md:gap-1 ">
        <div className="w-full md:flex md:flex-row md:gap-2">
          <Link
            to={"/profile/" + user.uid}
            className="sans-serif text-p-white text-2xl font-bold"
          >
            {user.name}
          </Link>
        </div>
        <div>
          <Link
            to={"/profile/favourites/" + user.uid}
            className="text-sh-grey flex gap-1 text-base"
          >
            Favourite{" "}
            <span className="text-p-white font-bold">
              {user.favourites.length}{" "}
            </span>
          </Link>
          <Link
            to={"/profile/watched/" + user.uid}
            className="text-sh-grey text-base"
          >
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
