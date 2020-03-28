import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function * contactSendEmail(action) {
  yield axios.post('/api/mail/contact');
}


export default function * editSaga() {
  yield takeLatest('CONTACT_SEND_EMAIL', contactSendEmail);
}