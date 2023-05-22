import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import searchInputIcon from "./searchinput.png";
import "../../../../styles/modals.css";

const SearchInputMobile = ({
  apiKey,
  fetchRequest,
  setNewDataGained,
  searchMobOpen,
  setSearchMobOpen,
}) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  let searchBarRef = useRef();

  const handleSearchMobile = () => {
    if (query !== "") {
      fetchRequest(
        "https://api.themoviedb.org/3/search/movie?api_key=" +
          apiKey +
          "&query=" +
          query
      );
      setNewDataGained(true);
      navigate("/results/" + query);
    }
    setQuery("");
  };
  useEffect(() => {
    let handler = (e) => {
      const toggler = document.querySelector(".search-icon-mobile")
      if (!searchBarRef.current.contains(e.target) && searchBarRef.current.contains(toggler)) {
        setSearchMobOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  },);

  // let allResponses = movieData.map((movie) => <div>{movie.title}</div>);
  return (
    <div ref={searchBarRef}>
      <div
        className={`p-4 z-50 bg-h-blue search-bar-mobile ${
          searchMobOpen ? "active" : "inactive"
        }`}
      >
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
    </div>
  );
};
export default SearchInputMobile;
