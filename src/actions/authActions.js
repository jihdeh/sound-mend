import axios from 'axios'
import jwt from 'jsonwebtoken'
import get from 'lodash/get'
import {
  IS_AUTHENTICATED,
  CREATE_ACCOUNT_SUCCESS,
  REQUEST_RESET_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  LOG_OUT
} from '../constants/actionTypes'
import { displayError } from './errorActions'
import { getProfile } from './profileAction'

export const login = ({ email, password }) => dispatch => {
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/auth/signin`, { email, password })
    .then(({ data }) => {
      localStorage.setItem('token', data.data)
      const decodeToken = jwt.verify(
        data.data,
        process.env.REACT_APP_AUTH_SECRET
      )
      dispatch({
        type: IS_AUTHENTICATED,
        payload: decodeToken
      })
      const { token: { username } } = decodeToken
      getProfile(username)(dispatch)
    })
    .catch(error => {
      console.log(error)
      const { data } = error.response
      displayError(data.message)(dispatch)
    })
}

export const createAccount = accountDetails => async dispatch => {
  axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/auth/signup/${
        accountDetails.paymentReference
      }`,
      accountDetails
    )
    .then(async ({ data }) => {
      await dispatch({
        type: CREATE_ACCOUNT_SUCCESS,
        payload: data
      })
      await login(accountDetails)(dispatch)
    })
    .catch(error => {
      const { data } = error.response
      let errMsg = get(data, 'message') || get(data, 'message.message')
      displayError(errMsg)(dispatch)
    })
}

export const requestReset = email => dispatch => {
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/password/request`, email)
    .then(({ data }) => {
      dispatch({
        type: REQUEST_RESET_SUCCESS,
        payload: data
      })
    })
    .catch(error => {
      const { data } = error.response
      displayError(data.msg)(dispatch)
    })
}

export const reset = details => dispatch => {
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/password/reset`, details)
    .then(({ data }) => {
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: data
      })
    })
    .catch(error => {
      const { data } = error.response
      displayError(data.msg)(dispatch)
    })
}

export const fetchLocalUser = () => dispatch => {
  try {
    const fetchLocalToken = localStorage.getItem('token')
    const decodeToken = jwt.verify(
      fetchLocalToken,
      process.env.REACT_APP_AUTH_SECRET
    )
    dispatch({
      type: IS_AUTHENTICATED,
      payload: decodeToken
    })
    const { token: { username } } = decodeToken
    getProfile(username)(dispatch)
  } catch (err) {
    //send back to login
    logout()(dispatch)
  }
}

export const logout = () => dispatch => {
  localStorage.clear()
  dispatch({
    type: LOG_OUT,
    payload: null
  })
}
