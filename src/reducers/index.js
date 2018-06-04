import { combineReducers } from 'redux'
import usersReducer from './usersReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import profileReducer from './profileReducer'
import miscReducer from './miscReducer'
import voteReducer from './voteReducer'

export default combineReducers({
  user: usersReducer,
  auth: authReducer,
  error: errorReducer,
  profile: profileReducer,
  misc: miscReducer,
  votes: voteReducer
})
