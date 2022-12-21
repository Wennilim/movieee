import api from "./api";
import { ApiRequestConfig } from "../type/api-type";

const MAIN_URL = "/trending";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const getTrending = (
  page?: number,
  config: ApiRequestConfig = {}
) =>
  api
    .get(`${MAIN_URL}/movie/day?api_key=${API_KEY}&page=${page}`, config)
    .then((res) => res.data);

export const getTVTrending = (
  page?: number,
  config: ApiRequestConfig = {}
) =>
  api
    .get(`${MAIN_URL}/tv/day?api_key=${API_KEY}&page=${page}`, config)
    .then((res) => res.data);
