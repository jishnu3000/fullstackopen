import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null },
  reducers: {
    setNotif(state, action) {
      return action.payload
    },
    clearNotif(state, action) {
      return { message: null }
    }
  }
})

export const { setNotif, clearNotif } = notificationSlice.actions

export const setNotification = (info, time) => {
  return dispatch => {
    dispatch(setNotif(info))
    setTimeout(() => {
      dispatch(clearNotif())
    }, time*1000)
  }
}

export default notificationSlice.reducer