import React from "react";
import storiesData from "./storiesData";
import { Story } from "./Story";

export const RecentStories = () => {
  const stories = storiesData;
  return (
    <>
      <div className="section-heading border-b-grey text-sh-grey mb-3  flex justify-between border-b border-solid ">
        <p className="hover:text-hov-blue  text-sm hover:cursor-pointer">
          RECENT STORIES
        </p>
        <p className="hover:text-hov-blue text-[11px] hover:cursor-pointer">
          ALL HQS
        </p>
      </div>
      <div className="mt-1 flex flex-row overflow-hidden overflow-x-auto md:grid md:grid-cols-3">
        {stories.map((story, i) => (
          <Story key={i} story={story} />
        ))}
      </div>
    </>
  );
};
