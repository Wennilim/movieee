import api from "./api";
import { ApiRequestConfig } from "../type/api-type";

const MAIN_URL = "/tv";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const getTVPopular = (config: ApiRequestConfig = {}) =>
  api
    .get(
      `${MAIN_URL}/popular?api_key=${API_KEY}&language=en-US&page=1`,
      config
    )
    .then((res) => res.data);

export const getTVAiring = (config: ApiRequestConfig = {}) =>
  api
    .get(
      `${MAIN_URL}/airing_today?api_key=${API_KEY}&language=en-US&page=1`,
      config
      )
     .then((res) => res.data);

export const getTVOnAir = (config: ApiRequestConfig = {}) =>
     api
       .get(
         `${MAIN_URL}/on_the_air?api_key=${API_KEY}&language=en-US&page=1`,
         config
         )
        .then((res) => res.data);

export const getTopRated = (config: ApiRequestConfig = {}) =>
        api
          .get(
            `${MAIN_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
            config
            )
           .then((res) => res.data);