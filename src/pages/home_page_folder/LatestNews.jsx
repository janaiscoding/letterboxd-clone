import React from "react";
import { Link } from "react-router-dom";
const LatestNews = () => {
  let url =
    "https://a.ltrbxd.com/resized/sm/upload/ym/n6/g5/14/5130362-620-620-348-348-crop-fill.jpg?k=0bcaefc03e";
  return (
    <>
      <div
        className="flex 
      justify-between 
      section-heading 
      text-sh-grey 
      text-sm 
      border-b 
      border-solid 
      border-b-grey 
      mb-3 "
      >
        <p className="text-sm   hover:text-hov-blue hover:cursor-pointer">
          LATEST NEWS
        </p>
        <p className="text-[11px] hover:text-hov-blue hover:cursor-pointer">
          MORE
        </p>
      </div>
      <div
        className="flex 
      flex-col
      md:flex-row
       mb-9
       pb-9"
      >
        <img
          src={url}
          width={310}
          height={174}
          alt="latest news post"
          className="
        w-full
        rounded
        md:w-[32%]
      "
        />
        <div
          className="bg-c-blue
        md:p-8
        "
        >
          <h1
            className="text-p-white 
            pl-3
          mt-2 
          text-xl 
          font-bold 
          tracking-wider
          hover:cursor-pointer 
          hover:text-hov-blue
          md:mt-0
          "
          >
            Mamma mia!
          </h1>
          <p className="pl-3 my-1.5 text-sh-grey">
            The Letterboxd crew celebrates Mother’s Day 2023 by asking our own
            moms about their favorite films.
            <Link
              to="/journal"
              className="text-[11px] text-p-white font-bold hover:text-hov-blue"
            >
              {" "}
              READ MORE
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LatestNews;
