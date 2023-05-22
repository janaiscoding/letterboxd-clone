import { Link } from "react-router-dom";
import React, { useEffect } from "react";

const NotFound = ({ isNavTransparent, setNavTransparent }) => {
  useEffect(() => {
    isNavTransparent ? setNavTransparent(true) : setNavTransparent(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNavTransparent]);
  return (
    <div className="site-body py-5 min-h-[80vh]">
      <div className="flex flex-col justify-between items-center  gap-4 px-4 md:w-[950px] md:my-0 md:mx-auto font-['Graphik']">
        <p className="text-p-white font-normal text-3xl text-center z-999 relative">
          This page does not actually exist!{" "}
        </p>
        <Link
          to="/"
          className="px-3 py-2 rounded font-bold bg-[#567] text-p-white text-xs sans-serif hover:text-hov-blue"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
