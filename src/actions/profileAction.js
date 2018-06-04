import axios from 'axios'
import { toast } from 'react-toastify'
import {
  GET_PROFILE_PENDING,
  GET_PROFILE_FULFILLED,
  GET_PROFILE_REJECTED,
  UPDATE_PROFILE
} from '../constants/actionTypes'
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

export const updateProfile = (profile, { username }) => async dispatch => {
  try {
    if (profile.profilePhoto) {
      updateImage(username, profile.profilePhoto)
    }
    delete profile.password
    delete profile.profilePhoto
    delete profile.contestantVideo
    const url = `${process.env.REACT_APP_BASE_URL}/auth/${username}`
    await axios.put(url, profile)
    await dispatch({
      type: UPDATE_PROFILE,
      payload: true
    })
    getProfile(username)(dispatch)
  } catch (error) {
    const { data: { message } } = error.response
    displayError(message.message)(dispatch)
  }
}

export const updateVideo = (profile, { username }) => async dispatch => {
  try {
    const url = `${process.env.REACT_APP_BASE_URL}/auth/${username}`
    await axios.put(url, profile)
    await dispatch({
      type: UPDATE_PROFILE,
      payload: true
    })
    toast.success(`You have succesfully uploaded your video`, {
      position: toast.POSITION.TOP_RIGHT
    })
    getProfile(username)(dispatch)
  } catch (error) {
    const { data: { message } } = error.response
    displayError(message.message)(dispatch)
  }
}

export const updateImage = async (username, image) => {
  try {
    const form = new FormData()
    form.append('image', image)
    form.append('username', username)
    const options = {
      method: 'PUT',
      data: form,
      url: `${process.env.REACT_APP_BASE_URL}/uploadProfileImage`
    }

    const upload = await axios(options)
  } catch (error) {
    toast.error('Error updating image, try again later', {
      position: toast.POSITION.TOP_RIGHT
    })
  }
}

export const updatePassword = ({ username }, password) => async dispatch => {
  try {
    const options = {
      method: 'PUT',
      data: { username, password },
      url: `${process.env.REACT_APP_BASE_URL}/updatePassword`
    }

    const updatePassword = await axios(options)
    await dispatch({
      type: UPDATE_PROFILE,
      payload: true
    })
  } catch (error) {}
}

export const resetUpdateProfile = () => async dispatch => {
  dispatch({
    type: UPDATE_PROFILE,
    payload: false
  })
}
