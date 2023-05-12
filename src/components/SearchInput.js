import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SearchInput = ({ handleUrl }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    handleUrl(query);
    navigate("/results");
  };

  // let allResponses = movieData.map((movie) => <div>{movie.title}</div>);
  return (
    <div className="search-section">
      <input value={query} onChange={(e) => setQuery(e.target.value)}></input>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
export default SearchInput;
