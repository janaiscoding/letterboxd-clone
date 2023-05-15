import React from "react";
import storiesData from "./storiesData";
import Story from "./Story";
const RecentStories = () => {
  const stories = storiesData;
  console.log(stories);
  return (
    <>
      <div>RECENT STORIES</div>
      <div className="columns-3">
      {stories.map((story) => (
        <Story key={story.id} story={story} />
      ))}
      </div>
    </>
  );
};

export default RecentStories;
