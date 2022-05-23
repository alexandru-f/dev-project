import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICompanyRegistrationData, ISignInData, IJWTToken, IDecodedJwt } from "../interface/IApi";
import customFetchBase from "./customFetchBase";


export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
      signUpUserAndCompany: builder.mutation<void, ICompanyRegistrationData>({
        query: (data) => ({
          url: '/user/company/signup',
          method: 'POST',
          body: data,
        }),
      }),
      loginUser: builder.mutation<IJWTToken, ISignInData>({
        query: (data) => ({
          url: '/user/login',
          method: 'POST',
          body: data,
        }),
      }),
    }),
  });

export const { 
  useLoginUserMutation,
  useSignUpUserAndCompanyMutation
} = userApi;

