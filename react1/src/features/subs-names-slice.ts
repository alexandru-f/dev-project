import {createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { HTTP_STATUS } from '../app/constants';
import { RootState } from '../app/store';
import {ISubNamesState, ISubscriptionType} from '../interface/IApi'
import {isSomeAsyncActionsPending, isSomeAsyncActionsFulfilled, isSomeAsyncActionsRejected} from './sliceHelper';

const initialState: ISubNamesState = {
  loading: '',
  data: [],
  errorMessage: null
};
  
export const fetchSubscriptionsNames = createAsyncThunk<ISubscriptionType[], string>(
  'subsNames/fetchSubscriptionsNames',
  async (query: string) => {
      const {data} = await axios.get(`/api/storage/v1/subscription/search?q=` + query);
      return data;
  }
);


const isActionPending = isSomeAsyncActionsPending([
  fetchSubscriptionsNames
]);
const isActionFulfilled = isSomeAsyncActionsFulfilled([
  fetchSubscriptionsNames
]);
const isActionRejected = isSomeAsyncActionsRejected([
  fetchSubscriptionsNames
]);

const subNamesSlice = createSlice({
  name: 'subsNames',
  initialState,
  reducers: {
    clearSuggestions(state, action: PayloadAction) {
      state.data = [];
    }
  },
  extraReducers: builder => {
    builder.addMatcher(isActionPending, state => {
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addMatcher(isActionFulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = HTTP_STATUS.FULFILLED
    })
    builder.addMatcher(isActionRejected, state => {
      state.loading = HTTP_STATUS.REJECTED;
    })
  }
});

export const {clearSuggestions} = subNamesSlice.actions;
export const subscriptionsNames = (state: RootState) => state.subscriptionsNames.data; 
export const subscriptionLoadingStatus = (state: RootState) => state.subscriptionsNames.loading;
export default subNamesSlice.reducer;
