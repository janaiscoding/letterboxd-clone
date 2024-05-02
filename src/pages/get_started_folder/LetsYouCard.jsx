import React, { useState } from 'react';

const LetsYouCard = ({ id, icon, description, bgHov }) => {
  const [background, setBackground] = useState('');

  return (
    <div
      className="mb-3 flex rounded bg-b-grey px-5 py-4 text-p-white hover:cursor-pointer md:mr-3"
      id={id}
      onMouseEnter={() => setBackground(bgHov)}
      onMouseLeave={() => setBackground('#456')}
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
