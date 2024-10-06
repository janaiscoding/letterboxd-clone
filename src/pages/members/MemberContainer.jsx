import React from 'react';
import { Link } from 'react-router-dom';

const MemberContainer = ({ user }) => {
  return (
    <div className="my-3 flex">
      <Link to={'/profile/' + user.uid}>
        <img
          src={user.photoUrl}
          alt="your user profile"
          width={85}
          height={85}
          className="rounded-[50px] border border-solid border-[#678] hover:cursor-pointer hover:border-sh-grey md:h-[100px] md:w-[100px] "
        />
      </Link>
      <div className=" ml-4 mt-3 md:flex md:flex-col md:items-start md:gap-1 ">
        <div className="w-full md:flex md:flex-row md:gap-2">
          <Link
            to={'/profile/' + user.uid}
            className="sans-serif text-2xl font-bold text-p-white"
          >
            {user.name}
          </Link>
        </div>
        <div>
          <Link
            to={'/profile/favourites/' + user.uid}
            className="flex gap-1 text-base text-sh-grey"
          >
            Favourite{' '}
            <span className="font-bold text-p-white">
              {user.favourites.length}{' '}
            </span>
          </Link>
          <Link
            to={'/profile/watched/' + user.uid}
            className="text-base text-sh-grey"
          >
            Watched{' '}
            <span className="font-bold text-p-white">
              {user.watched.length}{' '}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MemberContainer;
