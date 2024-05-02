import React from 'react';

const UpgradeToPro = () => {
  let url =
    'https://a.ltrbxd.com/resized/sm/upload/j8/gt/r8/ss/pro-950-0-950-0-0.png?k=bc62c7df04';
  let mobileUrl =
    'https://a.ltrbxd.com/sm/upload/1n/js/vs/bi/pro-mobile.png?k=8ce50124d8';
  return (
    <>
      <a href="https://letterboxd.com/pro/?utm_medium=banner&utm_campaign=get-pro">
        <img
          className="mb-8 block self-center md:hidden"
          src={mobileUrl}
          alt="upgrade to pro banner"
          loading="lazy"
        />
      </a>
      <a href="https://letterboxd.com/pro/?utm_medium=banner&utm_campaign=get-pro">
        <img
          className="mb-8 hidden self-center md:block"
          src={url}
          alt="upgrade to pro banner"
          height={100}
          width={950}
          loading="lazy"
        />
      </a>
    </>
  );
};

export default UpgradeToPro;
