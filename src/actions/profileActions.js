import axios from 'axios'
import { toast } from 'react-toastify'
import {
  GET_PROFILE_PENDING,
  GET_PROFILE_FULFILLED,
  GET_PROFILE_REJECTED,
  UPDATE_PROFILE
} from '../constants/actionTypes'
import { getContestants } from './miscActions'
import { displayError } from './errorActions'

export const getProfilePending = () => async dispatch => {
  await dispatch({ type: GET_PROFILE_PENDING })
}

export const getProfile = username => async dispatch => {
  try {
    const url = `${process.env.REACT_APP_BASE_URL}/user/${username}`
    const res = await axios.get(url)
    const moldResponse = Object.assign(
      {},
      { profileUrl: `${process.env.REACT_APP_PROFILE_URL}${username}` },
      res.data
    )
    await dispatch({
      type: GET_PROFILE_FULFILLED,
      payload: moldResponse
    })
  } catch (err) {
    await dispatch({ type: GET_PROFILE_REJECTED, payload: err })
  }
}

export const updateProfile = ({
  isQualified,
  username
  //qualifiedVideoUrl
}) => async dispatch => {
  try {
    const url = `${process.env.REACT_APP_BASE_URL}/auth/${username}`
    await axios.put(url, {
      qualified: isQualified
      //qualifiedVideo: qualifiedVideoUrl
    })
    await dispatch({
      type: UPDATE_PROFILE,
      payload: true
    })
    getContestants()(dispatch)
    getProfile(username)(dispatch)
  } catch (error) {
    const { data: { message } } = error.response
    displayError(message.message)(dispatch)
  }
}
