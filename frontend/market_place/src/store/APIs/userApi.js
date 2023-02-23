import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints(builder) {
    return {
      fetchUser: builder.mutation({
        query: (logInData) => {
          return {
            url: "/users/login",
            body: { email: logInData.email, password: logInData.password },
            credentials: "include",
            method: "POST",
          };
        },
      }),
      authUser: builder.mutation({
        query: () => {
          return {
            url: "/users/auth",
            credentials: "include",
            method: "POST",
          };
        },
      }),
      addUser: builder.mutation({
        query: (signupData) => {
          return {
            url: "/users/signup",
            method: "POST",
            body: {
              email: signupData.email,
              password: signupData.password,
              firstName: signupData.firstName,
              lastName: signupData.lastName,
              mobileNumber: signupData.mobileNumber,
              city: signupData.city,
              buildingNumber: signupData.buildingNumber,
              street: signupData.street,
            },
          };
        },
      }),
      updateUser: builder.mutation({
        query: (updatedUserData) => {
          return {
            url: "/users",
            method: "PUT",
            body: {
              email: updatedUserData.email,
              password: updatedUserData.password,
              firstName: updatedUserData.firstName,
              lastName: updatedUserData.lastName,
              mobileNumber: updatedUserData.mobileNumber,
              city: updatedUserData.city,
              buildingNumber: updatedUserData.buildingNumber,
              street: updatedUserData.street,
              newPassword: updatedUserData.newPassword,
              id: updatedUserData.id,
            },
          };
        },
      }),
      getUserById: builder.query({
        query: (id) => {
          return {
            url: `/users`,
            params: { id: id },
            method: "GET",
          };
        },
      }),
      postLogout:builder.mutation({query:()=>{
        return {
          url: "/users/logout",
          credentials: "include",
          method: "POST",
        };
      }})
    };
  },
});

export { userApi };
export const {
  useFetchUserMutation,
  useAuthUserMutation,
  useAddUserMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  usePostLogoutMutation
} = userApi;
