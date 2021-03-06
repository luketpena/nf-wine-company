import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function * fetchUserInfo() {
  try {
    const response = yield axios.get('/api/user/info');
    yield put({ type: 'SET_USER_INFO', payload: response.data[0]})
  } catch {
    console.log('Unable to get user Info');
  }
}

function * deleteUser(action) {
  yield axios.delete('/api/user/'+action.payload);
  yield put({type: 'GET_USER_INFO'});
}

function * getCustomerAccounts() {
  const response = yield axios.get('/api/user/customers');
  yield put({type: 'SET_CUSTOMER_ACCOUNTS', payload: response.data});
}
function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('FETCH_USER_INFO',fetchUserInfo);
  yield takeLatest('DELETE_USER',deleteUser);
  yield takeLatest('GET_CUSTOMER_ACCOUNTS',getCustomerAccounts);
}

export default userSaga;
