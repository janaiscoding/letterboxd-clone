import React from "react";
import storiesData from "./storiesData";
import Story from "./Story";
import { Link } from "react-router-dom";
const RecentStories = () => {
  const stories = storiesData;
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
        <Link to="/journal" className="text-base/[13px]  hover:text-hov-blue">
          RECENT STORIES
        </Link>
        <Link to="/journal" className="text-[11px] hover:text-hov-blue">
          ALL HQS
        </Link>
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
