import React from 'react';
import { Link } from 'react-router-dom';
const LatestNews = () => {
  let url =
    'https://a.ltrbxd.com/resized/sm/upload/ym/n6/g5/14/5130362-620-620-348-348-crop-fill.jpg?k=0bcaefc03e';
  return (
    <>
      <div
        className="section-heading 
      mb-3 
      flex 
      justify-between 
      border-b 
      border-solid 
      border-b-grey 
      text-sm 
      text-sh-grey "
      >
        <p className="text-sm   hover:cursor-pointer hover:text-hov-blue">
          LATEST NEWS
        </p>
        <p className="text-[11px] hover:cursor-pointer hover:text-hov-blue">
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
        <img
          src={url}
          width={310}
          height={174}
          alt="latest news post"
          loading="lazy"
          className="w-full rounded md:w-[32%]"
        />
        <div className="bg-c-blue md:p-4">
          <h1
            className="mt-2 
            pl-3
          text-xl 
          font-bold 
          tracking-wider 
          text-p-white
          hover:cursor-pointer 
          hover:text-hov-blue
          md:mt-0
          "
          >
            Mamma mia!
          </h1>
          <p className="my-1.5 pl-3 text-sh-grey">
            The Letterboxd crew celebrates Mother’s Day 2023 by asking our own
            moms about their favorite films.
            <Link
              to="/journal"
              className="text-[11px] font-bold text-p-white hover:text-hov-blue"
            >
              {' '}
              READ MORE
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LatestNews;
