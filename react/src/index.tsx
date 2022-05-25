import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {theme} from './theme';
import {ThemeProvider} from '@mui/styles';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { SnackbarProvider } from 'notistack';
import AuthMiddleware from './Helpers/AuthMiddleware'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={1}>
          <AuthMiddleware>
          <App />
          </AuthMiddleware>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
