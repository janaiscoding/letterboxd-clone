import React from 'react';
import storiesData from './storiesData';
import Story from './Story';

const RecentStories = () => {
  const stories = storiesData;
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
      text-sh-grey "
      >
        <p className="text-sm  hover:cursor-pointer hover:text-hov-blue">
          RECENT STORIES
        </p>
        <p className="text-[11px] hover:cursor-pointer hover:text-hov-blue">
          ALL HQS
        </p>
      </div>
      <div
        className="mt-1 
      flex  
      flex-row 
      overflow-hidden 
      overflow-x-auto
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
