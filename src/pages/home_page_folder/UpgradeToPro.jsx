import React from "react";

const UpgradeToPro = () => {
  let url =
    "https://a.ltrbxd.com/resized/sm/upload/j8/gt/r8/ss/pro-950-0-950-0-0.png?k=bc62c7df04";
  let mobileUrl =
    "https://a.ltrbxd.com/sm/upload/1n/js/vs/bi/pro-mobile.png?k=8ce50124d8";
  return (
    <>
      <img
        className="block md:hidden mb-8 self-center"
        src={mobileUrl}
        alt="upgrade to pro banner"
      />
      <img
        className="hidden md:block mb-8 self-center"
        src={url}
        alt="upgrade to pro banner"
        height={100}
        width={950}
      />
    </>
  );
};

export default UpgradeToPro;
