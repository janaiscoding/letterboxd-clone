import React from "react";
import "../../styles/started.css";

const GetStarted = () => {
  return (
    <>
      <div
        className="
      backdrop-container
        h-[200px]
        md:h-[650px]
    "
      >
        <img
          alt="backdrop"
          src="https://a.ltrbxd.com/resized/sm/upload/tx/hy/xj/lw/sanctuary-2023-1200-1200-675-675-crop-000000.jpg?v=b1d98010cd"
          className="backdropimage  h-[300px]  md:h-[650px] w-full z-[-99]"
        ></img>
      </div>
      <div
        className="flex 
      md:gradient-helper
      flex-col 
      items-center 
      relative 
      mt-[5%]
      md:mt-[-15%] 
      gap-2 
      z-50"
      >
        <div className="font-bold gradient-helper-mobile text-2xl md:text-5xl text-[#fff] text-center">
          <p>Track films you’ve watched.</p>
          <p>Save those you want to see.</p>
          <p>Tell your friends what’s good.</p>
        </div>
        <button
          className="bg-b-green
        h-10
        rounded
        text-base
        md:text-l 
        text-[#fff]
        px-5
        md:px-8
        mt-1
        sans-serif
        hover:bg-b-h-green
        "
        >
          GET STARTED - IT'S FREE!
        </button>

        <div
          className="flex 
          sans-serif
        flex-col
        md:flex-row
        items-center 
        gap-2
        text-xs
        md:text-base
        md:text-xl 
        text-sh-grey  
        my-2"
        >
          <p>The social network for film lovers.</p>
          <p>Also available on iOS, Apple TV and Android</p>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
