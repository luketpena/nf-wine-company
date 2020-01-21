import { combineReducers } from 'redux';
import edit from './edit.redux';
import event from './event.redux';
import places from './places.redux';
import supplier from './supplier.redux';
import user from './user.redux';
import errors from './errors.redux';
import loginMode from './loginMode.redux';

const rootReducer = combineReducers({
  edit,
  event,
  places,
  supplier,
  user,
  errors,
  loginMode,
});

export default rootReducer;
