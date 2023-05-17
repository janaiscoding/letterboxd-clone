import React from "react";
import ReviewsComp from "../../components/movie_actions/ReviewsComp";

const MovieReviews =({movie})=>{
    return (
        <>{movie.title}
        <ReviewsComp movie={movie} />
        </>
    )
}

export default MovieReviews;