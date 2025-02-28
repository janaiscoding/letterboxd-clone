import Image from "next/image";
import React from "react";
import { Link } from "react-router-dom";
const LatestNews = () => {
  let url =
    "https://a.ltrbxd.com/resized/sm/upload/ym/n6/g5/14/5130362-620-620-348-348-crop-fill.jpg?k=0bcaefc03e";
  return (
    <>
      <div
        className="section-heading 
      border-b-grey 
      text-sh-grey 
      mb-3 
      flex 
      justify-between 
      border-b 
      border-solid 
      text-sm "
      >
        <p className="hover:text-hov-blue   text-sm hover:cursor-pointer">
          LATEST NEWS
        </p>
        <p className="hover:text-hov-blue text-[11px] hover:cursor-pointer">
          MORE
        </p>
      </div>
      <div
        className="mb-9 
      flex
      flex-col
       pb-9
       md:flex-row"
      >
        <Image
          src={url}
          width={310}
          height={174}
          alt="latest news post"
          loading="lazy"
          className="w-full rounded
        md:w-[32%]"
        />
        <div className="bg-c-blue md:p-4">
          <h1
            className="text-p-white 
            hover:text-hov-blue
          mt-2 
          pl-3 
          text-xl 
          font-bold
          tracking-wider 
          hover:cursor-pointer
          md:mt-0
          "
          >
            Mamma mia!
          </h1>
          <p className="text-sh-grey my-1.5 pl-3">
            The Letterboxd crew celebrates Mother’s Day 2023 by asking our own
            moms about their favorite films.
            <Link
              to="/journal"
              className="text-p-white hover:text-hov-blue text-[11px] font-bold"
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
