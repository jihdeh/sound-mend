import axios from "axios";
import { toast } from "react-toastify";
import {
  VOTE_PENDING,
  VOTE_FULFILLED,
  VOTE_REJECTED
} from "../constants/actionTypes";

const vote = ({ reference, username, voteCount }) => async dispatch => {
  try {
    dispatch({
      type: VOTE_PENDING
    });

    const url = `${
      process.env.REACT_APP_BASE_URL
    }/vote/${reference}?username=${username}&voteCount=${voteCount}`;

    const response = await axios.post(url);

    await dispatch({
      type: VOTE_FULFILLED,
      payload: response
    });

    toast.success(
      `You have succesfully casted ${voteCount} vote(s) for ${username}`,
      {
        position: toast.POSITION.TOP_RIGHT
      }
    );
  } catch (e) {
    await dispatch({
      type: VOTE_REJECTED,
      payload: e
    });
    e.response
      ? toast.error(e.response.data.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      : toast.error(e.message, {
          position: toast.POSITION.TOP_RIGHT
        });
  }
};

export default vote;
