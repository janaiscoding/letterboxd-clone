import React from "react";
import "../../styles/started.css";

const GetStarted = () => {
  return (
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
        className="backdropimage  h-[300px]  md:h-[650px] md:w-full top-0"
      ></img>

      {/* <div className="flex flex-col items-center relative">
        <div className="font-bold">
          <p>Track films you’ve watched.</p>
          <p>Save those you want to see.</p>
          <p>Tell your friends what’s good.</p>
        </div>
        <button>GET STARTED - IT'S FREE!</button>

        <div className="flex items-center gap-2">
          <p>The social network for film lovers.</p>
          <p>Also available on iOS, Apple TV and Android</p>
        </div>
      </div> */}
    </div>
  );
};

export default GetStarted;
