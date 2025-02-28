import Image from "next/image";
import React, { useState } from "react";

const LetsYouCard = ({ id, icon, description, bgHov }) => {
  const [background, setBackground] = useState("");

  return (
    <div
      className="bg-b-grey text-p-white mb-3 flex rounded px-5 py-4 hover:cursor-pointer md:mr-3"
      id={id}
      onMouseEnter={() => setBackground(bgHov)}
      onMouseLeave={() => setBackground("#456")}
      style={{ backgroundColor: background }}
    >
      <Image
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
