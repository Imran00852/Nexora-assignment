import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api`,
  }),
  tagTypes: ["CART"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/products",
      }),
      keepUnusedDataFor: 0,
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CART"],
    }),
    getCart: builder.query({
      query: () => ({
        url: "/cart",
      }),
      providesTags: ["CART"],
    }),
    updateCart: builder.mutation({
      query: (data) => ({
        url: "/cart",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CART"],
    }),
    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CART"],
    }),
    checkout: builder.mutation({
      query: (data) => ({
        url: "/checkout",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CART"],
    }),
  }),
});

export default api;

export const {
  useUpdateCartMutation,
  useAddToCartMutation,
  useCheckoutMutation,
  useGetCartQuery,
  useGetProductsQuery,
  useRemoveFromCartMutation,
} = api;
