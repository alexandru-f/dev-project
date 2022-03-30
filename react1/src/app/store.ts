import { configureStore } from "@reduxjs/toolkit";
import {subscriptionNamesApi} from '../features/subscriptionNamesApi'
import { subscriptionApi } from "../features/subscriptionApi";
export const store = configureStore({
  reducer: {
    [subscriptionNamesApi.reducerPath]: subscriptionNamesApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware()
  .concat(subscriptionNamesApi.middleware)
  .concat(subscriptionApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;