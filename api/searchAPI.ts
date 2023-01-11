import api from "./api";
import { ApiRequestConfig } from "../type/api-type";

const MAIN_URL = "/search";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const getSearchMulti = (input?:any,page?:any, config: ApiRequestConfig = {}) =>
  api
    .get(
      `${MAIN_URL}/multi?api_key=${API_KEY}&language=en-US&query=${input}&page=${page}&include_adult=false`,
      config
    )
    .then((res) => res.data);

// export const getTVCast = (tv_id:any, config: ApiRequestConfig = {}) =>
//     api
//       .get(
//         `${MAIN_URL}/${tv_id}/credits?api_key=${API_KEY}&language=en-US`,
//         config
//       )
//       .then((res) => res.data);