// src/redux/features/book/bookSlice.ts
import { createSlice, type PayloadAction,  } from "@reduxjs/toolkit";

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

interface BookState {
  selectedBook: Book | null;
}

const initialState: BookState = {
  selectedBook: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setSelectedBook: (state, action: PayloadAction<Book>) => {
      state.selectedBook = action.payload;
    },
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
  },
});

export const { setSelectedBook, clearSelectedBook } = bookSlice.actions;
export default bookSlice.reducer;
