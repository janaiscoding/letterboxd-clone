import React from "react";
import letsYouData from "./lets_you_assets/letsYouData";
import LetsYouCard from "./LetsYouCard";
const LetsYou = () => {
  const data = letsYouData;
  return (
    <div
      className="flex 
      flex-col
      justify-between 
      section-heading 
      text-sh-grey 
      mb-3"
    >
      <p className="text-base mb-2 text-xs">CLONNERBOX LETS YOU...</p>
      <div className="md:grid md:grid-cols-3">
        {data.map((card) => (
          <LetsYouCard
            key={card.id}
            id={card.id}
            icon={card.icon}
            description={card.text}
            bgHov={card.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default LetsYou;
