import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './fonts/fonts.css';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { rootReducer } from './services/reducers';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
