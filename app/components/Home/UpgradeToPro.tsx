import Image from "next/image";
import Link from "next/link";
import React from "react";

export const UpgradeToPro = () => {
  let url =
    "https://a.ltrbxd.com/resized/sm/upload/j8/gt/r8/ss/pro-950-0-950-0-0.png?k=bc62c7df04";
  let mobileUrl =
    "https://a.ltrbxd.com/sm/upload/1n/js/vs/bi/pro-mobile.png?k=8ce50124d8";
  return (
    <>
      <Link href="https://letterboxd.com/pro/?utm_medium=banner&utm_campaign=get-pro">
        <Image
          className="mb-8 block self-center md:hidden"
          src={mobileUrl}
          width={100}
          height={100}
          alt="upgrade to pro banner"
          loading="lazy"
        />
      </Link>
      <Link href="https://letterboxd.com/pro/?utm_medium=banner&utm_campaign=get-pro">
        <Image
          className="mb-8 hidden self-center md:block"
          src={url}
          alt="upgrade to pro banner"
          height={100}
          width={950}
          loading="lazy"
        />
      </Link>
    </>
  );
};
