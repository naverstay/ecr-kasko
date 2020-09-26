import axios from 'axios';
import {
	getItem as getFromLocalStorage,
	removeItem as removeFromLocalStorage
} from './local-storage';

export const GET = 'get';
export const POST = 'post';
export const PUT = 'put';
export const PATCH = 'patch';
export const DELETE = 'delete';

//const URL = 'https://react-stat-front.ecredit.one/api/v1/';
const URL = '/api/v1';

const Agent = (baseURL = URL) => {
	let headers = { 'Content-Type': 'application/json' }; // { 'Content-Type': 'application/x-www-form-urlencoded' };

	const _agent = axios.create({
		baseURL,
		headers,
	});

	_agent.interceptors.request.use(config => {
		const stored = getFromLocalStorage('auth');
		if (stored) {
			config.headers = {
				...headers,
				...config.headers,
				Authorization: `Bearer ${stored.token}`
			};
		}
		return config;
	});

	_agent.interceptors.response.use(response => {
		return response;
	}, (error) =>{
			if (401 === error.response.status) {
				removeFromLocalStorage('auth');				
				window.location = '/auth';
			} else {
				return Promise.reject(error);
		}
	});

	return _agent;
};

const agent = Agent();

export default agent;
