import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../app/constants";
import { userApi } from "./userApi";

export const refreshApi = createApi({
    reducerPath: "refreshApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL
    }),
    endpoints: (builder) => ({
      refreshToken: builder.query<void, void>({
        query: (data) => ({
          url: 'user/token/refresh',
          method: 'GET',
          credentials: 'include',
        }),
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            await dispatch(userApi.endpoints.getCurrentUser.initiate(null));
          } catch (error) {}
        },
      }),
    }),
  });

export const {useLazyRefreshTokenQuery} = refreshApi;