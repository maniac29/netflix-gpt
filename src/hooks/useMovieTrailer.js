import { useDispatch } from "react-redux";
import { GET_API_OPTIONS } from "../utils/constant";
import { addTrailerDetails } from "../utils/movieSlice";
import { useEffect } from "react";
import { dataMovieTrailer } from "../data/dataMovieTrailer";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    const getMovieTrailer = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          GET_API_OPTIONS
        );
        if(data?.status !== 200){
          const json = dataMovieTrailer;
          if (!!!json?.results) return;
          const trailers = json.results.filter((item) => item?.type === "Trailer");
          const viewTrailer = trailers.lenth > 0 ? trailers[0] : json.results[0];
          dispatch(addTrailerDetails(viewTrailer));
        }else{
          const json = await data.json();
          if (!!!json?.results) return;
          const trailers = json.results.filter((item) => item?.type === "Trailer");
          const viewTrailer = trailers.lenth > 0 ? trailers[0] : json.results[0];
          dispatch(addTrailerDetails(viewTrailer));
        }
      } catch (error) {
        const json = dataMovieTrailer;
        if (!!!json?.results) return;
        const trailers = json.results.filter((item) => item?.type === "Trailer");
        const viewTrailer = trailers.lenth > 0 ? trailers[0] : json.results[0];
        dispatch(addTrailerDetails(viewTrailer));
      }
    };
    useEffect(() => {
      getMovieTrailer();
    }, []);
}
export default useMovieTrailer;