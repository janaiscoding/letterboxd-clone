import Link from "next/link";
import React from "react";

export const IntroMessage = ({ user }: { user: any }) => {
  return (
    <>
      <div className="text-h-grey text-center text-3xl font-normal">
        Welcome,{" "}
        <Link
          href={"/profile/" + user.uid}
          className="border-h-grey text-p-white hover:border-p-white border-b border-solid"
        >
          {user.displayName}
        </Link>
        .{" "}
        <span className="hidden pb-2 md:inline-block">
          Start your movie tracking journey now!
        </span>
      </div>
      <p className="text-h-grey mb-8 text-center text-lg md:mb-8">
        On Clonnerboxd you can...{" "}
        <Link
          href={"/profile/" + user.uid}
          className="text-p-white hover:text-hov-blue"
        >
          See your profile
        </Link>
        {" | "}
        <Link href="/members" className="text-p-white hover:text-hov-blue">
          See the registed members
        </Link>
        {" | "}
        <Link href="/films" className="text-p-white hover:text-hov-blue">
          Filter movies based on your criteria
        </Link>
        {" | "}
        <Link href="/reviews" className="text-p-white hover:text-hov-blue">
          Read all the reviews on the platform
        </Link>
        <span className="text-h-grey">
          {" "}
          or press the search icon in the header, and leave a review to your
          favorite movie!
        </span>
      </p>
    </>
  );
};
