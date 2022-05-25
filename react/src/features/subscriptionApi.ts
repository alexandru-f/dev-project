import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFormState } from '../interface/IModalContent'
import {ISubscription} from '../interface/IApi'
import customFetchBase from "./customFetchBase";

export const subscriptionApi = createApi({
    reducerPath: "subscriptionApi",
    baseQuery: customFetchBase,
    tagTypes: ['Subscription'],
    endpoints: (builder) => ({
      getSubscriptions: builder.query<ISubscription[], void>({
        query: () => ({
            url: '/subscription', 
            credentials: 'include'
        }),
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
          method: 'POST',
          credentials: 'include',
          body: data,
        }),
        invalidatesTags: [{type: 'Subscription', id: 'LIST'}]
      }),
      
      deleteSubscription: builder.mutation<void, number>({
        query: (id) => ({
          url: `/subscription/${id}`,
          method: 'DELETE',
          credentials: 'include'
        }),
        invalidatesTags: (result, error, arg) => [{ type: 'Subscription', id: arg }]
      }),

      updateSubscription: builder.mutation<void, IFormState & Pick<IFormState, 'id'>>({
        query: (data) => ({
          url: `/subscription/${data.id}`,
          method: 'PUT',
          credentials: 'include',
          body: data
        }),
        invalidatesTags: (result, error, arg) => [{ type: 'Subscription', id: arg.id! }]
      }),
    }),
  });

export const { 
  useAddSubscriptionMutation, 
  useGetSubscriptionsQuery, 
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation
} = subscriptionApi;

