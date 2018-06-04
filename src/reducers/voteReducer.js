import {
  VOTE_PENDING,
  VOTE_FULFILLED,
  VOTE_REJECTED
} from "../constants/actionTypes";

const initialstate = {
  fetching: false,
  response: {},
  error: null
};

export default function voteReducer(state = initialstate, action) {
  switch (action.type) {
    case VOTE_PENDING:
      return {
        ...state,
        fetching: true,
        response: {},
        error: null
      };
    case VOTE_FULFILLED:
      return {
        ...state,
        fetching: false,
        response: action.payload,
        error: null
      };
    case VOTE_REJECTED:
      return {
        ...state,
        fetching: false,
        error: action.payload,
        response: {}
      };
    default:
      return state;
  }
}
