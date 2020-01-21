import { all } from 'redux-saga/effects';
import editSaga from './edit.saga';
import eventSaga from './event.saga';
import placesSaga from './places.saga';
import supplierSaga from './supplier.saga';

import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';

export default function* rootSaga() {
  yield all([
    eventSaga(),
    editSaga(),
    placesSaga(),
    supplierSaga(),
    loginSaga(),
    registrationSaga(),
    userSaga()
  ]);
}
