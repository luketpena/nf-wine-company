import { combineReducers } from 'redux';
import edit from './edit.redux';
import event from './event.redux';
import places from './places.redux';
import supplier from './supplier.redux';
import producer from './producer.redux';
import user from './user.redux';
import errors from './errors.redux';
import loginMode from './loginMode.redux';
import userInfo from './useInfo.redux';
import requests from './requests.redux';
import customerAccounts from './customerAccounts.redux';

const rootReducer = combineReducers({
  edit,
  event,
  places,
  supplier,
  producer,
  user,
  errors,
  loginMode,
  userInfo,
  requests,
  customerAccounts,
});

export default rootReducer;
