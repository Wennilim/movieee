import api from "./api";
import { ApiRequestConfig } from "../type/api-type";

const MAIN_URL = "/tv";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const getTVDetails = (tv_id?:any, config: ApiRequestConfig = {}) =>
  api
    .get(
      `${MAIN_URL}/${tv_id}?api_key=${API_KEY}&language=en-US`,
      config
    )
    .then((res) => res.data);

export const getTVCast = (tv_id:any, config: ApiRequestConfig = {}) =>
    api
      .get(
        `${MAIN_URL}/${tv_id}/credits?api_key=${API_KEY}&language=en-US`,
        config
      )
      .then((res) => res.data);

// export const getMovieIMDBid = (tv_id:any, config: ApiRequestConfig = {}) =>
//     api
//         .get(
//           `${MAIN_URL}/${tv_id}/external_ids?api_key=${API_KEY}`,
//           config
//         )
//         .then((res) => res.data);