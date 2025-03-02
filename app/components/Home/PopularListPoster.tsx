import Image from "next/image";
import Link from "next/link";
import React from "react";

export const PopularListPoster = ({ movie, i }) => {
  return (
    <div
      className="border-pb-grey/25 relative mr-[-25px] h-auto w-auto rounded border border-solid shadow-[0_0_1px_1px_rgba(20,24,28,1)] shadow-inner"
      style={{ zIndex: 100 - i }}
    >
      <Link href={"/movie/" + movie.id}>
        <Image
          width={70}
          height={150}
          className="h-auto w-auto rounded border md:max-w-[70px]"
          src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
          alt={movie.title}
          loading="lazy"
        />
      </Link>
    </div>
  );
};
