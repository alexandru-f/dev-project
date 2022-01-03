import {createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { HTTP_STATUS } from '../app/constants';
import { RootState } from '../app/store';

interface SubscriptionType {
  id: number;
  name: string;
  path: string;
}

interface SubNamesState {
  loading: string,
  data: SubscriptionType[]
  errorMessage: null
}

const initialState: SubNamesState = {
  loading: '',
  data: [],
  errorMessage: null
};
  
export const fetchSubscriptionsNames = createAsyncThunk<SubscriptionType[], string>(
  'subsNames/fetchSubscriptionsNames',
  async (query: string) => {
      const {data} = await axios.get(`/api/storage/subscription/search?q=` + query);
      return data;
  }
);

const subNamesSlice = createSlice({
  name: 'subsNames',
  initialState,
  reducers: {
    clearSuggestions(state, action: PayloadAction) {
      state.data = [];
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchSubscriptionsNames.pending, (state) => {
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(fetchSubscriptionsNames.fulfilled, (state, {payload}) => {
      state.loading = HTTP_STATUS.FULFILLED
      state.data = payload
    })
    builder.addCase(fetchSubscriptionsNames.rejected, (state) => {
      state.loading = HTTP_STATUS.REJECTED;
    })
  }
});

export const {clearSuggestions} = subNamesSlice.actions;
export const subscriptionsNames = (state: RootState) => state.subscriptionsNames.data; 
export const subscriptionLoadingStatus = (state: RootState) => state.subscriptionsNames.loading;
export default subNamesSlice.reducer;

