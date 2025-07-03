import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi=createApi({

    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://level2-assignment3-six.vercel.app"}),
     tagTypes: ["Books"],
    endpoints: (builder)=>({
        getBooks: builder.query({
            query: ()=>"/api/books",
             providesTags: ["Books"], 
        }),
        updateBook: builder.mutation({
            query: ({id, updatedData})=>({
                url: `/api/books/${id}`,
                method: "PUT",
                body: updatedData
            }),
            invalidatesTags: ["Books"],
        }),
          createBook: builder.mutation({
            query: (newBook)=>({
                url: `/api/books`,
                method: "POST",
                body: newBook
            }),
            invalidatesTags: ["Books"],
        }),
        deleteBook: builder.mutation({
            query: ({id, deleteData})=>({
                url: `/api/books/${id}`,
                method: "DELETE",
                body: deleteData
            }),
            invalidatesTags: ["Books"],
        }),
       borrowBook: builder.mutation({
  query: (borrowData) => ({
    url: "/api/borrow",
    method: "POST",
    body: borrowData,
  }),
  invalidatesTags: ["Books"], 
}),
getBorrowedBooks: builder.query({
  query: () => "/api/borrow",
  providesTags: ["Books"],
}),

    })
})
export const {useGetBooksQuery, useUpdateBookMutation, useCreateBookMutation, useDeleteBookMutation, useBorrowBookMutation, useGetBorrowedBooksQuery}=baseApi;