import React from "react";
import { useNavigate } from "react-router-dom";
// import PlaceholderImg from "../../assets/apple-icon.png";

const Poster = ({ movie }) => {
  // const [image, setImage] = useState(PlaceholderImg);
  const navigate = useNavigate();

  const goToMovie = () => {
    console.log("redirecting to movie page");
    navigate("/movie/" + movie.id);
  };
  //logic for placeholder when poster path is null
  // useEffect(() => {
  //   console.log(`MOVIE POSTER PATH`, movie.poster_path);
  //   if (movie.poster_path === null) {
  //     setImage(PlaceholderImg);
  //   } else {
  //     setImage("https://image.tmdb.org/t/p/w500/" + movie.poster_path);
  //   }
  // }, [movie]);

  return (
    <div key={movie.id} onClick={goToMovie}>
      <h1>{movie.title}</h1>
      <img
        src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
        alt={movie.title}
        width={200}
      />
    </div>
  );
};

export default Poster;
