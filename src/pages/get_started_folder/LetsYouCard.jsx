import React from "react";

const LetsYouCard = ({ id, icon, description, bgHov }) => {
  let hoverColor = "hover:bg-" + bgHov;
  const toggleHover = () => {
    const Card = document.getElementById(id);
    Card.classList.contains(hoverColor)
      ? Card.classList.remove(hoverColor)
      : Card.classList.add(hoverColor);
    const cardImg = document.getElementById(id + 1);
    if (cardImg.classList.contains("opacity-50")) {
      cardImg.classList.remove("opacity-50");
      cardImg.classList.add("opacity-100");
    } else {
      cardImg.classList.add("opacity-50");
      cardImg.classList.remove("opacity-100");
    }
  };
  return (
    <div
      className="flex rounded md:mr-3 mb-3 bg-b-grey py-4 text-p-white px-5 hover:cursor-pointer"
      id={id}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <img
        src={icon}
        id={id + 1}
        className="self-start opacity-50"
        width={33}
        height={50}
        alt="card icon"
      />
      <p id={id + 2} className="ml-5 text-xs">
        {description}
      </p>
    </div>
  );
};

export default LetsYouCard;
