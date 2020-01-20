import { combineReducers } from 'redux';
import edit from './edit.redux';
import event from './event.redux';
import places from './places.redux';
import supplier from './supplier.redux';

const rootReducer = combineReducers({
  edit,
  event,
  places,
  supplier,
});

export default rootReducer;
