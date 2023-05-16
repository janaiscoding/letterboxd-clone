import React from "react";
import "../../styles/card.css";

const Story = ({ story }) => {
  return (
    <article
      className="bg-c-blue
      rounded
    min-w-[240px]
    md:mb-3
    mr-3
    "
    >
      <a href={story.link}>
        <img
          className="w-full
        h-[135px]
        w-[240px]
        md:h-[198px]
        md:w-[352px]
        rounded
        hover:cursor-pointer
        "
          src={story.img}
          alt={story.title}
          width={352}
          height={198}
        />
      </a>
      <div className="p-3">
        <a
          href={story.link}
          className="mt-1 text-p-white font-bold text-xl hover:cursor-pointer hover:text-hov-blue"
        >
          {" "}
          {story.title}
        </a>
        <p className="text-sh-grey card-description "> {story.description}</p>
        <a
          href={story.link}
          className="text-p-white font-bold text-xs mt-8 hover:text-hov-blue hover:cursor-pointer"
        >
          READ STORY
        </a>
      </div>
    </article>
  );
};

export default Story;
