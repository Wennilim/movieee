import axios, { AxiosInstance } from 'axios';
import { ApiRequestConfig } from '../type/api-type';
import { API_BASE_URL } from '../utils/constant';

// Default config for the axios instance
const axiosParams = {
	// We can set different base URL based on the environment
	// baseURL: process.env.REACT_APP_API_URL,
	baseURL: API_BASE_URL,
	// headers: {
	// 	Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
	// },
};    

// Create axios instance with default params
const axiosInstance = axios.create(axiosParams);

type TMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options';
async function httpRequest(method: TMethod, url: string, config?: ApiRequestConfig) {
	const res = await axios[method](url, config);
	return res.data;
}

// Main api function
const api = (axios: AxiosInstance) => {
	return {
		get: <T>(url: string, config: ApiRequestConfig = {}) => axios.get(url, config),
		delete: <T>(url: string, config: ApiRequestConfig = {}) => axios.delete(url, config),
		post: <T>(url: string, body: unknown, config: ApiRequestConfig = {}) =>
			axios.post(url, body, config),
		put: <T>(url: string, body: unknown, config: ApiRequestConfig = {}) =>
			axios.put(url, body, config),
		patch: <T>(url: string, body: unknown, config: ApiRequestConfig = {}) =>
			axios.patch(url, body, config),
	};
};

export default api(axiosInstance);
