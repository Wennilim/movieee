import api from "./api";
import { ApiRequestConfig } from "../type/api-type";

const MAIN_URL = "/discover";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;


export const getMovieByCategory = (categoryID?:number, page?:number, config: ApiRequestConfig = {}) =>
api
 .get(
    `${MAIN_URL}/movie?api_key=${API_KEY}&language=en-US&with_genres=${categoryID}&page=${page}`,
    config
  )
  .then((res) => res.data);

  export const getTVByCategory = (categoryID?:number, page?:number, config: ApiRequestConfig = {}) =>
  api
   .get(
      `${MAIN_URL}/tv?api_key=${API_KEY}&language=en-US&with_genres=${categoryID}&page=${page}`,
      config
    )
    .then((res) => res.data);