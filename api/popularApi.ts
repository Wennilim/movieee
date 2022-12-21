import api from "./api";
import { ApiRequestConfig } from "../type/api-type";

const MAIN_URL = "/movie";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const getPopular = (  page?: number,config: ApiRequestConfig = {}) =>
  api
    .get(
      `${MAIN_URL}/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
      config
    )
    .then((res) => res.data);

export const getNowPlaying = ( page?: number,config: ApiRequestConfig = {}) =>
  api
    .get(
      `${MAIN_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`,
      config
      )
     .then((res) => res.data);

export const getUpcoming = ( page?: number,config: ApiRequestConfig = {}) =>
     api
       .get(
         `${MAIN_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`,
         config
         )
        .then((res) => res.data);

export const getTopRated = ( page?: number,config: ApiRequestConfig = {}) =>
        api
          .get(
            `${MAIN_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`,
            config
            )
           .then((res) => res.data);