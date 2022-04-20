import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CompanyRegistrationData } from "../interface/IApi";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery(),
    endpoints: (builder) => ({
      signUpUser: builder.mutation<void, CompanyRegistrationData>({
        query: (data) => ({
          url: '/api/v1/user/company/signup',
          method: 'POST',
          body: data,
        }),
      }),
    }),
  });

export const { 
  useSignUpUserMutation
} = userApi;

