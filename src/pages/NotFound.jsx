import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { auth } from "../firebase/firebase";
const NotFound = ({  isNavTransparent, setNavTransparent }) => {
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
        <p className="text-center mb-8 md:mb-8 text-lg text-h-grey">
          Or other things to do on Clonnerboxd...{" "}
          <Link
            to={"/profile/" + auth.currentUser.uid}
            className="text-p-white hover:text-hov-blue"
          >
            See your profile
          </Link>
          {" | "}
          <Link to="/members" className="text-p-white hover:text-hov-blue">
            See the registed members
          </Link>
          {" | "}
          <Link to="/films" className="text-p-white hover:text-hov-blue">
            Filter movies based on your criteria
          </Link>
          <span className="text-h-grey">
            {" "}
            or search for any movie in the navbar. Hope you enjoy your stay!
          </span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
