import { configureStore } from "@reduxjs/toolkit";
import subNamesReducer from '../features/subs-names-slice';
import subscriptionReducer from '../features/subscription-slice';

export const store = configureStore({
  reducer: {
    subscriptionsNames: subNamesReducer,
    subscription: subscriptionReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;