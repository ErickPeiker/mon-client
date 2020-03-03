import api from './api';

const login = async (email, password) => {
  await api.post('/login', {
    email: email,
    password: password,
  }).then((response) => {
    localStorage.setItem('apiToken', JSON.stringify(response.data.apiToken));
    localStorage.setItem('user', JSON.stringify(response.data.user));
  });
}

const logout = () => {
  localStorage.removeItem('apiToken');
  localStorage.removeItem('user');
}

const user = {
  login,
  logout,
};

export default user;
