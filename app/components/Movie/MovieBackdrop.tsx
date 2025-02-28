export default function MovieBackdrop({ backdrop }: { backdrop: string }) {
  return (
    <div
      className="movie-backdrop block h-[250px] max-h-[250px] md:m-auto md:mt-[-5%] md:h-[500px] md:max-h-[500px] md:w-[950px]"
      style={{ backgroundImage: `url(${backdrop})` }}
    ></div>
  );
}
