import React from "react";

const LatestNews = () => {
  let url =
    "https://a.ltrbxd.com/resized/sm/upload/ym/n6/g5/14/5130362-620-620-348-348-crop-fill.jpg?k=0bcaefc03e";
  return (
    <>
      <img src={url} width={310} height={174} alt="latest news post" />
      <div>
        <p>Mamma mia!</p>
        <p>
          The Letterboxd crew celebrates Mother’s Day 2023 by asking our own
          moms about their favorite films. READ MORE
        </p>
      </div>
    </>
  );
};

export default LatestNews;
