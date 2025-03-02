export default function MovieBackdrop({ backdrop }: { backdrop: string }) {
  if (backdrop.includes("null"))
    return <div className="mb-[100px] block max-h-[100px] min-h-[100px]"></div>;

  return (
    <div
      className="movie-backdrop block h-[250px] max-h-[250px] md:m-auto md:mt-[-6%] md:h-[500px] md:max-h-[500px] md:w-[950px]"
      style={{ backgroundImage: `url(${backdrop})` }}
    ></div>
  );
}
