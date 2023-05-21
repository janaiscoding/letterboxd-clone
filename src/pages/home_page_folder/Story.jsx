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
      <p>
        <img
          className="w-full
        h-[135px]
        w-[240px]
        md:h-[198px]
        md:w-[352px]
        rounded
        "
          src={story.img}
          alt={story.title}
          loading="lazy"
        />
      </p>
      <div className="p-3">
        <p className="mt-1 text-p-white font-bold text-xl hover:cursor-pointer hover:text-hov-blue">
          {" "}
          {story.title}
        </p>
        <p className="text-sh-grey card-description "> {story.description}</p>
        <p className="text-p-white font-bold text-xs mt-8 hover:text-hov-blue hover:cursor-pointer">
          READ STORY
        </p>
      </div>
    </article>
  );
};

export default Story;
