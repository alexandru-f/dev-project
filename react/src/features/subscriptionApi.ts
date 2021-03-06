import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFormState } from '../interface/IModalContent'
import {ISubscription} from '../interface/IApi'

export const subscriptionApi = createApi({
    reducerPath: "subscriptionApi",
    baseQuery: fetchBaseQuery(),
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
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{type: 'Subscription', id: 'LIST'}]
      }),
      
      deleteSubscription: builder.mutation<void, number>({
        query: (id) => ({
          url: `/api/v1/subscription/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result, error, arg) => [{ type: 'Subscription', id: arg }]
      }),

      updateSubscription: builder.mutation<void, IFormState & Pick<IFormState, 'id'>>({
        query: (data) => ({
          url: `api/v1/subscription/${data.id}`,
          method: 'PUT',
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

