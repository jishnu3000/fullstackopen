import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotif(state, action) {
      return action.payload
    },
    clearNotif(state, action) {
      return ''
    }
  }
})

export const { setNotif, clearNotif } = notificationSlice.actions

export const setNotification = (text, time) => {
  return dispatch => {
    dispatch(setNotif(text))
    setTimeout(() => {
      dispatch(clearNotif())
    }, time*1000)
  }
}

export default notificationSlice.reducer