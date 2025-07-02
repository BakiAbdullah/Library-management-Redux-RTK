import type { IBook } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-3-xi-kohl.vercel.app",
  }),
  tagTypes: ["books"],
  endpoints: (builder) => ({
    getBooks: builder.query<{ data: IBook[] }, void>({
      query: () => "/api/books",
      providesTags: ["books"],
    }),
    getSingleBook: builder.query<IBook, string>({
      query: (id) => `/api/books/${id}`,
    }),
  }),
});

export const { useGetBooksQuery, useGetSingleBookQuery } = bookApi;
