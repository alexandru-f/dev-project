import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../app/constants";
import { ISubscriptionType } from '../interface/IApi'


export const subscriptionNamesApi = createApi({
    reducerPath: "subscriptionNamesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: (builder) => ({
      getAllNames: builder.query<ISubscriptionType[], string>({
        query: (name) => `api/v1/storage/subscription/search?q=${encodeURIComponent(name)}`
      }),
    }),
  });

export const { useGetAllNamesQuery } = subscriptionNamesApi;