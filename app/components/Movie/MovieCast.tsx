import React, { useEffect, useState } from "react";

export const MovieCast = ({ actors }) => {
  const [cast, setCast] = useState<string[]>([]);

  const getCast = () => {
    if (actors !== undefined) {
      const actorNames = actors
        .slice(0, 15)
        .map(({ name }: { name: string }) => name);

      setCast(actorNames);
    }
  };

  useEffect(() => {
    getCast();
  }, [actors]);
  return (
    <>
      <div className="flex cursor-default flex-col gap-2">
        <p className="border-b-grey text-p-white border-b border-solid">CAST</p>
        <div className="flex flex-wrap gap-1">
          {cast &&
            cast.map((actor, index) => (
              <p
                key={index}
                className="bg-c-grey text-sh-grey max-w-full rounded p-1 text-center text-xs"
              >
                {actor}
              </p>
            ))}
        </div>
      </div>
    </>
  );
};
export default MovieCast;
