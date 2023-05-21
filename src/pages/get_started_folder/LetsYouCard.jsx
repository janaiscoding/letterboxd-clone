import React, { useState } from "react";

const LetsYouCard = ({ id, icon, description, bgHov }) => {
  const [background, setBackground] = useState("");

  return (
    <div
      className="flex rounded md:mr-3 mb-3 py-4 bg-b-grey text-p-white px-5 hover:cursor-pointer"
      id={id}
      onMouseEnter={() => setBackground(bgHov)}
      onMouseLeave={() => setBackground("#456")}
      style={{ backgroundColor: background }}
    >
      <img
        src={icon}
        id={id + 1}
        className="self-start opacity-50"
        width={33}
        height={50}
        alt="card icon"
        loading="lazy"
      />
      <p id={id + 2} className="ml-5 text-xs">
        {description}
      </p>
    </div>
  );
};

export default LetsYouCard;
