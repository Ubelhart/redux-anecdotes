import { createSlice } from '@reduxjs/toolkit'

const initialState = 'all'

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const filter = action.payload
      state = filter
      state
      return state
    },
  },
})

export const { setFilter } = filterSlice.actions

export default filterSlice.reducer
