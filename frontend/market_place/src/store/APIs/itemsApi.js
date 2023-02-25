import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const itemsApi = createApi({
  reducerPath: "itemsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints(builder) {
    return {
      fetchItems: builder.query({
        query: () => {
          return {
            url: "/items",
            method: "GET",
          };
        },
      }),
      postPurchases: builder.mutation({
        query: (purchases) => {
          return {
            credentials: "include",
            url: "/users/purchase",
            method: "POST",
            body: { ...purchases },
          };
        },
      }),
      getPurchases: builder.query({
        query: (userId) => {
          return {
            url: "/users/purchase",
            method: "GET",
            params: { id: userId },
          };
        },
      }),
    };
  },
});
export { itemsApi };
export const {
  useFetchItemsQuery,
  usePostPurchasesMutation,
  useGetPurchasesQuery,
} = itemsApi;
