import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import Router from './Router';
import Store from './store';
import { config as i18nextConfig } from './translations';

i18next.init(i18nextConfig);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#3F51B5',
    },
    background: {
      default: '#ffffff',
    },
  },
});

const App = props => (
  <Provider store={Store}>
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18next}>
        <CssBaseline />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </I18nextProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
