import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import miscReducer from './miscReducer';

export default combineReducers({
  user: usersReducer,
  error: errorReducer,
  profile: profileReducer,
  misc: miscReducer
});
