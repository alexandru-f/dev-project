import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { logOut } from './auth-slice';
import { BASE_API_URL } from '../app/constants';

//Create mutex instance
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if ((result.error?.data as any)?.message === 'You are not logged in') {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          { credentials: 'include', url: '/user/token/refresh' },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          // Retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
          window.location.href = '/signin';
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
}

export default customFetchBase;
