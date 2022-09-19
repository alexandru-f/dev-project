import { createApi } from '@reduxjs/toolkit/query/react';
import { IUser } from '../interface/IApi';
import { setUser } from './auth-slice';
import customFetchBase from './customFetchBase';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customFetchBase,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<IUser, null>({
      query() {
        return {
          url: '/user/getUserInfo',
          credentials: 'include',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {console.error(error)}
      },
    }),
    // getAllUsers: builder.query<IUser[], null>({
    //   query() {
    //     return {
    //       url: '/user/getAllUsers',
    //       credentials: 'include',
    //     };
    //   },
    //   providesTags: (result) =>
    //   result
    //     ? [
    //       ...result.map(({id}) => ({ type: 'User' as const, id })),
    //       {type: 'User', id: 'LIST'}
    //     ]
    //     : [{type: 'User', id: 'LIST'}],
    // }),
  }),
});

// export const {useGetAllUsersQuery} = userApi;