import axios from "axios";
import {notification} from "antd";
import {authTokenKey} from "../constants/localStorageConstant.ts";

const service = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true
});

// Config
const TOKEN_PAYLOAD_KEY = "authorization";
const AUTH_TOKEN_TYPE = "Bearer";

// API Request interceptor
service.interceptors.request.use(
	(config) => {
		const access_token = localStorage.getItem(authTokenKey);
		
		// if (access_token) {
		// 	config.headers[TOKEN_PAYLOAD_KEY] = AUTH_TOKEN_TYPE + " " + access_token;
		// }
		
		return config;
	},
	(error) => {
		// Do something with request error here
		notification.error({
			message: "Error"
		});
		Promise.reject(error).then(r => r);
	}
);

// API response interceptor
service.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		if (error?.response?.status === 401) {
			localStorage.clear();
		}
		
		if (error?.response?.status === 403) {
			notification.error({
				message: "Vous n'êtes pas autorisé à effectuer l'action."
			});
		}
		
		return Promise.reject(error.response);
	}
);

export default service;
