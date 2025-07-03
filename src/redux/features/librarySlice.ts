import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const librarySlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
  
  },
})

// Action creators are generated for each case reducer function
// export const { } = librarySlice.actions

export default librarySlice.reducer