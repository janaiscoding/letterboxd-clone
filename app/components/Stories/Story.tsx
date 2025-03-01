import React from "react";
import Image from "next/image";

export const Story = ({ story }) => {
  return (
    <article className="bg-c-blue mr-3 min-w-[240px] rounded md:mb-3">
      <p>
        <Image
          className="w-full rounded md:h-[198px] md:w-[352px]"
          src={story.img}
          alt={story.title}
          width={240}
          height={135}
          loading="lazy"
        />
      </p>
      <div className="p-3">
        <p className="text-p-white hover:text-hov-blue mt-1 text-xl font-bold hover:cursor-pointer">
          {" "}
          {story.title}
        </p>
        <p className="card-description text-sh-grey "> {story.description}</p>
        <p className="text-p-white hover:text-hov-blue mt-8 text-xs font-bold hover:cursor-pointer">
          READ STORY
        </p>
      </div>
    </article>
  );
};
