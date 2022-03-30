import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFormState } from '../interface/IModalContent'
import {ISubscription} from '../interface/IApi'

export const subscriptionApi = createApi({
    reducerPath: "subscriptionApi",
    baseQuery: fetchBaseQuery({}),
    tagTypes: ['Subscription'],
    endpoints: (builder) => ({
      getSubscriptions: builder.query<ISubscription[], void>({
        query: () => '/api/v1/subscription',
        providesTags: (result) =>
          result
            ? [
              ...result.map(({id}) => ({ type: 'Subscription' as const, id })),
              {type: 'Subscription', id: 'LIST'}
            ]
            : [{type: 'Subscription', id: 'LIST'}],
      }),
      addSubscription: builder.mutation<void, Partial<IFormState>>({
        query: (data) => ({
          url: '/api/v1/subscription',
          method: "POST",
          body: data,
        }),
        invalidatesTags: [{type: 'Subscription', id: 'LIST'}]
      }),
    }),
  });

export const { useAddSubscriptionMutation, useGetSubscriptionsQuery } = subscriptionApi;