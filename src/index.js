import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './index.css';
import './firebase';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/passenger-transportation">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
