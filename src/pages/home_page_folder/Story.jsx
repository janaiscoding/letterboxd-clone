import React from 'react';
import '../../styles/card.css';

const Story = ({ story }) => {
  return (
    <article
      className="mr-3
      min-w-[240px]
    rounded
    bg-c-blue
    md:mb-3
    "
    >
      <p>
        <img
          className="h-[135px]
        w-[240px]
        w-full
        rounded
        md:h-[198px]
        md:w-[352px]
        "
          src={story.img}
          alt={story.title}
          loading="lazy"
        />
      </p>
      <div className="p-3">
        <p className="mt-1 text-xl font-bold text-p-white hover:cursor-pointer hover:text-hov-blue">
          {' '}
          {story.title}
        </p>
        <p className="card-description text-sh-grey "> {story.description}</p>
        <p className="mt-8 text-xs font-bold text-p-white hover:cursor-pointer hover:text-hov-blue">
          READ STORY
        </p>
      </div>
    </article>
  );
};

export default Story;
