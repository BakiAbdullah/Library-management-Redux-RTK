import type { IBook, IBookData, IBorrowBook } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-4-backend-ten.vercel.app",
  }),
  tagTypes: ["books", "borrow"],
  endpoints: (builder) => ({
    // GET all Books Api
    getBooks: builder.query<{ data: IBook[] }, any>({
      query: () => "/api/books",
      providesTags: ["books"],
    }),

    // GET Single Book Api
    getSingleBook: builder.query<{ data: IBook }, string>({
      query: (_id) => `/api/books/${_id}`,
      providesTags: ["books", "borrow"],
    }),

    // CREATE Book Api
    createBook: builder.mutation({
      query: (booksData: IBookData) => ({
        url: "/api/create-book",
        method: "POST",
        body: booksData,
      }),
      invalidatesTags: ["books"],
    }),

    // DELETE Book Api
    deleteBook: builder.mutation({
      query: ({ _id }) => ({
        url: `/api/books/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),

    // Edit (UPDATE) Book Api
    updateBook: builder.mutation({
      query: ({ _id, booksData }) => ({
        url: `/api/edit-book/${_id}`,
        method: "PUT",
        body: booksData,
      }),
      invalidatesTags: ["books"],
    }),

    // GET Borrow Book Summary Api
    getBorrowBookSummary: builder.query<{ data: IBorrowBook[] }, any>({
      query: () => "/api/borrow-summary",
      providesTags: ["borrow"],
    }),

    // Borrow Api
    borrowBook: builder.mutation({
      query: (borrowData) => ({
        url: "/api/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["borrow", "books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  useGetBorrowBookSummaryQuery,
  useCreateBookMutation,
  useBorrowBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation
} = bookApi;
