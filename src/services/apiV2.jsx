import axios from 'axios';

const apiV2 = () => {
	const defaultOptions = {
		baseURL: process.env.REACT_APP_API_V2_URL,
		timeout: 30000,
	};

	let instance = axios.create(defaultOptions);

	instance.interceptors.request.use(config => {
		if (localStorage.getItem('apiToken')) {
			config.headers.Authorization = JSON.parse(localStorage.getItem('apiToken')) || '';
		}
		if (localStorage.getItem('user')) {
			config.headers.User = JSON.stringify(localStorage.getItem('user')) || '';
		}

		return config;
	}, function(err) {
		return Promise.reject(err);
	});

	instance.interceptors.response.use( (response) => {
			return response;
		}, (error) => {
			if (error.response &&
				(!error.config.hasOwnProperty('errorHandle') || (error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false))
		  	) {
				if (error.response.data.error) {
					alert(error.response.data.error.message);
				 } else {
					alert(error.message);
				 }
		  	}
		  	return Promise.reject(error.response);
		}
	);

	return instance;
}

export default apiV2();
