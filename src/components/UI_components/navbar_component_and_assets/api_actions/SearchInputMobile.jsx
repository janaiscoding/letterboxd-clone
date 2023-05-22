import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../navbar_assets/searchIcon.png";
import "../../../../styles/modals.css";

const SearchInputMobile = ({
  apiKey,
  fetchRequest,
  setNewDataGained,
  searchMobOpen,
  setSearchMobOpen,
  searchBarRef,
}) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

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
    setSearchMobOpen(false)
  };
  useEffect(() => {
    let handler = (e) => {
      if (!searchBarRef.current.contains(e.target)) {
        setSearchMobOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div
      className={`p-4 z-50 bg-h-blue search-bar-mobile absolute top-[2.3rem] flex left-0 w-full ${
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
        src={searchIcon}
        onClick={handleSearchMobile}
        width={40}
        height={40}
        className="absolute left-[85%]"
        alt="press the search icon to perform your search"
      />
    </div>
  );
};
export default SearchInputMobile;
