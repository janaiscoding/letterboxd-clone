import React from "react";
import storiesData from "./storiesData";
import Story from "./Story";
const RecentStories = () => {
  const stories = storiesData;
  console.log(stories);
  return (
    <>
      <div>RECENT STORIES</div>
      {stories.map((story) => (
        <Story key={story.id} story={story} />
      ))}
    </>
  );
};

export default RecentStories;
