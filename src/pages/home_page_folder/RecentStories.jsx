import React from "react";
import storiesData from "./storiesData";
import Story from "./Story";

const RecentStories = () => {
  const stories = storiesData;
  return (
    <>
      <div
        className="flex 
      justify-between 
      section-heading 
      text-sh-grey  
      border-b 
      border-solid 
      border-b-grey 
      mb-3 "
      >
        <p className="text-sm  hover:text-hov-blue hover:cursor-pointer">
          RECENT STORIES
        </p>
        <p className="text-[11px] hover:text-hov-blue hover:cursor-pointer">
          ALL HQS
        </p>
      </div>
      <div
        className="mt-1 
      flex  
      flex-row 
      overflow-x-auto 
      overflow-hidden
      md:grid
      md:grid-cols-3
      "
      >
        {stories.map((story) => (
          <Story key={story.id} story={story} />
        ))}
      </div>
    </>
  );
};

export default RecentStories;
