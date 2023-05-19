import { Link } from "react-router-dom";
import React, { useEffect } from "react";
const NotFound = ({ isNavTransparent, setNavTransparent }) => {
  useEffect(() => {
    isNavTransparent ? setNavTransparent(true) : setNavTransparent(false);
    console.log(isNavTransparent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNavTransparent]);
  return (
    <div className="site-body py-5">
      <div
        className="started-backdrop block md:h-[650px] md:mt-[-10%] md:max-h-[650px] md:w-[950px] md:m-auto max-h-[250px] h-[250px]"
        style={{
          backgroundImage: `url(https://a.ltrbxd.com/resized/sm/upload/tx/hy/xj/lw/sanctuary-2023-1200-1200-675-675-crop-000000.jpg?v=b1d98010cd)`,
        }}
      ></div>
      <div className="flex flex-col justify-between px-4 md:w-[950px] md:my-0 md:mx-auto font-['Graphik']">
        <div className="text-p-white font-normal text-3xl text-center z-999 relative">
          Oops! This page does not actually exist!
        </div>
        <Link
          to="/"
          className="z-999 relative text-p-white font-bold text-3xl text-center hover:text-hov-blue"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
