import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import { ICompanyRegistrationData, ILoginData, IJWTToken } from "../interface/IApi";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery(),
    endpoints: (builder) => ({
      signUpUserAndCompany: builder.mutation<void, ICompanyRegistrationData>({
        query: (data) => ({
          url: '/api/v1/user/company/signup',
          method: 'POST',
          body: data,
        }),
      }),
      loginUser: builder.mutation<IJWTToken, ILoginData>({
        query: (data) => ({
          url: '/api/v1/user/login',
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

