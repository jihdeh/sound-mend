import {
  CLEAR_ERROR_MESSAGE,
  DISPLAY_ERROR_MESSAGE
} from "../constants/actionTypes";

const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        error: action.error
      };
    case DISPLAY_ERROR_MESSAGE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default errorReducer;
