import api from "./api";
import { ApiRequestConfig } from "../type/api-type";

const MAIN_URL = "/genre";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const getMovieCategory = (config: ApiRequestConfig = {}) =>
  api
    .get(
      `${MAIN_URL}/movie/list?api_key=${API_KEY}&language=en-US`,
      config
    )
    .then((res) => res.data);

export const getTVCategory = (config: ApiRequestConfig = {}) =>
    api
      .get(
        `${MAIN_URL}/tv/list?api_key=${API_KEY}&language=en-US`,
        config
      )
      .then((res) => res.data);