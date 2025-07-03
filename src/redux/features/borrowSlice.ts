// redux/features/borrowSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface BorrowState {
  selectedBook: any | null;
}

const initialState: BorrowState = {
  selectedBook: null,
};

const borrowSlice = createSlice({
  name: "borrow",
  initialState,
  reducers: {
    setBorrowBook: (state, action) => {
      state.selectedBook = action.payload;
    },
    clearBorrowBook: (state) => {
      state.selectedBook = null;
    },
  },
});

export const { setBorrowBook, clearBorrowBook } = borrowSlice.actions;
export default borrowSlice.reducer;
