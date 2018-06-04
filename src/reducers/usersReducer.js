import { GET_USER_INFORMATION } from "../constants/actionTypes";

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case GET_USER_INFORMATION:
      return {
        ...state,
        userInfo: action.payload
      };
    default:
      return state;
  }
}
