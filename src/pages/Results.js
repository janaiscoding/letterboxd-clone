import React, { useEffect } from "react";

const Results = ({ results }) => {
    useEffect(()=>{
        console.log(results)
    })
  return <div>results page</div>;
};

export default Results;
