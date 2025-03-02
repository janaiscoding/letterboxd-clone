import { User } from "app/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="my-3 flex">
      <Link href={"/profile/" + user.uid}>
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
            href={"/profile/" + user.uid}
            className="sans-serif text-p-white text-xl font-bold"
          >
            {user.name}
          </Link>
        </div>
        <div>
          <div className="text-sh-grey flex gap-2 text-sm">
            <span>Favourites</span>
            <span className="text-p-white font-bold">
              {user.favourites.length}{" "}
            </span>
          </div>
          <div className="text-sh-grey flex gap-2 text-sm">
            <span> Watched</span>
            <span className="text-p-white font-bold">
              {user.watched.length}{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
