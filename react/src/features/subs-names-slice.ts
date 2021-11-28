import {createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { HTTP_STATUS } from '../app/constants';
import { RootState } from '../app/store';

interface SubNamesState {
  loading: string,
  data: string[]
}

const initialState: SubNamesState = {
  loading: '',
  data: []
};
  
export const fetchSubscriptionsNames = createAsyncThunk(
  'subsNames/fetchSubscriptionsNames',
  async () => {
    try {
      const response = await axios.get('/api/storage/subscription/search/names');
      return response.data.names;
    } catch (err) {
      console.log('new error: unable to get');
    }
  }
);

const subNamesSlice = createSlice({
  name: 'subsNames',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSubscriptionsNames.pending, (state) => {
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(fetchSubscriptionsNames.fulfilled, (state, {payload}) => {
      state.loading = HTTP_STATUS.FULFILLED
      state.data = payload
    })
    builder.addCase(fetchSubscriptionsNames.rejected, (state) => {
      state.loading = HTTP_STATUS.REJECTED
    })
  }
});

// export const {requestSubscriptionNames} = subNamesSlice.actions;
export const subscriptionsNames = (state: RootState) => state.subscriptionsNames.data; 
export default subNamesSlice.reducer;

