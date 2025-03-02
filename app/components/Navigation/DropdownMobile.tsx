import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SignInWithGoogle } from "../Auth/SignInWithGoogle";
import { SignInWithDemo } from "../Auth/SignInWithDemo";
import { SignOut } from "../Auth/SignOut";
import { auth } from "../../firebase/firebase";

// @to-do click outside
export const DropdownMobile = ({ userName, profilePic }) => {
  const dropdownList = [
    {
      id: "1",
      name: "Home",
      link: "/",
    },
    {
      id: "2",
      name: "Films",
      link: "/films",
    },
    {
      id: "3",
      name: "Members",
      link: "/members",
    },
    {
      id: "4",
      name: "Reviews",
      link: "/reviews",
    },
  ];

  return (
    <div
      className="mobile-dropdown-nav active sans-serif bg-h-blue static absolute left-0 top-[2.3rem] z-50
        w-full flex-col rounded-sm p-2"
    >
      {auth.currentUser?.uid && (
        <div className="mx-4 flex items-center gap-1 py-1">
          <Link href={"/profile/" + auth.currentUser.uid}>
            <Image
              src={profilePic}
              alt={userName}
              width={24}
              height={24}
              className="rounded-xl"
            />
          </Link>
          <Link
            href={"/profile/" + auth.currentUser.uid}
            className=" text-p-white hover:text-p-white font-semibold uppercase hover:cursor-pointer"
          >
            {userName}
          </Link>
        </div>
      )}

      <ul className="sans-serif bg-h-blue text-sh-grey mx-3 rounded-sm py-3 font-bold uppercase tracking-widest">
        <li className="divider-mobile"></li>

        <li className="grid grid-cols-2 py-2">
          {dropdownList.map((L) => (
            <Link
              key={L.id}
              className="hover:text-p-white mx-3 py-1"
              href={L.link}
            >
              {L.name}
            </Link>
          ))}
        </li>
        <li className="divider-mobile"></li>
        {auth.currentUser ? (
          <li className="mx-3 grid grid-cols-2 py-3">
            <Link href="/settings" className="block pt-2">
              Settings
            </Link>
            <SignOut />
          </li>
        ) : (
          <li className="grid grid-cols-2 pt-3">
            <SignInWithGoogle />
            <SignInWithDemo />
          </li>
        )}
      </ul>
    </div>
  );
};
