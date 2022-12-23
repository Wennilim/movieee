import api from "./api";
import { ApiRequestConfig } from "../type/api-type";

const MAIN_URL = "/movie";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const getMovieDetails = (movie_id?:any, config: ApiRequestConfig = {}) =>
  api
    .get(
      `${MAIN_URL}/${movie_id}?api_key=${API_KEY}&language=en-US`,
      config
    )
    .then((res) => res.data);

export const getMovieCast = (movie_id:any, config: ApiRequestConfig = {}) =>
    api
      .get(
        `${MAIN_URL}/${movie_id}/credits?api_key=${API_KEY}&language=en-US`,
        config
      )
      .then((res) => res.data);

// export const getMovieIMDBid = (movie_id:any, config: ApiRequestConfig = {}) =>
//     api
//         .get(
//           `${MAIN_URL}/${movie_id}/external_ids?api_key=${API_KEY}`,
//           config
//         )
//         .then((res) => res.data);