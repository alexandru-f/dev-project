import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICompanyRegistrationData, ISignInData, IJWTToken, IDecodedJwt } from "../interface/IApi";
import customFetchBase from "./customFetchBase";
import { userApi } from "./userApi";


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
      signUpUserAndCompany: builder.mutation<void, ICompanyRegistrationData>({
        query: (data) => ({
          url: '/user/company/signup',
          method: 'POST',
          body: data,
        }),
      }),
      loginUser: builder.mutation<
        IJWTToken,
        ISignInData
    >({
      query(data) {
        return {
          url: '/user/login',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getCurrentUser.initiate(null));
        } catch (error) {}
      },
    }),
    }),
  });

export const { 
  useLoginUserMutation,
  useSignUpUserAndCompanyMutation
} = authApi;

