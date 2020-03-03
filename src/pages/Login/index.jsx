import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';

import UserService from 'services/user';

import LoginForm from './components/LoginForm';

const LoginPage = ({ t, ...props }) => {
  useEffect(() => {
    UserService.logout();
  });

  const handleSubmit = async (data) => {
    const user = Object.assign({}, data);

    await UserService.login(user.email, user.password);

    const { from } = props.location.state || { from: { pathname: '/dashboard' } };
    props.history.push(from);
  }

  return (
    <LoginForm onSubmit={handleSubmit} />
  );
}

export default withTranslation('common')(LoginPage);
