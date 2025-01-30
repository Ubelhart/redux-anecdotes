import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      const notification = action.payload
      state = notification
      return state
    },
    clearNotification: (state) => {
      state = null
      return state
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const setNotificationWithDelay = (notification, delay) => {
  return async (dispatch) => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, delay * 5)
  }
}

export default notificationSlice.reducer
