import axios from 'axios';

const api = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 0,
  };

  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use(config => {
    if (localStorage.getItem('apiToken')) {
      config.headers.Authorization = JSON.parse(localStorage.getItem('apiToken')) || '';
    }

    return config;
  }, function(err) {
    return Promise.reject(err);
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    }, (error) => {
      if (
        error.response &&
        (
          !error.config.hasOwnProperty('errorHandle') ||
          (error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false)
        )
      ) {
        alert(error.response.data.error.message);
      }

      return Promise.reject(error.response);
    }
  );

  return instance;
}

export default api();
