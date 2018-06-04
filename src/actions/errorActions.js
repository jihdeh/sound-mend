import {
  CLEAR_ERROR_MESSAGE,
  DISPLAY_ERROR_MESSAGE
} from "../constants/actionTypes";

export const displayError = errorMessage => dispatch => {
  dispatch({
    type: DISPLAY_ERROR_MESSAGE,
    error: errorMessage
  });
};

export const clearError = () => dispatch => {
  dispatch({
    type: CLEAR_ERROR_MESSAGE,
    error: null
  });
};
