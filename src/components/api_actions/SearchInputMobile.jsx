import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchInputIcon from "./searchinput.png";
const SearchInputMobile = ({ apiKey, fetchRequest }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchMobile = () => {
    fetchRequest(
      "https://api.themoviedb.org/3/search/movie?api_key=" +
        apiKey +
        "&query=" +
        query
    );
    const SIM = document.querySelector(".search-bar-mobile");
    SIM.classList.add("hidden");
    setQuery("");
    navigate("/results/" + query);
  };

  // let allResponses = movieData.map((movie) => <div>{movie.title}</div>);
  return (
    <div className="p-4">
      <label htmlFor="search" className="hidden">
        Search:
      </label>
      <input
        id="search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
        rounded
        text-base
        h-9
        w-full
        py-1.5
        pl-2.5
        pr-8
        bg-if-blue
        text-drop-grey
        focus:bg-white
        focus:outline-none
        "
      />
      <img
        src={searchInputIcon}
        onClick={handleSearchMobile}
        width={35}
        height={35}
        alt="icon for searching"
        className="
        absolute
        right-9
        top-14
        "
      />
    </div>
  );
};
export default SearchInputMobile;
