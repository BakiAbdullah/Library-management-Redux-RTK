import type { IBook, IBorrowBook } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-3-xi-kohl.vercel.app",
  }),
  tagTypes: ["books", 'borrow'],
  endpoints: (builder) => ({
    getBooks: builder.query<{ data: IBook[] }, any>({
      query: () => "/api/books",
      providesTags: ["books"],
    }),
    getSingleBook: builder.query<IBook, string>({
      query: (id) => `/api/books/${id}`,
    }),
    getBorrowBookSummary: builder.query<{ data: IBorrowBook[] }, any>({
      query: () => "/api/borrow",
      providesTags: ["borrow"],
    }),
  }),
});

export const { useGetBooksQuery, useGetSingleBookQuery, useGetBorrowBookSummaryQuery } = bookApi;
