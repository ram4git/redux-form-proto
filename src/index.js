import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createLogger } from 'redux-logger';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


const logger = createLogger({
    diff: true,
  });


  const rootReducer = combineReducers({
    // ...your other reducers here
    // you have to pass formReducer under 'form' key,
    // for custom keys look up the docs for 'getFormState'
    form: formReducer
  })
  const store = createStore(
    rootReducer,
    applyMiddleware(logger)
  );


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
