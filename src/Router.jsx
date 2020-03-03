import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Report from './pages/Report';
import { EquipmentForm, EquipmentList } from './pages/Equipment';
import { CompanyForm, CompanyList } from './pages/Company';
import { UserForm, UserList } from './pages/User';

import Layout from 'components/Layout';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('apiToken') || localStorage.getItem('user')
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
);

const Pages = () => (
  <Switch>
    <Route path={['/', '/dashboard']} exact component={Dashboard} />
    <Route path='/report' exact component={Report} />
    <Route path='/equipment' exact component={EquipmentList} />
    <Route path='/equipment/edit/:id' exact component={EquipmentForm} />
    <Route path='/company' exact component={CompanyList} />
    <Route path='/company/new' exact component={CompanyForm} />
    <Route path='/company/edit/:id' exact component={CompanyForm} />
    <Route path='/user' exact component={UserList} />
    <Route path='/user/new' exact component={UserForm} />
    <Route path='/user/edit/:id' exact component={UserForm} />
    <Route path='*' component={NotFound} />
  </Switch>
);

const WrappedRoutes = () => (
  <Layout>
    <Route path='/' component={Pages} />
  </Layout>
);

const Router = () => (
  <Switch>
    <Route exact path='/login' component={Login} />
    <PrivateRoute path='/' component={WrappedRoutes} />
  </Switch>
);

export default Router;
