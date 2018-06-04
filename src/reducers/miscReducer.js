import { STATUS_STREAM, GET_CONTESTANTS } from '../constants/actionTypes'

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case STATUS_STREAM:
      return {
        ...state,
        openStatus: action.payload
      }
    case GET_CONTESTANTS:
      return {
        ...state,
        searchResults: action.payload
      }
    default:
      return state
  }
}

export default authReducer
