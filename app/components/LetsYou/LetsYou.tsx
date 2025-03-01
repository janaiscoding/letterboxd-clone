import React from "react";
import letsYouData from "./lets_you_assets/letsYouData";
import LetsYouCard from "./LetsYouCard";

export const LetsYou = () => {
  const data = letsYouData;
  return (
    <div className="section-heading text-sh-grey mb-3 flex flex-col justify-between">
      <p className="mb-2 text-base text-xs">CLONNERBOX LETS YOU...</p>
      <div className="md:grid md:grid-cols-3">
        {data.map((card, i) => (
          <LetsYouCard
            key={i}
            icon={card.icon}
            description={card.text}
            bgHov={card.bgColor}
          />
        ))}
      </div>
    </div>
  );
};
