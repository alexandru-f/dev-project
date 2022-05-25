import { configureStore } from "@reduxjs/toolkit";
import {subscriptionNamesApi} from '../features/subscriptionNamesApi'
import { subscriptionApi } from "../features/subscriptionApi";
import { userApi } from "../features/userApi";
import authReducer from '../features/auth-slice';
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "../features/authApi";

export const store = configureStore({
  reducer: {
    [subscriptionNamesApi.reducerPath]: subscriptionNamesApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({}).concat(
    [
      subscriptionNamesApi.middleware,
      subscriptionApi.middleware,
      userApi.middleware,
      authApi.middleware
    ]
  )
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
