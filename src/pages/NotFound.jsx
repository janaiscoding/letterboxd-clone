import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

const NotFound = ({ isNavTransparent, setNavTransparent }) => {
  useEffect(() => {
    isNavTransparent ? setNavTransparent(true) : setNavTransparent(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNavTransparent]);
  return (
    <div className="site-body min-h-[80vh] py-5">
      <div className="flex flex-col items-center justify-between  gap-4 px-4 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px]">
        <p className="z-999 relative text-center text-3xl font-normal text-p-white">
          This page does not actually exist!
        </p>
        <p className="text-p-white"> simply a 404 placeholder ;)</p>
        <Link
          to="/"
          className="sans-serif rounded bg-[#567] px-3 py-2 text-xs font-bold text-p-white hover:text-hov-blue"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
