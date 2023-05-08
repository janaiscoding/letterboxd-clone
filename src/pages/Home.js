import React from "react";

const Home = (props) => {
  let movieData = props.props.movieData;
//   let handleUrl = props.props.handleUrl;
  const handleButtonCall = (e) => {
    console.log(e.target.innerText);
  };
  return (
    <>
      This is my Home component and I am rendering {movieData.title} from my
      Api.
      <button onClick={(e) => handleButtonCall(e)}>Suzume</button>
    </>
  );
};

export default Home;
