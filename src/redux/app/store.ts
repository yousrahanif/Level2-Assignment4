import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '../api/baseAPI'
import bookReducer from "../features/bookSlice"
import borrowReducer from "../features/borrowSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]:baseApi.reducer,
    book: bookReducer,
      borrow: borrowReducer,

  },
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(baseApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch