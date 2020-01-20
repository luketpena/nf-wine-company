import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';

//Redux + Saga
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import {put,takeEvery, takeLatest} from 'redux-saga/effects';

import rootReducer from './redux/reducers';
import rootSaga from './redux/sagas'; // imports ./redux/sagas/index.js

//-----< STORE + MIDDLEWARE >-----\\
const sagaMiddlware = createSagaMiddleware();
const store = createStore (
  rootReducer,
  applyMiddleware(sagaMiddlware, logger)
)
sagaMiddlware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));