import axios from 'axios'
import { GET_CONTESTANTS } from '../constants/actionTypes'
import { displayError } from './errorActions'

export const getContestants = () => async dispatch => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/contestants`
    )
    dispatch({
      type: GET_CONTESTANTS,
      payload: result.data
    })
  } catch (error) {
    const { data } = error.response
    console.log(data, error.response, error.name)
    // displayError(data.message)(dispatch);
  }
}
