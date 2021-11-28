import { configureStore } from "@reduxjs/toolkit";
import subNamesReducer from '../features/subs-names-slice';

export const store = configureStore({
  reducer: {
    subscriptionsNames: subNamesReducer 
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;